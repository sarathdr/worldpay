import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdkCoreModule } from '../core/module';
import { FieldsetComponent, FieldsetLegendDirective } from './input-fieldset.directive';
import { LabelComponent, LabelDirective } from './input-label.directive';
import { InputComponent, InputDirective } from './input.directive';
import {
  MaxCountValidatorDirective,
  MaximumLengthValidatorDirective,
  MaxValueValidatorDirective,
  MinCountValidatorDirective,
  MinValueValidatorDirective
} from './input.validators';

export { InputWidth } from './input.directive';

const EXPORTED_DECLARATIONS = [
  FieldsetComponent,
  FieldsetLegendDirective,
  InputComponent,
  InputDirective,
  LabelComponent,
  LabelDirective,
  MaxCountValidatorDirective,
  MaximumLengthValidatorDirective,
  MaxValueValidatorDirective,
  MinCountValidatorDirective,
  MinValueValidatorDirective
];

@NgModule({
  imports: [CommonModule, PdkCoreModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkInputModule {}
