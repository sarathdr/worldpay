import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionItemComponent, AccordionComponent } from './accordion.component';
import { PdkCoreModule } from '../core/module';

const EXPORTED_DECLARATIONS = [AccordionComponent, AccordionItemComponent];

@NgModule({
  imports: [CommonModule, PdkCoreModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkAccordionModule {}

export * from './accordion.component';
