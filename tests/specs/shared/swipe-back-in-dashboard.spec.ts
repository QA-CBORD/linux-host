import { Gestures, pause } from '../../helpers';

import dashboardPage from '../../pageobjects/dashboard.page';
import { AWAIT_TIME } from '../constants';

describe('SwipeBackInDashboard', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should validate that we are on dashboard', async () => {

        const dashboardContainer = await dashboardPage.DashboardHeaderCover;
        await pause(AWAIT_TIME);
        await expect((await $(dashboardContainer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });

    it('Should swipe back and should stay in same screen', async () => {
        const dashboardContainer = await dashboardPage.DashboardHeaderCover;

        const rects = (await driver.getElementRect(dashboardContainer.elementId));

        const y = Math.round(rects.y + rects.height / 2);

        return Gestures.swipe(
            { x: Math.round(rects.x + rects.width * 0.1), y },
            {
                x: Math.round(rects.width - rects.width * 0.1),
                y,
            }
        );

    });
    it('Should validate that we are still on dashboard', async () => {

        const dashboardContainer = await dashboardPage.DashboardHeaderCover;
        await pause(AWAIT_TIME);
        await expect((await $(dashboardContainer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
    });

});


