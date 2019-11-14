import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { ConfigService } from '../config.service';
import { PaymentService } from '../payment.service';
import * as authorizeResponse from '../../../mock/authorize-response.json';
import { AuthorizeRequest } from '../../models/payment.interface';
import * as settleResponse from '../../../mock/settle-response.json';

describe('PaymentService', () => {

  let service: PaymentService;
  let post: jest.Mock;

  const getAuthorizePaymentUrl = jest.fn();

  beforeEach(() => {
    post = jest.fn();
    getAuthorizePaymentUrl.mockReturnValue('http://mockurl');

    TestBed.configureTestingModule({
      providers: [
        PaymentService,
        {
          provide: HttpClient,
          useValue: {
            post
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getAuthorizePaymentUrl
          }
        }
      ]
    });

    service = TestBed.get(PaymentService);

  });

  describe('authorizePayment ', () => {

    it('should authorize, save urls and reset', () => {
      const response$ = cold('-a', { a: authorizeResponse });
      const expected$ = cold('-b', { b: authorizeResponse });
      const subs = '^';

      post.mockReturnValue(response$);

      expect(service.authorizePayment({} as AuthorizeRequest)).toBeObservable(expected$);
      expect(response$).toHaveSubscriptions(subs);
      expect(service.hasAuthorized()).toBeTruthy();
      expect(service.getCancelUrl()).toMatchSnapshot();
      expect(service.getSettleUrl()).toMatchSnapshot();

      service.resetAuthorize();
      expect(service.hasAuthorized()).toBeFalsy();
    });

    it('should handle error', () => {
      const expected$ = cold('-(a|)', { a: { status: 400 } });
      const response$ = cold('-#', {}, { status: 400 });
      post.mockReturnValue(response$);

      expect(service.authorizePayment({} as AuthorizeRequest)).toBeObservable(expected$);
    });

  });


  describe('confirmPayment ', () => {

    beforeEach(() => {
      const mockSettleUrl = jest.fn();
      service.getSettleUrl = mockSettleUrl;
      mockSettleUrl.mockReturnValue('http://mock-settle');
    });

    it('should confirm, save and reset urls', () => {

      const response$ = cold('-a', { a: settleResponse });
      const expected$ = cold('-b', { b: settleResponse });
      const subs = '^';

      post.mockReturnValue(response$);

      expect(service.confirmPayment()).toBeObservable(expected$);
      expect(response$).toHaveSubscriptions(subs);
      expect(service.hasSettled()).toBeTruthy();
      expect(service.getRefundUrl()).toMatchSnapshot();

      service.resetRefund();
      expect(service.hasSettled()).toBeFalsy();
    });

    it('should handle error', () => {
      const response$ = cold('-#', {}, { status: 400 });
      const expected$ = cold('-(a|)', { a: { status: 400 } });
      post.mockReturnValue(response$);

      expect(service.confirmPayment()).toBeObservable(expected$);
    });

  });

  describe('cancelPayment ', () => {

    beforeEach(() => {
      const mockGetCancelUrl = jest.fn();
      service.getCancelUrl = mockGetCancelUrl;
      mockGetCancelUrl.mockReturnValue('http://mock-cancel');
    });

    it('should cancel payment', () => {
      const response$ = cold('-a', { a: '*' });
      const expected$ = cold('-b', { b: '*' });
      const subs = '^';

      post.mockReturnValue(response$);
      expect(service.cancelPayment()).toBeObservable(expected$);
      expect(response$).toHaveSubscriptions(subs);
    });

    it('should handle error', () => {
      const expected$ = cold('-(a|)', { a: { status: 400 } });
      const response$ = cold('-#', {}, { status: 400 });
      post.mockReturnValue(response$);

      expect(service.cancelPayment()).toBeObservable(expected$);
    });

  });

  describe('refundPayment ', () => {

    beforeEach(() => {
      const mockGetRefundUrl = jest.fn();
      service.getRefundUrl = mockGetRefundUrl;
      mockGetRefundUrl.mockReturnValue('http://mock-refund');
    });

    it('should refund payment', () => {
      const response$ = cold('-a', { a: '*' });
      const expected$ = cold('-b', { b: '*' });
      const subs = '^';

      post.mockReturnValue(response$);

      expect(service.refundPayment()).toBeObservable(expected$);
      expect(response$).toHaveSubscriptions(subs);
    });

    it('should handle error', () => {
      const expected$ = cold('-(a|)', { a: { status: 400 } });
      const response$ = cold('-#', {}, { status: 400 });
      post.mockReturnValue(response$);

      expect(service.refundPayment()).toBeObservable(expected$);
    });

  });

});
