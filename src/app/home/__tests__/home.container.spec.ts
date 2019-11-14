import { TestBed } from '@angular/core/testing';
import { HomeComponent } from '../home.component';
import { Currency } from '../../core/models/payment.interface';
import { Component, Input } from '@angular/core';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeContainer } from '../home.container';
import { CartService } from '../../core/services/cart.service';

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
        HomeContainer,
        MockHomeComponent
      ],
      providers: [
        CartService
      ]
    });

    fixture = TestBed.createComponent(HomeContainer);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'home',
    template: `
    <div>Home: {{ cart | json }}</div>
    `
  })
  class MockHomeComponent {
    @Input() cart;
  }

});
