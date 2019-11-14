import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RefundComponent } from '../refund.component';
import { RefundSuccessComponent } from '../refund-success.component';

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
        RefundSuccessComponent,
        TestRefundSuccessComponent
      ],
    });

    fixture = TestBed.createComponent(TestRefundSuccessComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-payment-refund-success',
    template: `
      <payment-refund-success></payment-refund-success>
    `
  })
  class TestRefundSuccessComponent {
  }

});
