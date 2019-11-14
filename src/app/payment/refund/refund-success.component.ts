import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'payment-refund-success',
  template: `
    <div class="content">
      <h1>Your payment has been refunded</h1>
      <p>Go to checkout to start again</p>
      <div class="row">
        <button mat-raised-button color="primary" type="button" routerLink="home">Go to home</button>
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
export class RefundSuccessComponent {
  @Output() refundPayment = new EventEmitter<void>();
}
