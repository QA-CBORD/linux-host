import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import { AWAIT_TIME } from '../constants';
import autoDepositPage from 'tests/pageobjects/auto-deposit.page';

describe('AutoDeposit', () => {
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

  it('should select automatic deposit option', async () => {
    const autoDepositOption = await autoDepositPage.AutomaticDepositOption;
    await pause(AWAIT_TIME);

    expect(await $(autoDepositOption.selector)).toBeDisplayed();
    autoDepositOption.click();
    await pause(AWAIT_TIME);
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
