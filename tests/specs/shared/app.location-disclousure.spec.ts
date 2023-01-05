import { pause } from '../../helpers';
import LocationDisclousurePage from '../../pageobjects/location-disclousure.page';

import { AWAIT_TIME } from '../constants';

describe('LocationDisclousure', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should display the location disclousure', async () => {
        const LocationTitle = await LocationDisclousurePage.useLocationTitle;
        await pause(AWAIT_TIME);
        await expect((await $(LocationTitle.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        const LocationButton = await LocationDisclousurePage.locationSettingsButton;
        await pause(AWAIT_TIME);
        await expect((await $(LocationButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });
});
