import { TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentService } from '../../../core/services/payment.service';
import { CartService } from '../../../core/services/cart.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RefundContainer } from '../refund.container';


describe('RefundContainer', () => {

  let fixture;
  let refundPayment: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    refundPayment = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule,
        MatButtonModule,
        MatTableModule
      ],
      declarations: [
        RefundContainer,
        MockPaymentRefund,
        MockPaymentRefundSuccess
      ],
      providers: [
        CartService,
        {
          provide: PaymentService,
          useValue: {
            refundPayment
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

    fixture = TestBed.createComponent(RefundContainer);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should refund payment', () => {
    fixture.detectChanges();

    refundPayment.mockReturnValue(of({}))
    const refundPaymentComponent = fixture.debugElement.query(By.directive(MockPaymentRefund)).componentInstance;
    refundPaymentComponent.refundPayment.emit();
    fixture.detectChanges();

    expect(refundPayment).toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'payment-refund',
    template: `
      <div>Refund: {{ cart | json }}</div>
    `
  })
  class MockPaymentRefund {
    @Input() cart;
    @Output() refundPayment = new EventEmitter<void>();
  }

  @Component({
    selector: 'payment-refund-success',
    template: `
      <div>Refund success</div>
    `
  })
  class MockPaymentRefundSuccess {
  }

});
