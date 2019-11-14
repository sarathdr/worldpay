import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PaymentResponse } from '../models/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly getPayments = environment.baseUrl + '/payments';

  private authorizePaymentUrl: string;

  constructor(private http: HttpClient) {
  }

  getPaymentUrls() {
    return this.http.get(this.getPayments).pipe(
      tap(({ _links }: PaymentResponse) => {
        this.authorizePaymentUrl = _links['payments:authorize'].href;
      })
    ).toPromise();
  }

  getAuthorizePaymentUrl(): string {
    return this.authorizePaymentUrl;
  }
}
