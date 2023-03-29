import { pause } from '../../helpers';

import PreLogin from '../../pageobjects/pre-login.page';
import { AWAIT_TIME } from '../constants';

describe('PreLogin', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should continue as Guest', async () => {
        const ContinueAsGuestButton = await PreLogin.ContinueAsGuestButton;

        await pause(AWAIT_TIME);

        await expect((await $(ContinueAsGuestButton.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        ContinueAsGuestButton.click();
    });
});
