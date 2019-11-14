import { Injectable } from '@angular/core';
import { Currency } from '../models/payment.interface';
import { Observable, of } from 'rxjs';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  getCart(): Observable<Cart> {
    return of({
      products: [{
        name: 'Pen',
        price: 10
      },
        {
          name: 'Pencil',
          price: 12
        }],
      total: 22,
      currency: Currency.GBP
    });
  }
}
