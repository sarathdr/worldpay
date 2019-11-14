import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { PaymentService } from './services/payment.service';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


export const fetchConfig = (appConfig: ConfigService) => {
  return () => appConfig.getPaymentUrls();
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    ConfigService,
    PaymentService,
    HttpClientModule,
    CartService,
    {
      provide: APP_INITIALIZER,
      useFactory: fetchConfig,
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class CoreModule { }
