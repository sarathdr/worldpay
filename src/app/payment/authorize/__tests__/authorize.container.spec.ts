import { TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Instruction } from '../../../core/models/payment.interface';
import { PaymentService } from '../../../core/services/payment.service';
import { AuthorizeContainer } from '../authorize.container';
import { CartService } from '../../../core/services/cart.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { v4 } from 'uuid';


jest.mock('uuid', () =>({
  v4: jest.fn()
}));

const mockUuid = v4;

describe('AuthorizeContainer', () => {

  let fixture;
  let authorizePayment: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    authorizePayment = jest.fn();
    navigate = jest.fn();
    mockUuid.mockReturnValue("id");

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule,
        MatButtonModule,
        MatTableModule
      ],
      declarations: [
        AuthorizeContainer,
        MockAuthorizeComponent
      ],
      providers: [
        CartService,
        {
          provide: PaymentService,
          useValue: {
            authorizePayment
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ]
    });

    fixture = TestBed.createComponent(AuthorizeContainer);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should authorize payment', () => {
    fixture.detectChanges();

    authorizePayment.mockReturnValue(of({}))
    const authorizeComponent = fixture.debugElement.query(By.directive(MockAuthorizeComponent)).componentInstance;
    authorizeComponent.authorizePayment.emit(
      {
        narrative: {
          line1: 'trading name',
        },
        paymentInstrument: {
          cardExpiryDate: {
            month: 5,
            year: 2020,
          },
          cardHolderName: 'testing',
          cardNumber: 4235234534,
          type: 'card/plain',
        },
        value: {
          amount: 22,
          currency: 'GBP'
        },
      }
    );

    expect(authorizePayment.mock.calls).toMatchSnapshot();
    expect(navigate.mock.calls).toMatchSnapshot();
  });


  @Component({
    selector: 'payment-authorize',
    template: `
      <div>Authorize: {{ cart | json }}</div>
    `
  })
  class MockAuthorizeComponent {
    @Input() cart;
    @Output() authorizePayment = new EventEmitter<Instruction>();
  }

});
