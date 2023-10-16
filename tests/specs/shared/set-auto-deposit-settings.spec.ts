

import accountsPage from 'tests/pageobjects/accounts.page';
import { pause } from '../../helpers';
import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';
import autoDepositPage from 'tests/pageobjects/auto-deposit.page';

describe('SetAutoDepositSettings', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should go to accounts throught tile', async () => {
        const accountsIcon = await dashboardPage.AccountsIcon;
        await pause(AWAIT_TIME);
        expect((await $(accountsIcon.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        accountsIcon.click();
        await pause(AWAIT_TIME);
        const autoDepositButton = await accountsPage.AutoDepositsButton;
        expect((await $(autoDepositButton.selector))).toBeDisplayed();
    });

    it('Should go to auto deposit page', async () => {
        const autoDepositButton = await accountsPage.AutoDepositsButton;
        expect((await $(autoDepositButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        autoDepositButton.click();
        await pause(AWAIT_TIME);
        const autoDepositPageTitle = await autoDepositPage.AutoDepositsTitle;
        expect((await $(autoDepositPageTitle.selector))).toBeDisplayed();
    });
});


