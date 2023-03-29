

import { pause } from '../../helpers';
import PaymentsPage from '../../pageobjects/payments.page';

import { AWAIT_TIME } from '../constants';

describe('Delete credit cards', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });


    it('Should delete payments methods if exists', async () => {

        await pause(AWAIT_TIME);
        const PaymentLists = await PaymentsPage.PaymentsIonList;
        await pause(AWAIT_TIME);

        const handleDelete = async (i: number) => {
            const deleteBtn = await PaymentsPage.DeleteButton(i);
            await deleteBtn.click();
            // Add some wait time after each deletion
            await pause(AWAIT_TIME * 4);

            const DeleteModal = await PaymentsPage.DeleteModal;
            await pause(AWAIT_TIME);
            await expect((await $(DeleteModal.selector))).toBeDisplayed();

            const ConfirmDeleteButton = await PaymentsPage.ConfirmDeleteButtonInModal;
            await pause(AWAIT_TIME);
            await expect((await $(ConfirmDeleteButton.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            await ConfirmDeleteButton.click();
        }

        // Check if PaymentLists exists
        if (await PaymentLists.isDisplayed()) {
            // Get the number of elements in PaymentLists
            const numPayments = await PaymentLists.$$('ion-item').length;

            if (numPayments === 1) {
                await handleDelete(1);
            } else {
                let deleted = 0;
                // Iterate over the elements and delete each item using the DeleteButton method
                for (let i = 1; i <= numPayments; i++) {
                    await handleDelete(numPayments - deleted)
                    deleted++;
                }
            }
        }
    });


});


