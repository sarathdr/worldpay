import { NgModule } from '@angular/core';

import { ErrorMessageComponent } from './error-message.component';

const EXPORTED_DECLARATIONS = [ErrorMessageComponent];

@NgModule({
  exports: [EXPORTED_DECLARATIONS],
  declarations: [EXPORTED_DECLARATIONS]
})
export class PdkErrorMessageModule {}

export { ErrorMessageConfig } from './error-message.component';
