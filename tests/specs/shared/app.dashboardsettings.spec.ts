import { pause } from '../../helpers';

import Settings from '../../pageobjects/dashboard.page';
import SettingsTitle from '../../pageobjects/settings.page';
import { AWAIT_TIME } from '../constants';

describe('Settings', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should click on Settings', async () => {
        const SettingsIcon = await Settings.SettingsIcon;

        await pause(AWAIT_TIME);

        await expect((await $(SettingsIcon.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        SettingsIcon.click();
    });

    it('Should dispaly Settings Screen', async () => {
        const settingstitle = await SettingsTitle.settingstitle;

        await pause(AWAIT_TIME);

    });
});
