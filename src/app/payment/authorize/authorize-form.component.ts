import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '../../core/models/cart.interface';
import { NgForm } from '@angular/forms';
import { PaymentInstrument } from '../../core/models/payment.interface';

@Component({
  selector: 'payment-authorize-form',
  template: `
    <form (ngSubmit)="submitForm(authorizeForm)" #authorizeForm="ngForm">
      <mat-form-field>
        <input type="text" matInput placeholder="Card holder name" ngModel name="cardHolderName" required>
        <mat-error>Enter card holder name</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Card number" ngModel name="cardNumber" type="number" required>
        <mat-error>Enter a valid card number</mat-error>
      </mat-form-field>
      <mat-label>Expiry date</mat-label>
      <div class="row" ngModelGroup="cardExpiryDate">
        <mat-form-field class="month">
          <mat-label>MM</mat-label>
          <mat-select name="month" ngModel required #month="ngModel">
            <mat-option *ngFor="let item of months" [value]="item">
              {{ item }}
            </mat-option>
          </mat-select>
          <mat-error>Select month</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
              type="text"
              name="year"
              placeholder="YYYY"
              ngModel
              matInput
              required
              pattern="\\d*"
              maxlength="4"
              minlength="4"
              expiryDate
              [month]="month.value"
              #year="ngModel"
          />
          <mat-error>Enter a valid date</mat-error>
        </mat-form-field>
      </div>
      <div class="row">
        <button mat-raised-button type="button" routerLink="/home">Cancel</button>
        <button mat-raised-button color="primary" type="submit">Next</button>
      </div>
    </form>
  `,
  styles: [
      `
          form {
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

          .month {
              width: 100px;
          }
    `
  ]
})
export class AuthorizeFormComponent {
  readonly months = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

  @Output() onSubmit = new EventEmitter<PaymentInstrument>();

  submitForm(authorizeForm: NgForm) {
    if (authorizeForm.valid) {
      console.log('form is valid');
      this.onSubmit.emit(authorizeForm.value);
    }
  }
}
