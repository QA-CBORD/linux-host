import { clearIndexedDB, pause, restartApp, url } from '../helpers';

import Entry from '../pageobjects/entry.page';
import Institution from '../pageobjects/institutions.page';

describe('Entry', () => {
  beforeEach(async () => {
    await restartApp('/anonymous/entry');
    await url('/anonymous/entry');

    await pause(500);
  });

  it('Should change environment to develop', async () => {
    const {changeEnvButton, changeEnvAlert} = await Entry;
    
    //Button needs to be clicked more than 4 times
    for (let i = 0; i < 5; i++) {
      await changeEnvButton.tap();
    }
    await pause(500);
    const developOpt = await changeEnvAlert.getOpt('Development');
    await developOpt.click();
    await pause(500);

    const okButton = await changeEnvAlert.button('Ok');
    await okButton.click();
    await pause(500);

    await expect((await $(changeEnvAlert.selector))).not.toBeDisplayed();
  });

  it('Should open intitutions', async () => {
    const institutionsButton = await Entry.searchInstitutionsButton;
    await institutionsButton.tap();
    await url('/anonymous/institutions');
    await pause(500);
    const pageTitle = await Institution.institutionPageTitle;
    await expect(pageTitle).toHaveText('Select Institution');
  });
});
