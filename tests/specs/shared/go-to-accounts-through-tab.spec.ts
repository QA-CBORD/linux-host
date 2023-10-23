

import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('GoToAccountsThroughTile', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    it('should validate that we are on dashboard', async () => {

        const dashboardContainer = await dashboardPage.DashboardHeaderCover;
        await pause(AWAIT_TIME);
        expect((await $(dashboardContainer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });

    it('should go to accounts through tab', async () => {
        const accountsTab = await dashboardPage.AccountsIcon;
        await pause(AWAIT_TIME);
        expect((await $(accountsTab.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        accountsTab.click();
        await pause(AWAIT_TIME);
        const autoDepositButton = await accountsPage.AutoDepositsButton;
        expect((await $(autoDepositButton.selector))).toBeDisplayed();
    });

});


