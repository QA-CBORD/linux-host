import { pause } from '../../helpers';

import Login from '../../pageobjects/login.page';
import { AWAIT_TIME } from '../constants';

describe('GoToForgotPassword', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should redirect press forgot password link', async () => {

        const ForgotPasswordLink = await Login.ForgotPassword;
        await pause(AWAIT_TIME);
        await expect((await $(ForgotPasswordLink.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
        ForgotPasswordLink.click();
    });
});
