import { TestBed } from '@angular/core/testing';
import { PaymentService } from '../../../core/services/payment.service';
import { Router } from '@angular/router';
import { ConfirmPaymentGuard } from '../confirm-payment.guard';


describe('ConfirmPaymentGuard', () => {

  let guard;
  let hasAuthorized: jest.Mock;
  let resetAuthorize: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    hasAuthorized = jest.fn();
    resetAuthorize = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        ConfirmPaymentGuard,
        {
          provide: PaymentService,
          useValue: {
            hasAuthorized,
            resetAuthorize
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

    guard = TestBed.get(ConfirmPaymentGuard);
  });

  it('should activate route if authorized', () => {
    hasAuthorized.mockReturnValue(true);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should not activate route if not authorized', () => {
    hasAuthorized.mockReturnValue(false);
    navigate.mockReturnValue(Promise.resolve());
    guard.canActivate().then(value => {
      expect(value).toBeFalsy();
      expect(navigate.mock.calls).toMatchSnapshot();
    });
  });

  it('should reset state when deactivate', () => {
    guard.canDeactivate();
    expect(resetAuthorize).toHaveBeenCalled();
  });

});
