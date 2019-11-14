import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RefundComponent } from '../refund.component';

describe('RefundComponent', () => {

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
        RefundComponent,
        TestRefundComponent
      ],
    });

    fixture = TestBed.createComponent(TestRefundComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-payment-refund',
    template: `
      <payment-refund (refundPayment)="refund()"></payment-refund>
    `
  })
  class TestRefundComponent {
    refund = jest.fn();
  }

});
