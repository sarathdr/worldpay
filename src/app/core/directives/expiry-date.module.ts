import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiryDateDirective } from './expiry-date.directive';

@NgModule({
  declarations: [ExpiryDateDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ExpiryDateDirective
  ],
})
export class ExpiryDateModule { }
