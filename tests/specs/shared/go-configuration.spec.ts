

import { pause } from '../../helpers';
import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('GoToConfiguration', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    it('Should press Configuration Button', async () => {

        const configurationBtn = await dashboardPage.ConfigurationButton;
        await pause(AWAIT_TIME);
        await expect((await $(configurationBtn.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        configurationBtn.click();
    });
});


