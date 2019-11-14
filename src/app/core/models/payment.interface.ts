export const enum InstrumentType {
  CARD_PLAIN = 'card/plain'
}

export const enum Currency {
  GBP = 'GBP'
}

export interface Merchant {
  entity: string;
}

export interface Narrative {
  line1: string;
}

export interface Payment {
  currency: Currency;
  amount: number;
}

export interface CardExpiryDate {
  month: number;
  year: number;
}

export interface PaymentInstrument {
  type: InstrumentType;
  cardHolderName: string;
  cardNumber: number;
  cardExpiryDate: CardExpiryDate;
}

export interface Instruction {
  narrative: Narrative;
  value: Payment;
  paymentInstrument: PaymentInstrument;
}

export interface AuthorizeRequest {
  transactionReference: string;
  merchant: Merchant;
  instruction: Instruction;
}

export interface PaymentResponse {
  _links: { [key: string]: { href: string } };
}

export interface AuthorizeResponse {
  settleUrl: string;
  cancelUrl: string;
}


