import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  Optional
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorMessageConfig } from '../error-message/error-message.component';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { LabelType } from '../input/input-label.directive';
import { coerceBooleanProperty, generateId } from '../util/index';
import { FormComponent } from './form.component';

let formFieldId = 0;

@Component({
  selector: 'pdk-form-field',
  exportAs: 'pdkFormField',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #formFieldContent>
      <pdk-hint *ngIf="hint || hintText" [hint]="hint && formFieldControl?.controlType">
        {{ hintText }}
      </pdk-hint>
      <pdk-error-message
        *ngIf="hasError"
        [id]="errorId"
        [errors]="consolidatedErrors"
        [errorMessages]="errorMessages"
      >
      </pdk-error-message>
      <ng-content></ng-content>
    </ng-template>

    <pdk-form-group [hasError]="hasError">
      <fieldset pdk-fieldset *ngIf="formFieldControl?.multi">
        <legend [pdk-legend]="labelType" [pdk-visually-hidden]="labelType === 'none'">
          {{ label }}
        </legend>
        <ng-container *ngTemplateOutlet="formFieldContent"></ng-container>
      </fieldset>

      <ng-container *ngIf="!formFieldControl?.multi">
        <label
          *ngIf="!formFieldControl?.multi && label"
          [pdk-visually-hidden]="labelType === 'none'"
          [pdk-label]="labelType"
          [attr.for]="controlId"
        >
          {{ label }}
        </label>
        <ng-container *ngTemplateOutlet="formFieldContent"></ng-container>
      </ng-container>
    </pdk-form-group>
  `
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  @ContentChild(FormFieldControl) formFieldControl: FormFieldControl | FormFieldControlV2;

  @Input() set errors(errors: ValidationErrors | null) {
    this._externalErrors = errors;
    setTimeout(() => {
      this.evaluateErrors();
      // trigger errors event on the form – should we be doing this when
      // setting a value programatically? This is not how ngModelChange works,
      // but makes the pdkForm experience more seamless with regards to
      // forwarding errors to pdk-error-summary
      if (this.pdkForm) {
        this.pdkForm.emitErrors(false);
      }
    });
  }
  @Input()
  get errorMessages(): ErrorMessageConfig[] {
    if (this.formFieldControl && this.formFieldControl.errorMessages) {
      return [...(this._errorMessages || []), ...this.formFieldControl.errorMessages];
    }
    return this._errorMessages;
  }
  set errorMessages(val: ErrorMessageConfig[]) {
    this._errorMessages = val;
  }

  @Input()
  get hint(): boolean {
    return this._hint;
  }
  set hint(val: boolean) {
    this._hint = coerceBooleanProperty(val);
  }

  @Input() hintText: string;
  @Input() label: string;
  @Input() labelForErrorSummary: string;

  @Input()
  get labelType() {
    return this._labelType;
  }
  set labelType(type: LabelType | 'none') {
    this._labelType = type;
  }

  errorId: string;
  formFieldId: string;
  identifier = generateId();

  get consolidatedErrors(): ValidationErrors | null {
    return this._externalErrors || this._ngControlErrors;
  }

  get hasError(): boolean {
    return Boolean(this.consolidatedErrors);
  }

  private ngOnDestroy$ = new Subject();
  private _errorMessages: ErrorMessageConfig[];
  private _externalErrors: ValidationErrors | null;
  private _hint: boolean;
  private _labelType: LabelType | 'none' = 'default';
  private _ngControlErrors: ValidationErrors | null;

  constructor(
    @Optional() private pdkForm: FormComponent,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    formFieldId += 1;

    this.errorId = `pdk-form-error-${this.identifier}`;
    this.formFieldId = `form-field-${formFieldId}`;
  }

  get controlId() {
    if (this.formFieldControl && this.formFieldControl.id) {
      return this.formFieldControl.id;
    }
    return `pdk-form-control-${this.identifier}`;
  }

  ngAfterContentInit() {
    this.formFieldControl.id = this.controlId;

    if (this.pdkForm) {
      this.pdkForm.reset$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(() => {
        this.setNgControlErrors(null);
      });
      this.pdkForm.submit$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(() => {
        this.setNgControlErrors(this.formFieldControl.ngControl.errors);
      });
    }
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();

    if (this.pdkForm) {
      this.pdkForm.removeError(this.formFieldId);
      this.pdkForm.emitErrors(true);
    }
  }

  setNgControlErrors(errors: ValidationErrors | null) {
    this._ngControlErrors = errors;
    this.evaluateErrors();
  }

  private evaluateErrors() {
    if (this.formFieldControl) {
      this.formFieldControl.ariaDescribedBy = this.consolidatedErrors ? this.errorId : null;
      this.formFieldControl.hasError = this.hasError;

      if (this.consolidatedErrors) {
        // @see CRC-12168
        // Use custom error message if it is set
        const errorMessage =
          this.labelForErrorSummary || this.getCustomErrorMessage() || this.label;

        if (this._externalErrors) {
          this.pdkForm.addExternalError(this.formFieldId, {
            id: this.errorId,
            message: errorMessage
          });
        } else {
          this.pdkForm.addInternalError(this.formFieldId, {
            id: this.errorId,
            message: errorMessage
          });
        }
      } else {
        this.pdkForm.removeError(this.formFieldId);
      }
      this.changeDetectorRef.markForCheck();
      // For form field controls that use ChangeDetectionStrategy.OnPush, we must
      // directly trigger their change detection
      if ((this.formFieldControl as FormFieldControlV2).markForCheck) {
        (this.formFieldControl as FormFieldControlV2).markForCheck();
      }
    }
  }

  private getCustomErrorMessage() {
    if (this.consolidatedErrors && this._errorMessages) {
      const rule = Object.keys(this.consolidatedErrors)[0];
      const config = this._errorMessages.find(errorConfig => errorConfig.rule === rule);
      if (config) {
        return typeof config.message === 'function'
          ? config.message(this.consolidatedErrors[rule])
          : config.message;
      }
    }
    return null;
  }
}
