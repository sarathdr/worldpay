import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ExpiryDateDirective } from '../expiry-date.directive';

describe('`expiryDate` directive', () => {
  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  let fixture: ComponentFixture<TestExpiryDateValidationComponent>;
  let form: NgForm;
  let yearInput;

  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2019-11-13T11:01:58.135Z').valueOf()
    );

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiryDateDirective, TestExpiryDateValidationComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(TestExpiryDateValidationComponent);
    fixture.detectChanges();
    tick();

    form = fixture.debugElement.children[0].injector.get(NgForm);
    yearInput = fixture.debugElement.query(By.css('[name=year]'));
  }));

  it('should validate `false` if the year is less than current year', () => {
    fixture.componentInstance.month = 11;
    fixture.detectChanges();

    setValue(yearInput, '2017');
    expect(form.control.get('year').hasError('expiryDate')).toBe(true);
  });

  it('should validate `false` if the year is equal to current year and month is less than current month', () => {
    fixture.componentInstance.month = 10;
    fixture.detectChanges();

    setValue(yearInput, '2019');
    expect(form.control.get('year').hasError('expiryDate')).toBe(true);
  });

  it('should validate `true` if the date is correct', () => {
    fixture.componentInstance.month = 10;
    setValue(yearInput, '2020');

    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  @Component({
    selector: 'test-max-date-validation',
    template: `
      <form>
        <input type="text" name="year" ngModel [month]="month" expiryDate/>
      </form>
    `
  })
  class TestExpiryDateValidationComponent {
    month: number;
  }
});
