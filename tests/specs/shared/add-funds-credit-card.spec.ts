import { pause } from '../../helpers';
import addFundsPage from 'tests/pageobjects/add-funds.page';
import { AWAIT_TIME } from '../constants';

describe('AddFunds With Credit Card', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    it('should click payment method select', async () => {
        await pause(AWAIT_TIME);
        const SelectPaymentMethod = await addFundsPage.SelectPaymentMethod;
        await pause(AWAIT_TIME);
        await SelectPaymentMethod.click();
        await pause(AWAIT_TIME);
    });

    it('should select any credit card payment method', async () => {
        await pause(AWAIT_TIME);
        const PaymentsMethods = await addFundsPage.PaymentMethodOptions;

        if (await PaymentsMethods.isDisplayed()) {
            const paymentButtons = await PaymentsMethods.$$('button');
            for (let i = 0; i < paymentButtons.length; i++) {
                const paymentButton = paymentButtons[i];
                const paymentButtonSpan = await paymentButton.$('span');
                const paymentButtonText = await paymentButtonSpan.getText();
                if (paymentButtonText.includes('ending in')) {
                    await paymentButton.click();
                    break;
                }
            }
        }
    });
    it('should click to account select', async () => {
        await pause(AWAIT_TIME);
        const SelectToAccount = await addFundsPage.SelectToAccount;
        await pause(AWAIT_TIME);
        await SelectToAccount.click();
        await pause(AWAIT_TIME);
    });

    it('should select account', async () => {
        await pause(AWAIT_TIME);
        const AccountOptions = await addFundsPage.AccountOptions;
        await pause(AWAIT_TIME);
        await AccountOptions.click();
        await pause(AWAIT_TIME);
    });

    it('should set 5 dollars in input', async () => {
        await pause(AWAIT_TIME);
        const inputDeposit = await addFundsPage.InputDeposit;
        await pause(AWAIT_TIME);
        await inputDeposit.click();
        await inputDeposit.setValue('5')
    });
});

