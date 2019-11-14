import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Currency } from '../../../core/models/payment.interface';
import { By } from '@angular/platform-browser';
import { AuthorizeFormComponent } from '../authorize-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpiryDateModule } from '../../../core/directives/expiry-date.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthorizeFormComponent', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        ExpiryDateModule,
        NoopAnimationsModule
      ],
      declarations: [
        AuthorizeFormComponent,
        TestAuthorizeComponent
      ],
    });

    fixture = TestBed.createComponent(TestAuthorizeComponent);
  });

  it('should render the component correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit the form', async () => {
   await fixture.detectChanges();

   const cardHolderName = fixture.debugElement.query(By.css('input[name=cardHolderName]')).nativeElement;
   cardHolderName.dispatchEvent(new Event('input'));
   cardHolderName.value = 'Testing';
   cardHolderName.dispatchEvent(new Event('input'));

   const cardNumber = fixture.debugElement.query(By.css('input[name=cardNumber]')).nativeElement;
   cardNumber.value = 123124;
   cardNumber.dispatchEvent(new Event('input'));

   const month = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
   month.click();
   await fixture.detectChanges();
   await fixture.whenStable();


   const matOption = fixture.debugElement.queryAll(By.css('.mat-option'))[0].nativeElement;
   matOption.click();
   await fixture.detectChanges();
   await fixture.whenStable();

   const year = fixture.debugElement.query(By.css('input[name=year]')).nativeElement;
   year.value = 2020;
   year.dispatchEvent(new Event('input'));


   fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
   expect(fixture.componentInstance.authorizePayment).toHaveBeenCalled();
   expect(fixture.componentInstance.authorizePayment.mock.calls).toMatchSnapshot();
  });

  it('should show errors if the form is empty', async () => {
    await fixture.detectChanges();
    fixture.debugElement.query(By.css('button[type=submit]')).nativeElement.click();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'test-payment-authorize-form',
    template: `
      <payment-authorize-form
          (onSubmit)="authorizePayment($event)">
      </payment-authorize-form>`
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
