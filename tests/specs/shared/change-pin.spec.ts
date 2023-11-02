import { pause, restartApp, url } from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import emailAndPhoneNumberEditPage from '../../pageobjects/email-phone-number-edit.page';
import changePIN from '../../pageobjects/createnewpin.page';
import { AWAIT_TIME } from '../constants';
import { setPinWithNumber2, setPinWithNumber3 } from 'tests/helpers/shared.functions';
import dashboardPage from '../../pageobjects/dashboard.page';

describe('ChangePIN', () => {
  beforeEach(async () => {
    await pause(AWAIT_TIME);
  });

  it('should validate change PIN button is displayed', async () => {
    await pause(AWAIT_TIME);
    const changePIN = await configurationPage.ChangePIN;
    await pause(AWAIT_TIME);
    await expect(await $(changePIN.selector)).toBeDisplayed();

    changePIN.click();
  });

  it('should shoul show insert current PIN title', async () => {
    const pinButton = await changePIN.pinPageTitle;
    await pause(AWAIT_TIME);
    await expect(await $(pinButton.selector)).toBeDisplayed();
    await expect(await $(pinButton.selector)).toHaveText('Enter current PIN');
  });

  it('should insert current PIN', async () => {
    const pinButton = await changePIN.pinButton2;
    await pause(AWAIT_TIME);
    await expect(await $(pinButton.selector)).toBeDisplayed();
    await pause(AWAIT_TIME);
    setPinWithNumber2();
  });

  it('should show create new pin title', async () => {
    const title = await changePIN.pinPageTitle;
    await pause(AWAIT_TIME);
    await expect(await $(title.selector)).toBeDisplayed();
    await expect(await $(title.selector)).toHaveTextContaining('Create a 4 digit PIN');
  });

  it('should insert new PIN', async () => {
    const pinButton = await changePIN.pinButton2;
    await pause(AWAIT_TIME);
    await expect(await $(pinButton.selector)).toBeDisplayed();
    await pause(AWAIT_TIME);
    setPinWithNumber3();
  });

  it('should show confirm new pin title', async () => {
    const title = await changePIN.pinPageTitle;
    await pause(AWAIT_TIME);
    await expect(await $(title.selector)).toBeDisplayed();
    await expect(await $(title.selector)).toHaveText('Confirm your new PIN');
  });

  it('should insert new PIN', async () => {
    const pinButton = await changePIN.pinButton2;
    await pause(AWAIT_TIME);
    await expect(await $(pinButton.selector)).toBeDisplayed();
    await pause(AWAIT_TIME);
    setPinWithNumber3();
  });
  it('should redirect to settings page', async () => {
    const title = await configurationPage.Titlte;
    await pause(AWAIT_TIME);
    await expect(await $(title.selector)).toBeDisplayed();
  });

  //TODO: Reauth with new PIN using appium
});
