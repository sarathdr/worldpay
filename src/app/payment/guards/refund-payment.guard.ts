import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { RefundContainer } from '../refund/refund.container';


@Injectable()
export class RefundPaymentGuard implements CanActivate, CanDeactivate<RefundContainer> {

  constructor(private router: Router, private paymentService: PaymentService) {
  }

  canActivate() {
    if (!this.paymentService.hasSettled()) {
      return this.router.navigate(['home']).then(
        () => Promise.resolve(false)
      );
    }
    return true;
  }

  canDeactivate() {
    this.paymentService.resetRefund();
    return true;
  }
}
