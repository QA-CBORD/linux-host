import { pause } from '../../helpers';
import addFundsPage from 'tests/pageobjects/add-funds.page';
import { AWAIT_TIME } from '../constants';

describe('AddFunds with Bill Account', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('should click payment method select', async ()=>{
        await pause(AWAIT_TIME);
        const SelectPaymentMethod = await addFundsPage.SelectPaymentMethod;
        await pause(AWAIT_TIME);
        await SelectPaymentMethod.click();
        await pause(AWAIT_TIME);
    });

    it('should select bill payment method', async ()=>{
        await pause(AWAIT_TIME);
        const PaymentsMethods = await addFundsPage.PaymentMethodOptions;

        if (await PaymentsMethods.isDisplayed()) {
            const paymentButtons = await PaymentsMethods.$$('button');

            for (let i = 0; i < paymentButtons.length; i++) {
                const paymentButton = paymentButtons[i];
                const paymentButtonSpan = await paymentButton.$('span');
                const paymentButtonText = await paymentButtonSpan.getText();
                if (paymentButtonText.includes('Bill me')) {
                    await paymentButton.click();
                    break;
                }
            }
        }
    });

    it('should click to account select', async ()=>{
        await pause(AWAIT_TIME);
        const SelectToAccount = await addFundsPage.SelectToAccount;
        await pause(AWAIT_TIME);
        await SelectToAccount.click();
        await pause(AWAIT_TIME);
    });

    it('should select account', async ()=>{
        await pause(AWAIT_TIME);
        const AccountOptions = await addFundsPage.AccountOptions;
        await pause(AWAIT_TIME);
        await AccountOptions.click();
        await pause(AWAIT_TIME);
    });

    it('should select amount to deposit', async()=>{
        await pause(AWAIT_TIME);
        const SelectAmountToDeposit = await addFundsPage.SelectAmountToDeposit;
        await pause(AWAIT_TIME);
        await SelectAmountToDeposit.click();
        await pause(AWAIT_TIME);
    });

    it('should select 5 dollars amount', async ()=>{
        await pause(AWAIT_TIME);
        const FiveDollarsAmount = await addFundsPage.FiveDollarsAmount;
        await pause(AWAIT_TIME);
        await FiveDollarsAmount.click();
        await pause(AWAIT_TIME);
    });
  });

