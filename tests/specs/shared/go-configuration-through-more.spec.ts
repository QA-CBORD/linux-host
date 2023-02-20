

import { pause } from '../../helpers';
import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('GoToConfigurationThroughMore', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    it('Should press More Button', async () => {

        const MoreButton = await dashboardPage.MoreButton;
        await pause(AWAIT_TIME);
        await expect((await $(MoreButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        MoreButton.click();
    });

    it('Should press Inner Configuration Button', async () => {
        await pause(AWAIT_TIME);

        const InnerConfigurationButton = await dashboardPage.InnerConfigurationButton;
        await pause(AWAIT_TIME);
        await expect((await $(InnerConfigurationButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        InnerConfigurationButton.click();
    });
});


