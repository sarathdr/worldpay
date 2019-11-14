import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../../core/models/cart.interface';
import { CartService } from '../../core/services/cart.service';
import { PaymentService } from '../../core/services/payment.service';
import { AuthorizeRequest, Instruction } from '../../core/models/payment.interface';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'payment-authorize-page',
  template: `
    <payment-authorize
        [cart]="cart$ | async" (authorizePayment)="authorize($event)">
    </payment-authorize>
  `
})
export class AuthorizeContainer {

  cart$: Observable<Cart>;

  constructor(private cartService: CartService,
              private paymentService: PaymentService,
              private router: Router) {
    this.cart$ = cartService.getCart();
  }

  authorize(instruction: Instruction) {
    const body: AuthorizeRequest = {
      transactionReference: uuid(),
      merchant: {
        entity: 'default'
      },
      instruction
    };

    this.paymentService.authorizePayment(body)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['payment', 'confirm']));
  }
}
