import { TestBed } from '@angular/core/testing';
import { PaymentService } from '../../../core/services/payment.service';
import { Router } from '@angular/router';
import { RefundPaymentGuard } from '../refund-payment.guard';


describe('RefundPaymentGuard', () => {

  let guard;
  let hasSettled: jest.Mock;
  let resetRefund: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    hasSettled = jest.fn();
    resetRefund = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        RefundPaymentGuard,
        {
          provide: PaymentService,
          useValue: {
            hasSettled,
            resetRefund
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

    guard = TestBed.get(RefundPaymentGuard);
  });

  it('should activate route if refund url is set', () => {
    hasSettled.mockReturnValue(true);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should not activate route if not authorized', () => {
    hasSettled.mockReturnValue(false);
    navigate.mockReturnValue(Promise.resolve());
    guard.canActivate().then(value => {
      expect(value).toBeFalsy();
      expect(navigate.mock.calls).toMatchSnapshot();
    });

  });

  it('should reset state when deactivate', () => {
    guard.canDeactivate();
    expect(resetRefund).toHaveBeenCalled();
  });

});
