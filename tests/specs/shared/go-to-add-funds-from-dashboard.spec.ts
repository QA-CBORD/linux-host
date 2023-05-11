import {  pause } from '../../helpers';
import dashboardPage from 'tests/pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('GoToAddFundsFromDashboard', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('should display add funds button',async ()=>{
        const addFundsButton = await dashboardPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await expect((await $(addFundsButton.selector))).toBeDisplayed();
    });

    it('should click add funds button',async ()=>{
        const addFundsButton = await dashboardPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await addFundsButton.click();
        await pause(AWAIT_TIME);
    });
 });

