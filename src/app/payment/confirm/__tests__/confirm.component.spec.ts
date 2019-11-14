import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmComponent } from '../confirm.component';
import { Currency } from '../../../core/models/payment.interface';

describe('ConfirmComponent', () => {

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
        ConfirmComponent,
        TestConfirmComponent
      ],
    });

    fixture = TestBed.createComponent(TestConfirmComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-payment-confirm ',
    template: `
      <payment-confirm [cart]="cart"></payment-confirm>`
  })
  class TestConfirmComponent {
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
  }

});
