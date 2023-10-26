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

    expect(await $(autoDepositButton.selector)).toBeDisplayed();
    autoDepositButton.click();
    await pause(AWAIT_TIME);
    const autoDepositTitle = await autoDepositPage.AutoDepositsTitle;
    expect(await $(autoDepositTitle.selector)).toBeDisplayed();
    await pause(AWAIT_TIME);
  });

  it('should select time based option and render form', async () => {
    const timeBasedOption = await autoDepositPage.TimeBasedOption;
    await pause(AWAIT_TIME);

    expect(await $(timeBasedOption.selector)).toBeDisplayed();
    timeBasedOption.click();
    await pause(AWAIT_TIME);
    const form = await autoDepositPage.Form;
    expect(await $(form.selector)).toBeDisplayed();
  });

  describe('should fullfil form for time based', async () => {
    it('should display form', async () => {
      const form = await autoDepositPage.Form;
      await pause(AWAIT_TIME);
      expect(await $(form.selector)).toBeDisplayed();
    });

    it('should select once per week option', async () => {
      const frecuencyRadioGroup = await autoDepositPage.FrecuencyRadioGroup;
      await pause(AWAIT_TIME);
      expect(await $(frecuencyRadioGroup.selector)).toBeDisplayed();
      await pause(AWAIT_TIME);
      const oncePerweek = await autoDepositPage.OncePerWeekOption;
      await pause(AWAIT_TIME);
      expect(await $(oncePerweek.selector)).toBeDisplayed();
      oncePerweek.click();
      await pause(AWAIT_TIME);
      const dayOfTheWeekSelect = await autoDepositPage.DayOfTheWeekSelect;
      await pause(AWAIT_TIME);
      expect((await $(dayOfTheWeekSelect.selector))).toBeDisplayed();
    });

        it('should select wich day of the week', async () => {
            const dayOfTheWeekSelect = await autoDepositPage.DayOfTheWeekSelect;
            await pause(AWAIT_TIME);
            expect((await $(dayOfTheWeekSelect.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            dayOfTheWeekSelect.click()
            await pause(AWAIT_TIME);
            const mondayOption = await autoDepositPage.MondayOption;
            await pause(AWAIT_TIME);
            expect((await $(mondayOption.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);
            mondayOption.click()
            await pause(AWAIT_TIME);
            expect((await $(dayOfTheWeekSelect.selector))).toHaveText('Monday');

        });

        it('should select payment method', async () => {
            const paymentSelect = await autoDepositPage.PaymentSelect;
            await pause(AWAIT_TIME);
            await paymentSelect.click()
            await pause(AWAIT_TIME);
            const billMeOption = await autoDepositPage.BilmeOption;
            await pause(AWAIT_TIME);
            expect((await $(billMeOption.selector))).toBeDisplayed();
            await billMeOption.click();
            await pause(AWAIT_TIME);
        })

        it('should select account', async () => {
            const accountSelect = await autoDepositPage.AccountSelect;
            await pause(AWAIT_TIME);
            expect((await $(accountSelect.selector))).toBeDisplayed();
            await accountSelect.click()
            await pause(AWAIT_TIME);
            const dinningDollarsOption = await autoDepositPage.DiningDolarsOption;
            await pause(AWAIT_TIME);
            expect((await $(dinningDollarsOption.selector))).toBeDisplayed();
            await dinningDollarsOption.click();
            await pause(AWAIT_TIME);
        })

        it('should insert amount value', async () => {
            const amountInput = await autoDepositPage.AmountInput;
            const amountSelect = await autoDepositPage.AmountSelect;
            await pause(AWAIT_TIME);
            if (!amountInput.error) {
              console.log(amountInput);
              expect(await $(amountInput.selector)).toBeDisplayed();
              await amountInput.setValue(7);
      
              await pause(AWAIT_TIME);
              expect(await $(amountInput.selector)).toHaveValue('7');
            }
      
            if (!amountSelect.error) {
              expect(await $(amountSelect.selector)).toBeDisplayed();
              await pause(AWAIT_TIME);
              amountSelect.click();
              await pause(AWAIT_TIME);
              const amountOption = await autoDepositPage.AmountOption;
              await pause(AWAIT_TIME);
              expect(await $(amountOption.selector)).toBeDisplayed();
              await pause(AWAIT_TIME);
              amountOption.click();
              await pause(AWAIT_TIME);
              expect(await $(amountSelect.selector)).toHaveAttr('class', 'has-value');
            }
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
    
  });
});
