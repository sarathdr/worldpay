import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../core/services/cart.service';
import { Cart } from '../core/models/cart.interface';

@Component({
  selector: 'home-page',
  template: `
    <home
        [cart]="cart$ | async">
    </home>
  `,
})
export class HomeContainer {
  cart$: Observable<Cart>;

  constructor(cartService: CartService) {
    this.cart$ = cartService.getCart();
  }

}
