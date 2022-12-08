import { pause } from '../helpers';

import PreLogin from '../pageobjects/pre-login.page';

describe('PreLogin', () => {

    beforeEach(async () => {
        await pause(500);
    });

    it('Should continue as Guest', async () => {
        const ContinueAsGuestButton = await PreLogin.ContinueAsGuestButton;

        await pause(500);

        await expect((await $(ContinueAsGuestButton.selector))).toBeDisplayed();

        await pause(500);

        ContinueAsGuestButton.click();
    });
});
