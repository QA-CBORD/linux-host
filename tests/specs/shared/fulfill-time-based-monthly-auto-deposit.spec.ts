

import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import { AWAIT_TIME } from '../constants';
import autoDepositPage from 'tests/pageobjects/auto-deposit.page';

describe('TimeBasedAutoDeposit', () => {

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

    it('should select time based option and render form', async () => {
        const timeBasedOption = await autoDepositPage.TimeBasedOption;
        await pause(AWAIT_TIME);

        expect((await $(timeBasedOption.selector))).toBeDisplayed();
        timeBasedOption.click();
        await pause(AWAIT_TIME);
        const form = await autoDepositPage.Form;
        expect((await $(form.selector))).toBeDisplayed();
    });

    describe('should fullfil form for time based', async () => {

        it('should display form', async () => {
            const form = await autoDepositPage.Form;
            await pause(AWAIT_TIME);
            expect((await $(form.selector))).toBeDisplayed();
        })

        it('should select day once per month option', async () => {
            const frecuencyRadioGroup = await autoDepositPage.FrecuencyRadioGroup;
            await pause(AWAIT_TIME);
            expect((await $(frecuencyRadioGroup.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            const oncePerMonth = await autoDepositPage.OncePerMonthOption;
            await pause(AWAIT_TIME);
            expect((await $(oncePerMonth.selector))).toBeDisplayed();
            oncePerMonth.click()
            await pause(AWAIT_TIME);
            const dayOfTheWeekSelect = await autoDepositPage.DayOfTheWeekSelect;
            await pause(AWAIT_TIME);
            expect((await $(dayOfTheWeekSelect.selector))).toBeDisplayed();
        });

        it('should insert value for day of the month input', async () => {
            const dayOfTheMonth = await autoDepositPage.DayOfTheMonthInput;
            await pause(AWAIT_TIME);
            expect((await $(dayOfTheMonth.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            dayOfTheMonth.setValue(15);
            await pause(AWAIT_TIME);
            expect((await $(dayOfTheMonth.selector))).toHaveValue('15');
        });

        it('should select payment method', async () => {
            const paymentSelect = await autoDepositPage.PaymentSelectTimeBased;
            await pause(AWAIT_TIME);
            await paymentSelect.click()
            await pause(AWAIT_TIME);
            const billMeOption = await autoDepositPage.BilmeOptionTimeBased;
            await pause(AWAIT_TIME);
            expect((await $(billMeOption.selector))).toBeDisplayed();
            await billMeOption.click();
            await pause(AWAIT_TIME);
        })

        it('should select account', async () => {
            const accountSelect = await autoDepositPage.AccountSelectTimeBased;
            await pause(AWAIT_TIME);
            expect((await $(accountSelect.selector))).toBeDisplayed();
            await accountSelect.click()
            await pause(AWAIT_TIME);
            const dinningDollarsOption = await autoDepositPage.DiningDolarsOptionTimeBased;
            await pause(AWAIT_TIME);
            expect((await $(dinningDollarsOption.selector))).toBeDisplayed();
            await dinningDollarsOption.click();
            await pause(AWAIT_TIME);
        })

        it('should insert amount value', async () => {
            const amountInput = await autoDepositPage.AmountInputTimeBased;
            await pause(AWAIT_TIME);
            expect((await $(amountInput.selector))).toBeDisplayed();
            await amountInput.setValue(7)
            await pause(AWAIT_TIME);
        })
        it('should save button be clickable', async () => {
            const saveButton = await autoDepositPage.SaveButton;
            await pause(AWAIT_TIME);
            expect((await $(saveButton.selector))).toBeEnabled();
            expect((await $(saveButton.selector))).toBeClickable();
        })
    });
    describe('should save info', async () => {
        it('shoud click save button', async () => {
            const saveButton = await autoDepositPage.SaveButton;
            await pause(AWAIT_TIME);
            expect((await $(saveButton.selector))).toBeDisplayed();
            saveButton.click();
            await pause(AWAIT_TIME);
        })
        it('shoud open dialog ', async () => {
            const dialogTitle = await autoDepositPage.SavedDialogTitle;
            await pause(AWAIT_TIME);
            expect((await $(dialogTitle.selector))).toBeDisplayed();
            expect((await $(dialogTitle.selector))).toHaveText('Weekly Deposit Enabled!');
            await pause(AWAIT_TIME);
        })
        it('shoud click done button ', async () => {
            const dialogButton = await autoDepositPage.SavedDialogButton;
            await pause(AWAIT_TIME);
            expect((await $(dialogButton.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            dialogButton.click();
            await pause(AWAIT_TIME);
        })
        it('shoud redirect to accounts page ', async () => {
            const autoDepositButton = await accountsPage.AutoDepositsButton;
            expect((await $(autoDepositButton.selector))).toBeDisplayed();
        })
    })




});


