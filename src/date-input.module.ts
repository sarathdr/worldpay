import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdkCoreModule } from '../core/module';
import { PdkDatePickerModule } from '../date-picker/date-picker.module';
import { PdkInputModule } from '../input/input.module';
import { DateInputComponent } from './date-input.component';
import {
  FutureDateValidatorDirective,
  MaxDateValidatorDirective,
  MinDateValidatorDirective,
  PastDateValidatorDirective
} from './date-input.validators';

const EXPORTED_DECLARATIONS = [
  DateInputComponent,
  FutureDateValidatorDirective,
  PastDateValidatorDirective,
  MaxDateValidatorDirective,
  MinDateValidatorDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PdkCoreModule,
    PdkDatePickerModule,
    PdkInputModule,
    ReactiveFormsModule
  ],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkDateInputModule {}
