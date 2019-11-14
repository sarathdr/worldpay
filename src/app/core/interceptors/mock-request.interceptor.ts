import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as authorize from '../../mock/authorize-config.json';
import * as authorizeResponse from '../../mock/authorize-response.json';
import * as settleResponse from '../../mock/settle-response.json';

@Injectable()
export class MockRequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.endsWith('/payments') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: authorize['default'] }));
    }

    if (request.url.endsWith('/payments/authorizations') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: authorizeResponse['default'] }));
    }

    if (request.url.includes('payments/settlements') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: settleResponse['default'] }));
    }

    if (request.url.includes('/payments/authorizations/cancellations') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201 }));
    }

    if (request.url.includes('payments/settlements/refunds/') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201 }));
    }

    return next.handle(request);
  }

}
