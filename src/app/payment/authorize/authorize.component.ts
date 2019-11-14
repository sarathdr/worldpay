import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from '../../core/models/cart.interface';
import { Instruction, InstrumentType, PaymentInstrument } from '../../core/models/payment.interface';

@Component({
  selector: 'payment-authorize',
  template: `
    <payment-authorize-form
        (onSubmit)="onSubmit($event)">
    </payment-authorize-form>
  `
})
export class AuthorizeComponent {

  @Input() cart: Cart;
  @Output() authorizePayment = new EventEmitter<Instruction>();

  onSubmit(paymentInstrument: PaymentInstrument) {
    const instruction: Instruction =  {
      narrative: {
        line1: 'trading name'
      },
    value: {
        amount: this.cart.total,
        currency: this.cart.currency
    },
    paymentInstrument: {
      ...paymentInstrument,
     type: InstrumentType.CARD_PLAIN
    }
  };
    this.authorizePayment.emit(instruction);
  }
}
