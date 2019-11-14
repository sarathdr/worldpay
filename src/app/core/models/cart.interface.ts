import { Currency } from './payment.interface';

export interface Product {
  name: string;
  price: number;
}

export  interface Cart {
  products: Product[];
  total: number;
  currency: Currency;
}
