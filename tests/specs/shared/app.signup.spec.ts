import { pause } from '../../helpers';

import PreLogin from '../../pageobjects/login.page';
import { AWAIT_TIME } from '../constants';

describe('SignUp', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should click on SignUp Button', async () => {
        const SignupButton = await PreLogin.SignupButton;

        await pause(AWAIT_TIME);

        await expect((await $(SignupButton.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        SignupButton.click();
    });
});
