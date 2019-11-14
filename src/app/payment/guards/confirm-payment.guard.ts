import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { ConfirmContainer } from '../confirm/confirm.container';


@Injectable()
export class ConfirmPaymentGuard implements CanActivate, CanDeactivate<ConfirmContainer> {

  constructor(private router: Router, private paymentService: PaymentService) {
  }

  canActivate() {
    if (!this.paymentService.hasAuthorized()) {
      return this.router.navigate(['home']).then(
        () => Promise.resolve(false)
      );
    }
    return true;
  }

  canDeactivate() {
    this.paymentService.resetAuthorize();
    return true;
  }
}
