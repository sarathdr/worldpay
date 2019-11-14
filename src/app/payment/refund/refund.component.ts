import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'payment-refund',
  template: `
    <div class="content">
      <h1>Your have successfully made the payment</h1>
      <p>You can still refund the payment</p>
      <div class="row">
        <button mat-raised-button type="button" (click)="refundPayment.emit()">Refund</button>
        <button mat-raised-button color="primary" type="button" routerLink="/home">Go to home</button>
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
export class RefundComponent {
  @Output() refundPayment = new EventEmitter<void>();
}
