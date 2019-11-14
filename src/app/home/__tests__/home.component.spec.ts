import { TestBed } from '@angular/core/testing';
import { HomeComponent } from '../home.component';
import { Currency } from '../../core/models/payment.interface';
import { Component } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {

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
        HomeComponent,
        TestHomeComponent
      ],
    });

    fixture = TestBed.createComponent(TestHomeComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-home-component',
    template: `
      <home [cart]="cart"></home>`
  })
  class TestHomeComponent {
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
