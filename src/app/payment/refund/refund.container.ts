import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'payment-refund-page',
  template: `
    <payment-refund (refundPayment)="refund()" *ngIf="!refundSuccess"></payment-refund>
    <payment-refund-success *ngIf="refundSuccess"></payment-refund-success>
  `
})
export class RefundContainer {
  refundSuccess = false;
  constructor(private paymentService: PaymentService,
              private router: Router) {
  }

  refund() {
    this.paymentService.refundPayment()
      .pipe(take(1))
      .subscribe(() => this.refundSuccess = true);
  }
}
