import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[expiryDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExpiryDateDirective),
      multi: true
    }
  ]
})
export class ExpiryDateDirective implements Validator {

  private onChange: () => void;
  private month: number;

  @Input('month') set monthValue(value: number) {
    this.month = value;
    if (this.onChange) {
      this.onChange();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const year = Number(c.value);
    if (year < currentYear) {
      return {
        expiryDate: true
      };
    }

    if (year === currentYear && this.month < currentMonth) {
      return {
        expiryDate: true
      };
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
