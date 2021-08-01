import {
  AfterContentInit,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  Optional,
  Output,
  Self
} from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationError } from './form.interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form[pdk-form]',
  exportAs: 'pdkForm',
  template: `
    <ng-content></ng-content>
  `
})
export class FormComponent implements AfterContentInit, OnDestroy {
  @Output() errors = new EventEmitter<ValidationError[] | null>();
  @Output() validSubmit = new EventEmitter<unknown>();

  reset$ = new Subject();
  submit$ = new Subject();

  private errorsTimer: number;
  private ngControlErrors: Record<string, ValidationError> = {};
  private externalErrors: Record<string, ValidationError> = {};

  constructor(
    @Optional() @Self() private formGroup: FormGroupDirective,
    @Optional() @Self() private ngForm: NgForm
  ) {}

  @HostListener('ngSubmit')
  onSubmit() {
    this.submit$.next();

    if (Object.keys(this.ngControlErrors).length > 0) {
      this.emitErrors(false);
      return false;
    }
    this.validSubmit.emit();
    return true;
  }

  ngAfterContentInit() {
    if (this.formGroup) {
      const reset = this.formGroup.resetForm;

      this.formGroup.resetForm = (...args) => {
        reset.apply(this.formGroup, ...args);
        this.reset$.next();
      };
    } else if (this.ngForm) {
      const reset = this.ngForm.resetForm;

      this.ngForm.resetForm = (...args) => {
        reset.apply(this.ngForm, ...args);
        this.reset$.next();
      };
    }
  }

  ngOnDestroy() {
    this.reset$.complete();
    this.submit$.complete();
  }

  addInternalError(key: string, error: ValidationError) {
    this.ngControlErrors[key] = { ...error, shouldFocus: true };
  }

  addExternalError(key: string, error: ValidationError) {
    this.externalErrors[key] = { ...error, shouldFocus: true };
  }

  removeError(key: string) {
    delete this.ngControlErrors[key];
    delete this.externalErrors[key];
  }

  emitErrors(detectChanges = false) {
    const allErrors = { ...this.ngControlErrors, ...this.externalErrors };
    const validationErrors = Object.keys(allErrors).map(key => allErrors[key]);
    const errors = validationErrors.length > 0 ? validationErrors : null;

    if (detectChanges) {
      this.errorsTimer = setTimeout(() => {
        if (this.errorsTimer) {
          clearTimeout(this.errorsTimer);
        }
        this.errorsTimer = null;
        this.errors.emit(errors);
      });
    } else {
      this.errors.emit(errors);
    }
  }
}
