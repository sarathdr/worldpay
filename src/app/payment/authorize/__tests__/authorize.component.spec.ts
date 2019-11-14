import { TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizeComponent } from '../authorize.component';
import { Currency, InstrumentType, PaymentInstrument } from '../../../core/models/payment.interface';
import { By } from '@angular/platform-browser';

describe('AuthorizeComponent', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule,
        MatButtonModule,
        MatTableModule
      ],
      declarations: [
        AuthorizeComponent,
        MockAuthorizeFormComponent,
        TestAuthorizeComponent
      ],
    });

    fixture = TestBed.createComponent(TestAuthorizeComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should handle submit form', () => {
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.directive(MockAuthorizeFormComponent)).componentInstance;
    formComponent.onSubmit.emit({
      type: InstrumentType.CARD_PLAIN,
      cardHolderName: 'testing',
      cardNumber: 4235234534,
      cardExpiryDate: {
        month: 5,
        year: 2020
      }
    });

    expect(fixture.componentInstance.authorizePayment.mock.calls).toMatchSnapshot();
  });

  @Component({
    selector: 'payment-authorize-form',
    template: `
      <div>Authorize form</div>
    `
  })
  class MockAuthorizeFormComponent {
    @Output() onSubmit = new EventEmitter<PaymentInstrument>();
  }

  @Component({
    selector: 'test-authorize-component',
    template: `
      <payment-authorize
          [cart]="cart"
          (authorizePayment)="authorizePayment($event)">
      </payment-authorize>`
  })
  class TestAuthorizeComponent {
    cart = {
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
    };

    authorizePayment = jest.fn();
  }

});
