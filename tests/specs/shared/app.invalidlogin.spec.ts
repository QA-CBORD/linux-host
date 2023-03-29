import { pause } from '../../helpers';

import Login from '../../pageobjects/login.page';
import { AWAIT_TIME } from '../constants';

describe('Login', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should not login users with invalid credentials', async () => {
        const EmailInput = await Login.EmailInput;
        await pause(AWAIT_TIME);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        const PasswordInput = await Login.PasswordInput;
        await pause(AWAIT_TIME);
        await expect((await $(PasswordInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        await EmailInput.setValue('invalid@test.cbord.com')

        await pause(AWAIT_TIME);

        await PasswordInput.setValue('password1')

        await pause(AWAIT_TIME);

        const LoginTitle = await Login.LoginHeaderTitle;
        await pause(AWAIT_TIME);
        await expect((await $(LoginTitle.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
        LoginTitle.click();

        const LoginButton = await Login.LoginButton;
        await pause(AWAIT_TIME);
        await expect((await $(LoginButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       

        LoginButton.click();
    });

    it('Should stay on the login page', async () => {
        const LoginButton = await Login.LoginButton;
        await pause(AWAIT_TIME);
        await expect((await $(LoginButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME); 
      });
});
