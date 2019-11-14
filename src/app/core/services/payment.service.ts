import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthorizeRequest, AuthorizeResponse } from '../models/payment.interface';
import { ConfigService } from './config.service';
import { PaymentResponse } from '../models/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // todo - Nice to have a caching service, or ngRx store
  private authorizeResponse: AuthorizeResponse;
  private refundUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  authorizePayment(body: AuthorizeRequest) {
    return this.http.post(this.config.getAuthorizePaymentUrl(), body).pipe(
      tap(({ _links }: PaymentResponse) => {
        this.authorizeResponse = {
          settleUrl: _links['payments:settle'].href,
          cancelUrl: _links['payments:cancel'].href
        };
      }),
      catchError(error => of(error))
    );
  }

  confirmPayment() {
    return this.http.post(this.getSettleUrl(), {}).pipe(
      tap(({ _links }: PaymentResponse) => {
        this.refundUrl = _links['payments:refund'].href;
      }),
      catchError(error => of(error))
    );
  }

  cancelPayment() {
    return this.http.post(this.getCancelUrl(), {}).pipe(
      catchError(error => of(error))
    );
  }

  refundPayment() {
    return this.http.post(this.getRefundUrl(), {}).pipe(
      catchError(error => of(error))
    );
  }

  hasAuthorized(): boolean {
    return !!this.authorizeResponse;
  }

  hasSettled(): boolean {
    return !!this.refundUrl;
  }

  resetAuthorize() {
    this.authorizeResponse = null;
  }

  resetRefund() {
    this.refundUrl = null;
  }

  getRefundUrl() {
    return this.refundUrl;
  }

  getSettleUrl() {
    return this.authorizeResponse.settleUrl;
  }

  getCancelUrl() {
    return this.authorizeResponse.cancelUrl;
  }

}
