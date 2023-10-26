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

    expect(await $(autoDepositButton.selector)).toBeDisplayed();
    autoDepositButton.click();
    await pause(AWAIT_TIME);
    const autoDepositTitle = await autoDepositPage.AutoDepositsTitle;
    expect(await $(autoDepositTitle.selector)).toBeDisplayed();
    await pause(AWAIT_TIME);
  });

  it('should select low balance option and render form', async () => {
    const lowBalanceOption = await autoDepositPage.LowBalanceOption;
    await pause(AWAIT_TIME);

    expect(await $(lowBalanceOption.selector)).toBeDisplayed();
    lowBalanceOption.click();
    await pause(AWAIT_TIME);
    const form = await autoDepositPage.Form;
    expect(await $(form.selector)).toBeDisplayed();
  });

  describe('should fullfil form for low balance and button be disabled until finished', async () => {
    it('should display form', async () => {
      const form = await autoDepositPage.Form;
      await pause(AWAIT_TIME);
      expect(await $(form.selector)).toBeDisplayed();
    });

    it('should select payment method', async () => {
      const paymentSelect = await autoDepositPage.PaymentSelect;
      await pause(AWAIT_TIME);
      await paymentSelect.click();
      await pause(AWAIT_TIME);
      const billMeOption = await autoDepositPage.BilmeOption;
      await pause(AWAIT_TIME);
      expect(await $(billMeOption.selector)).toBeDisplayed();
      await billMeOption.click();
      await pause(AWAIT_TIME);
      expect(await $(billMeOption.selector)).toHaveText('Bill Me');
    });

    it('should select account', async () => {
      const accountSelect = await autoDepositPage.AccountSelect;
      await pause(AWAIT_TIME);
      expect(await $(accountSelect.selector)).toBeDisplayed();
      await accountSelect.click();
      await pause(AWAIT_TIME);
      const dinningDollarsOption = await autoDepositPage.DiningDolarsOption;
      await pause(AWAIT_TIME);
      expect(await $(dinningDollarsOption.selector)).toBeDisplayed();
      await dinningDollarsOption.click();
      await pause(AWAIT_TIME);
      expect(await $(accountSelect.selector)).toHaveTextContaining('Dinning Dollars');
    });

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
    });
    it('should insert limit amout value', async () => {
      const balanceLimitInput = await autoDepositPage.BalanceLimitInput;
      const balanceLimitSelect = await autoDepositPage.BalanceLimitSelect;
      await pause(AWAIT_TIME);
      if (!balanceLimitInput.error) {
        expect(await $(balanceLimitInput.selector)).toBeDisplayed();
        await balanceLimitInput.setValue(7);

        await pause(AWAIT_TIME);
        expect(await $(balanceLimitInput.selector)).toHaveValue('7');
      }

      if (!balanceLimitSelect.error) {
        expect(await $(balanceLimitSelect.selector)).toBeDisplayed();
        await pause(AWAIT_TIME);
        const balanceLimitOption = await autoDepositPage.BalanceLimitOption;
        await pause(AWAIT_TIME);
        expect(await $(balanceLimitOption.selector)).toBeDisplayed();
        await pause(AWAIT_TIME);
        balanceLimitOption.click();
        await pause(AWAIT_TIME);
        expect(await $(balanceLimitOption.selector)).toHaveAttr('class', 'has-value');
      }
    });
    it('should save button be clickable', async () => {
      const saveButton = await autoDepositPage.SaveButton;
      await pause(AWAIT_TIME);
      expect(await $(saveButton.selector)).toBeEnabled();
      expect(await $(saveButton.selector)).toBeClickable();
    });
    describe('should save info', async () => {
      it('shoud open dialog ', async () => {
        const saveButton = await autoDepositPage.SaveButton;
        await pause(AWAIT_TIME);
        expect(await $(saveButton.selector)).toBeDisplayed();
        saveButton.click();
        await pause(AWAIT_TIME);
        const dialogTitle = await autoDepositPage.SavedDialogTitle;
        await pause(AWAIT_TIME);
        expect(await $(dialogTitle.selector)).toBeDisplayed();
        expect(await $(dialogTitle.selector)).toHaveText('Low Balance Deposit Enabled!');
        await pause(AWAIT_TIME);
      });

      it('shoud save and redirect to accounts ', async () => {
        const dialogButton = await autoDepositPage.SavedDialogButton;
        await pause(AWAIT_TIME);
        expect(await $(dialogButton.selector)).toBeDisplayed();
        await pause(AWAIT_TIME);
        dialogButton.click();
        await pause(AWAIT_TIME);
        const autoDepositButton = await accountsPage.AutoDepositsButton;
        await pause(AWAIT_TIME);

        expect(await $(autoDepositButton.selector)).toBeDisplayed();
      });
    });
  });
});
