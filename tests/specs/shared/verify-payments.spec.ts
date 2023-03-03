

import { pause} from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import PaymentsPage from '../../pageobjects/payments.page';

import { AWAIT_TIME } from '../constants';

describe('Verify payments', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate that the payments methods button is displayed', async () => {
        await pause(AWAIT_TIME);
        const PaymentsMethodsBtn = await configurationPage.PaymentsMethods;
        await pause(AWAIT_TIME);
        await expect((await $(PaymentsMethodsBtn.selector))).toBeDisplayed();

        PaymentsMethodsBtn.click();
    });

    it('Should validate that the user can see payment screen', async () =>{
        await pause(AWAIT_TIME);
        const PaymentTitle = await PaymentsPage.Title;
        await pause(AWAIT_TIME);
        await expect((await $(PaymentTitle.selector))).toBeDisplayed();
    });


    it('Should validate that the user can see add payment button',async () =>{
        await pause(AWAIT_TIME);
        const AddNewPaymentMethodButton = await PaymentsPage.AddNewPaymentMethod;
        await pause(AWAIT_TIME);
        await expect((await $(AddNewPaymentMethodButton.selector))).toBeDisplayed();
    })
});


