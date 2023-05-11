import {  pause } from '../../helpers';
import dashboardPage from 'tests/pageobjects/dashboard.page';
import accountsPage from 'tests/pageobjects/accounts.page';

import { AWAIT_TIME } from '../constants';

describe('GoToAddFundsFromAccount', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Go to accounts page', async ()=>{
        const AccountsIcon = await dashboardPage.AccountsIcon;
        await pause(AWAIT_TIME);
        await expect((await $(AccountsIcon.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await AccountsIcon.click();
        await pause(AWAIT_TIME);
    });

    it('should display add funds button',async ()=>{
        const addFundsButton = await accountsPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await expect((await $(addFundsButton.selector))).toBeDisplayed();
    });

    it('should click add funds button',async ()=>{
        const addFundsButton = await accountsPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await addFundsButton.click();
        await pause(AWAIT_TIME);
    });
 });

