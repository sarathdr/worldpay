import { TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentService } from '../../../core/services/payment.service';
import { CartService } from '../../../core/services/cart.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmContainer } from '../confirm.container';


describe('ConfirmContainer', () => {

  let fixture;
  let confirmPayment: jest.Mock;
  let cancelPayment: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    confirmPayment = jest.fn();
    cancelPayment = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule,
        MatButtonModule,
        MatTableModule
      ],
      declarations: [
        ConfirmContainer,
        MockPaymentConfirm
      ],
      providers: [
        CartService,
        {
          provide: PaymentService,
          useValue: {
            confirmPayment,
            cancelPayment
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

    fixture = TestBed.createComponent(ConfirmContainer);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should confirm payment', () => {
    fixture.detectChanges();

    confirmPayment.mockReturnValue(of({}))
    const confirmPaymentComponent = fixture.debugElement.query(By.directive(MockPaymentConfirm)).componentInstance;
    confirmPaymentComponent.confirmPayment.emit();

    expect(confirmPayment).toHaveBeenCalled();
    expect(navigate.mock.calls).toMatchSnapshot();
  });


  it('should cancel payment', () => {
    fixture.detectChanges();

    cancelPayment.mockReturnValue(of({}))
    const confirmPaymentComponent = fixture.debugElement.query(By.directive(MockPaymentConfirm)).componentInstance;
    confirmPaymentComponent.cancelPayment.emit();

    expect(cancelPayment).toHaveBeenCalled();
    expect(navigate.mock.calls).toMatchSnapshot();
  });


  @Component({
    selector: 'payment-confirm',
    template: `
      <div>Confirm: {{ cart | json }}</div>
    `
  })
  class MockPaymentConfirm {
    @Input() cart;

    @Output() confirmPayment = new EventEmitter<void>();
    @Output() cancelPayment = new EventEmitter<void>();
  }

});
