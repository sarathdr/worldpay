import { Directive, forwardRef, Injector, Input, Type } from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

class InputValidators {
  static maxValue(max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (Number.isInteger(c.value) && c.value > max) {
        return {
          maxValue: {
            expected: max,
            actual: c.value
          }
        };
      }
      return null;
    };
  }

  static minValue(min: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (Number.isInteger(c.value) && c.value < min) {
        return {
          maxValue: {
            expected: min,
            actual: c.value
          }
        };
      }
      return null;
    };
  }

  static minCount(count: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const value = c.value;

      if (value && value.length < count) {
        return {
          minCount: {
            expected: count,
            actual: value
          }
        };
      }
      return null;
    };
  }

  static maxCount(count: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const value = c.value || [];

      if (value.length > count) {
        return {
          maxCount: {
            expected: count,
            actual: value
          }
        };
      }
      return null;
    };
  }

  static maximumLength(length: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const value = c.value || 0;

      if (value.length > length) {
        return {
          maximumLength: {
            expected: length,
            actual: value
          }
        };
      }
      return null;
    };
  }
}

@Directive({
  selector: '[maxValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxValueValidatorDirective),
      multi: true
    }
  ]
})
export class MaxValueValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxValue') set validator(max: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maxValue(max);
    if (ngControl) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  selector: '[minValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MinValueValidatorDirective),
      multi: true
    }
  ]
})
export class MinValueValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minValue') set validator(min: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.minValue(min);
    if (ngControl) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  selector: '[minCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MinCountValidatorDirective),
      multi: true
    }
  ]
})
export class MinCountValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minCount') set validator(count: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.minCount(count);
    if (ngControl) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  selector: '[maxCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxCountValidatorDirective),
      multi: true
    }
  ]
})
export class MaxCountValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxCount') set validator(count: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maxCount(count);
    if (ngControl) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  // deliberately named 'maximum' to not clash with browser maxlength attribute
  selector: '[maximumLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaximumLengthValidatorDirective),
      multi: true
    }
  ]
})
export class MaximumLengthValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maximumLength') set validator(length: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maximumLength(length);
    if (ngControl) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}
