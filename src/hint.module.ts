import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintComponent } from './hint.component';

const EXPORTED_DECLARATIONS = [HintComponent];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkHintModule {}
