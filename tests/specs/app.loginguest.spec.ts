import { pause } from '../helpers';

import Login from '../pageobjects/login.page';

describe('Login', () => {

    beforeEach(async () => {
        await pause(500);
    });

    it('Should login users with credentials', async () => {
        const EmailInput = await Login.EmailInput;
        await pause(500);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(500);

        const PasswordInput = await Login.PasswordInput;
        await pause(500);
        await expect((await $(PasswordInput.selector))).toBeDisplayed();
        await pause(500);

        await EmailInput.setValue('getauto1@test.cbord.com')

        await pause(500);

        await PasswordInput.setValue('password1')

        await pause(500);


        const LoginButton = await Login.LoginButton;
        await pause(500);
        await expect((await $(LoginButton.selector))).toBeDisplayed();
        await pause(500);       

        LoginButton.click();
    });
});
