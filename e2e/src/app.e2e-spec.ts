import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should make the payment and refund', async () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Worldpay - Payment');

    await page.getContinuePaymentButton().click();
    await page.typeCardHolderName('John');
    await page.typeCardNumber('3423423234324');
    await page.selectMonth('1');
    await page.typeYear('2020');

    await page.getPaymentButton().click();
    expect(page.getPageTitle()).toEqual('Your payment details has been authorized');

    await page.getConfirmPaymentButton().click();
    expect(page.getPageTitle()).toEqual('Your have successfully made the payment');

    await page.getRefundPaymentButton().click();
    expect(page.getPageTitle()).toEqual('Your payment has been refunded');

  });

  it('should authorize an cancel payment', async () => {
    page.navigateTo();

    await page.getContinuePaymentButton().click();
    await page.typeCardHolderName('John');
    await page.typeCardNumber('3423423234324');
    await page.selectMonth('1');
    await page.typeYear('2020');

    await page.getPaymentButton().click();
    expect(page.getPageTitle()).toEqual('Your payment details has been authorized');

    await page.getCancelPaymentButton().click();
    expect(page.getContinuePaymentButton().isPresent()).toBeTruthy();

  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
