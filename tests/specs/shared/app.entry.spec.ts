import { pause, restartApp, url } from '../../helpers';

import Entry from '../../pageobjects/entry.page';
import Institution from '../../pageobjects/institutions.page';
import { AWAIT_TIME } from '../constants';

describe('Entry', () => {
  it('Should change environment to develop', async () => {
    await restartApp('/anonymous/entry');
    await url('/anonymous/entry');

    await pause(AWAIT_TIME);
    const { changeEnvButton, changeEnvAlert } = await Entry;
    //Button needs to be clicked more than 4 times
    for (let i = 0; i < 5; i++) {
      await (await changeEnvButton).click();
    }
    await pause(AWAIT_TIME);
    const developOpt = await changeEnvAlert.getOpt('Development');
    await developOpt.click();
    await pause(AWAIT_TIME);

    const okButton = await changeEnvAlert.button('Ok');
    await okButton.click();
    await pause(AWAIT_TIME);

    await expect(await $(changeEnvAlert.selector)).not.toBeDisplayed();
  });

  it('Should open institutions', async () => {
    const institutionsButton = await Entry.searchInstitutionsButton;
    await institutionsButton.tap();
    await pause(AWAIT_TIME);
    const pageTitle = await Institution.institutionPageTitle;
    await expect(pageTitle).toHaveText('Select Institution');
  });
});
