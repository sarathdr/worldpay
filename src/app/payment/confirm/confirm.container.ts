import { Component, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../../core/models/cart.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'payment-confirm-page',
  template: `
    <payment-confirm
        [cart]="cart$ | async"
        (cancelPayment)="cancelPayment()"
        (confirmPayment)="confirmPayment()">
    </payment-confirm>
  `
})
export class ConfirmContainer {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService,
              private paymentService: PaymentService,
              private router: Router) {
    this.cart$ = cartService.getCart();
  }

  confirmPayment() {
    this.paymentService.confirmPayment()
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['payment', 'refund']));
  }

  cancelPayment() {
    this.paymentService.cancelPayment()
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['home']));
  }
}
