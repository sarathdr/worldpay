import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './authorize/authorize.component';
import { AuthorizeContainer } from './authorize/authorize.container';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmContainer } from './confirm/confirm.container';
import { RefundComponent } from './refund/refund.component';
import { RefundContainer } from './refund/refund.container';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { AuthorizeFormComponent } from './authorize/authorize-form.component';
import { ConfirmPaymentGuard } from './guards/confirm-payment.guard';
import { ExpiryDateModule } from '../core/directives/expiry-date.module';
import { RefundPaymentGuard } from './guards/refund-payment.guard';
import { RefundSuccessComponent } from './refund/refund-success.component';

@NgModule({
  declarations: [
    AuthorizeComponent,
    AuthorizeFormComponent,
    AuthorizeContainer,
    ConfirmComponent,
    ConfirmContainer,
    RefundComponent,
    RefundSuccessComponent,
    RefundContainer
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthorizeContainer
      },
      {
        path: 'confirm',
        component: ConfirmContainer,
        canActivate:[ConfirmPaymentGuard],
        canDeactivate:[ConfirmPaymentGuard]
      },
      {
        path: 'refund',
        component: RefundContainer,
        canActivate:[RefundPaymentGuard],
        canDeactivate:[RefundPaymentGuard]
      }
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    ExpiryDateModule
  ],
  providers:[
    ConfirmPaymentGuard,
    RefundPaymentGuard
  ]
})
export class PaymentModule { }
