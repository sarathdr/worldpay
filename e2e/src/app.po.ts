import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.mat-toolbar span')).getText() as Promise<string>;
  }

  getPageTitle() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getContinuePaymentButton() {
    return element(by.buttonText('Continue to payment'));
  }

  async typeCardHolderName(name: string) {
    const nameInput = element(by.css('input[name="cardHolderName"]'));
    await nameInput.clear();
    await nameInput.sendKeys(name);
  }

  async typeCardNumber(cardNumber: string) {
    const cardNumberInput = element(by.css('input[name="cardNumber"]'));
    await cardNumberInput.clear();
    await cardNumberInput.sendKeys(cardNumber);
  }

  async selectMonth(month: string) {
    await element(by.css('.mat-select')).click();
    await element(by.cssContainingText('.mat-option', month)).click();
  }

  async typeYear(year: string) {
    const yearInput = element(by.css('input[name="year"]'));
    await yearInput.clear();
    await yearInput.sendKeys(year);
  }

  getPaymentButton() {
    return element(by.buttonText('Next'));
  }

  getConfirmPaymentButton() {
    return element(by.buttonText('Confirm'));
  }

  getRefundPaymentButton() {
    return element(by.buttonText('Refund'));
  }

  getCancelPaymentButton() {
    return element(by.buttonText('Cancel'));
  }

}
