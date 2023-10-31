

import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('GoToAccountsThroughtTile', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    it('Should validate that we are on dashboard', async () => {

        const dashboardContainer = await dashboardPage.DashboardHeaderCover;
        await pause(AWAIT_TIME);
        expect((await $(dashboardContainer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });

    it('Should go to accounts throught tile', async () => {
        const accountsTileHeader = await dashboardPage.AccountsTileHeader;
        await pause(AWAIT_TIME);
        expect((await $(accountsTileHeader.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        accountsTileHeader.click();
        await pause(AWAIT_TIME);
        const accountPage = await accountsPage.AddFundsButton;
        expect((await $(accountPage.selector))).toBeDisplayed();

    });
});


