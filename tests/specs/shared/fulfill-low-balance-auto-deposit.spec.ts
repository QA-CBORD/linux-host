

import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import { AWAIT_TIME } from '../constants';
import autoDepositPage from 'tests/pageobjects/auto-deposit.page';

describe('LowBalanceAutoDeposit', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
   

    it('should open auto deposit page', async () => {
        const autoDepositButton = await accountsPage.AutoDepositsButton;
        await pause(AWAIT_TIME);

        expect((await $(autoDepositButton.selector))).toBeDisplayed();
        autoDepositButton.click();
        await pause(AWAIT_TIME);
        const autoDepositTitle = await autoDepositPage.AutoDepositsTitle;
        expect((await $(autoDepositTitle.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });

    it('should select low balance option and render form', async () => {
        const lowBalanceOption = await autoDepositPage.LowBalanceOption;
        await pause(AWAIT_TIME);

        expect((await $(lowBalanceOption.selector))).toBeDisplayed();
        lowBalanceOption.click();
        await pause(AWAIT_TIME);
        const form = await autoDepositPage.Form;
        expect((await $(form.selector))).toBeDisplayed();
    });

    describe('should fullfil form for low balance and button be disabled until finished', async () => {

        it('should display form', async () => {
            const form = await autoDepositPage.Form;
            await pause(AWAIT_TIME);
            expect((await $(form.selector))).toBeDisplayed();
        })

        it('should select payment method', async () => {
            const paymentSelect = await autoDepositPage.PaymentSelectLowBalance;
            await pause(AWAIT_TIME);
            await paymentSelect.click()
            await pause(AWAIT_TIME);
            const billMeOption = await autoDepositPage.BilmeOptionLowBalance;
            await pause(AWAIT_TIME);
            expect((await $(billMeOption.selector))).toBeDisplayed();
            await billMeOption.click();
            await pause(AWAIT_TIME);
            expect((await $(billMeOption.selector))).toHaveText('Bill Me');

        })

        it('should select account', async () => {
            const accountSelect = await autoDepositPage.AccountSelectLowBalance;
            await pause(AWAIT_TIME);
            expect((await $(accountSelect.selector))).toBeDisplayed();
            await accountSelect.click()
            await pause(AWAIT_TIME);
            const dinningDollarsOption = await autoDepositPage.DiningDolarsOptionLowBalance;
            await pause(AWAIT_TIME);
            expect((await $(dinningDollarsOption.selector))).toBeDisplayed();
            await dinningDollarsOption.click();
            await pause(AWAIT_TIME);
            expect((await $(accountSelect.selector))).toHaveTextContaining('Dinning Dollars');

        })

        it('should insert amount value', async () => {
            const amountInput = await autoDepositPage.AmountInputLowBalance;
            await pause(AWAIT_TIME);
            expect((await $(amountInput.selector))).toBeDisplayed();
            await amountInput.setValue(7)
            await pause(AWAIT_TIME);
            expect((await $(amountInput.selector))).toHaveValue('7');

        })
        it('should insert limit amout value', async () => {
            const limitInput = await autoDepositPage.BalanceLimitInput;
            await pause(AWAIT_TIME);
            expect((await $(limitInput.selector))).toBeDisplayed();
            await limitInput.setValue(2)
            await pause(AWAIT_TIME);
            expect((await $(limitInput.selector))).toHaveValue('2');

        })
        it('should save button be clickable', async () => {
            const saveButton = await autoDepositPage.SaveButton;
            await pause(AWAIT_TIME);
            expect((await $(saveButton.selector))).toBeEnabled();
            expect((await $(saveButton.selector))).toBeClickable();
        })
        describe('should save info', async () => {
            
            it('shoud open dialog ', async () => {
                const saveButton = await autoDepositPage.SaveButton;
                await pause(AWAIT_TIME);
                expect((await $(saveButton.selector))).toBeDisplayed();
                saveButton.click();
                await pause(AWAIT_TIME);
                const dialogTitle = await autoDepositPage.SavedDialogTitle;
                await pause(AWAIT_TIME);
                expect((await $(dialogTitle.selector))).toBeDisplayed();
                expect((await $(dialogTitle.selector))).toHaveText('Low Balance Deposit Enabled!');
                await pause(AWAIT_TIME);
            })

            it('shoud save and redirect to accounts ', async () => {
                const dialogButton = await autoDepositPage.SavedDialogButton;
                await pause(AWAIT_TIME);
                expect((await $(dialogButton.selector))).toBeDisplayed();
                await pause(AWAIT_TIME);
                dialogButton.click();
                await pause(AWAIT_TIME);
                const autoDepositButton = await accountsPage.AutoDepositsButton;
                await pause(AWAIT_TIME);

                expect((await $(autoDepositButton.selector))).toBeDisplayed();
            })
    
        })
    });




});


