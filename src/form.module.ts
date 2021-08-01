import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdkCoreModule } from '../core/module';
import { PdkErrorMessageModule } from '../error-message/error-message.module';
import { PdkHintModule } from '../hint/hint.module';
import { PdkInputModule } from '../input/input.module';
import { FormFieldComponent } from './form-field.component';
import { FormGroupComponent, FormGroupDirective } from './form-group.component';
import { FormComponent } from './form.component';

const EXPORTED_DECLARATIONS = [
  FormFieldComponent,
  FormComponent,
  FormGroupComponent,
  FormGroupDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PdkCoreModule,
    PdkErrorMessageModule,
    PdkHintModule,
    PdkInputModule
  ],
  exports: [...EXPORTED_DECLARATIONS, FormsModule, PdkInputModule],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkFormModule {}

export { FormComponent } from './form.component';
