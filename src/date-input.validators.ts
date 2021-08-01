import { Directive, forwardRef, Injector, Input, Type } from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

function toTimestamp(value: Date | string | number): number {
  let date: Date | string | number = value;

  if (typeof date === 'string') {
    const [year, month, day] = date.split('-');
    date = new Date(+year, +month - 1, +day);
  } else {
    date = new Date(value);
  }
  (date as Date).setHours(0, 0, 0, 0);

  return date.getTime();
}

export function timeDiff(a: any, b: any): number {
  return toTimestamp(b) - toTimestamp(a);
}

class DateValidators {
  // @dynamic
  static maxDate = (maxDate): ValidatorFn => {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.value && timeDiff(c.value, maxDate) < 0) {
        return {
          maxDate: true
        };
      }
      return null;
    };
  };

  // @dynamic
  static minDate = (minDate): ValidatorFn => {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.value && timeDiff(c.value, minDate) > 0) {
        return {
          minDate: true
        };
      }
      return null;
    };
  };

  // @dynamic
  static pastDate = (c: AbstractControl): ValidationErrors | null => {
    if (c.value && timeDiff(c.value, Date.now()) < 0) {
      return {
        pastDate: true
      };
    }
    return null;
  };

  // @dynamic
  static futureDate = (c: AbstractControl): ValidationErrors | null => {
    if (c.value && timeDiff(c.value, Date.now()) > 0) {
      return {
        futureDate: true
      };
    }
    return null;
  };
}

@Directive({
  selector: '[minDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MinDateValidatorDirective),
      multi: true
    }
  ]
})
export class MinDateValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minDate') set validator(minDate: string) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = DateValidators.minDate(minDate);
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
  selector: '[maxDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxDateValidatorDirective),
      multi: true
    }
  ]
})
export class MaxDateValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxDate') set validator(maxDate: string) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = DateValidators.maxDate(maxDate);
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
  selector: '[pastDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PastDateValidatorDirective),
      multi: true
    }
  ]
})
export class PastDateValidatorDirective implements Validator {
  validate = DateValidators.pastDate;
}

@Directive({
  selector: '[futureDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FutureDateValidatorDirective),
      multi: true
    }
  ]
})
export class FutureDateValidatorDirective implements Validator {
  validate = DateValidators.futureDate;
}
