import { Component, EventEmitter, forwardRef, Injector, Input, Output, Type } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'dateExists',
    message: `Date doesn't exist – enter again`
  },
  {
    rule: 'dateFormat',
    message: `Date not recognised – use this format, for example 19 8 2016`
  },
  {
    rule: 'futureDate',
    message: `Date can't be in past – enter valid date`
  },
  {
    rule: 'pastDate',
    message: `Date can't be in future – enter valid date`
  }
];

const DATE_EXISTS = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/; // tslint:disable-line:max-line-length

function pad(num: number): string {
  const value = String(num);
  return value.length >= 2 ? value : new Array(2 - value.length + 1).join('0') + value;
}

@Component({
  selector: 'pdk-date-input',
  template: `
    <div class="pdk-date-input">
      <div [formGroup]="dateInputs" class="govuk-date-input">
        <div class="govuk-date-input__item">
          <label [attr.for]="id + '-day'" pdk-label class="govuk-date-input__label"> Day </label>
          <input
            [attr.id]="id + '-day'"
            [pdk-input]="2"
            [hasError]="hasError"
            class="govuk-date-input__input"
            type="number"
            name="dateDay"
            formControlName="day"
            [attr.aria-describedby]="ariaDescribedBy"
            required
            autocomplete="off"
            (focus)="handleFocusInput($event)"
            (blur)="handleBlurInput($event)"
          />
        </div>

        <div class="govuk-date-input__item">
          <label [attr.for]="id + '-month'" pdk-label class="govuk-date-input__label">
            Month
          </label>
          <input
            [attr.id]="id + '-month'"
            [pdk-input]="2"
            [hasError]="hasError"
            class="govuk-date-input__input"
            type="number"
            name="dateMonth"
            formControlName="month"
            autocomplete="off"
            required
            (focus)="handleFocusInput($event)"
            (blur)="handleBlurInput($event)"
          />
        </div>

        <div class="govuk-date-input__item">
          <label [attr.for]="id + '-year'" pdk-label class="govuk-date-input__label"> Year </label>
          <input
            [attr.id]="id + '-year'"
            [pdk-input]="4"
            [hasError]="hasError"
            class="govuk-date-input__input"
            type="number"
            name="dateYear"
            formControlName="year"
            autocomplete="off"
            required
            (focus)="handleFocusInput($event)"
            (blur)="handleBlurInput($event)"
          />
        </div>
      </div>
      <div *ngIf="hasPicker" pdk-margin-left="-2">
        <pdk-date-picker-toggle
          [futureDate]="futureDate"
          [pastDate]="pastDate"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [value]="pickerValue"
          (change)="handlePickDate($event)"
        >
        </pdk-date-picker-toggle>
      </div>
    </div>
  `,
  styleUrls: ['./date-input.scss'],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: DateInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor, FormFieldControl, Validator {
  @Input() id: string;
  @Input() ariaDescribedBy: string | null;
  @Input()
  set futureDate(enabled: boolean) {
    this._futureDate = coerceBooleanProperty(enabled);
  }
  get futureDate() {
    return this._futureDate;
  }
  @Input()
  set pastDate(enabled: boolean) {
    this._pastDate = coerceBooleanProperty(enabled);
  }
  get pastDate() {
    return this._pastDate;
  }
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() hasError = false;
  @Input() set picker(on: unknown) {
    this.hasPicker = coerceBooleanProperty(on);
  }

  // simulate blur and focus events as if this were a single input
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  canBlur = false;
  controlType = 'date';
  dateInputs: FormGroup;
  day: FormControl;
  errorMessages = DEFAULT_ERROR_MESSAGES;
  hasFocus = false;
  hasPicker = false;
  pickerValue: Date | null;
  multi = true;

  private _futureDate = false;
  private _pastDate = false;

  set value(value: string | undefined) {
    this._value = value;

    if (value && !this.validate({ value } as FormControl)) {
      const [year, month, day] = value.split('-');
      this.pickerValue = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      this.pickerValue = null;
    }
  }
  get value() {
    return this._value;
  }

  private _value: string | undefined;
  private propagateChange = (_: string) => {};

  handlePickDate(value: string) {
    this.writeValue(value);
    this.value = value;
    this.propagateChange(value);
  }

  constructor(private injector: Injector) {
    this.id = generateId('pdk-date-input');
    this.dateInputs = new FormGroup({
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl('')
    });

    // obtain the composite value from the three inner inputs in order to
    // simulate a date being typed in a single field - the combined value is
    // considered to exist when any of the three inner inputs are set
    (this.dateInputs.valueChanges as Observable<{ day?: number; month?: number; year?: number }>)
      .pipe(
        map(({ day, month, year }) => {
          if (day || month || year) {
            return [year ? year : '    ', month ? pad(month) : '  ', day ? pad(day) : '  '].join(
              '-'
            );
          }
        })
      )
      .subscribe(val => {
        if (val && val.length > 10) {
          this.writeValue(val);
        } else if (val !== this.value) {
          this.value = val;
          this.propagateChange(val);
        }
      });
  }

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  handleBlurInput($event: any) {
    this.canBlur = true;
    setTimeout(() => {
      if (this.canBlur) {
        this.blur.emit($event);
        this.hasFocus = false;
      }
    });
  }

  handleFocusInput($event: any) {
    if (!this.hasFocus) {
      this.focus.emit($event);
      this.hasFocus = true;
    }
    this.canBlur = false;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_: any) {}

  validate(c: FormControl): ValidationErrors | null {
    // treat an empty value as valid so that the input can be optional
    if (!c.value) {
      return null;
    }
    // expose any internal validation errors to the outer control under the
    // `dateFormat` key
    const dateFormat = ['day', 'month', 'year'].reduce(
      (errors: { [k: string]: ValidationErrors | null }, controlName) => {
        if (!this.dateInputs.controls[controlName].valid) {
          return {
            ...(errors || {}),
            [controlName]: this.dateInputs.controls[controlName].errors
          };
        }
        return errors;
      },
      null
    );

    if (dateFormat) {
      return { dateFormat };
    }
    if (
      !DATE_EXISTS.test(
        c.value
          .split('-')
          .reverse()
          .join('-')
      )
    ) {
      return { dateExists: true };
    }
    return null;
  }

  writeValue(dateString: string | undefined) {
    let day = '';
    let month = '';
    let year = '';

    [year, month, day] = (dateString || '').split('-');

    this.dateInputs.patchValue({
      day: day ? day.slice(0, 2) : undefined,
      month: month ? month.slice(0, 2) : undefined,
      year: year ? year.slice(0, 4) : undefined
    });
    this.value = dateString;
  }
}
