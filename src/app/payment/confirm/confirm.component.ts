import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '../../core/models/cart.interface';

@Component({
  selector: 'payment-confirm',
  template: `
    <div class="content">
      <h1>Your payment details has been authorized</h1>
      <p>Confirm the payment to transfer money</p>
      <p><b>Total</b>{{ cart.total | currency: cart.currency }}</p>
      <div class="row">
        <button mat-raised-button type="button" (click)="cancelPayment.emit()">Cancel</button>
        <button mat-raised-button color="primary" type="button" (click)="confirmPayment.emit()">Confirm</button>
      </div>
    </div>
  `,
  styles: [
      `
          .content {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 400px;
              height: 285px;
              margin: 0 auto;
          }

          .row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
          }
    `
  ]
})
export class ConfirmComponent {
  @Input() cart: Cart;

  @Output() confirmPayment = new EventEmitter<void>();
  @Output() cancelPayment = new EventEmitter<void>();
}
