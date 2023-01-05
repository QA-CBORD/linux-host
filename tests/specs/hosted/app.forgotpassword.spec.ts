import { pause } from '../../helpers';

import ForgotPasswordPage from '../../pageobjects/forgotpassword.page';
import { AWAIT_TIME } from '../constants';

describe('ForgotPassword', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should display forgot password screen', async () => {

        const ForgotPasswordDisclaimer = await ForgotPasswordPage.ForgotPasswordDisclaimer;
        await pause(AWAIT_TIME);
        await expect((await $(ForgotPasswordDisclaimer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
    });

    it('Should submit password email', async() => {
        const ForgotPasswordEmail = await ForgotPasswordPage.ForgotPasswordEmail;
        await pause(AWAIT_TIME);
        await expect((await $(ForgotPasswordEmail.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);      
        
        
        await ForgotPasswordEmail.setValue('getaws403@test.cbord.com')

        await pause(AWAIT_TIME);

        const ForgotPasswordDisclaimer = await ForgotPasswordPage.ForgotPasswordDisclaimer;
        await pause(AWAIT_TIME);
        await expect((await $(ForgotPasswordDisclaimer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);     

        ForgotPasswordDisclaimer.click();

        const SubmitForgotPassword = await ForgotPasswordPage.SubmitForgotPassword;
        await pause(AWAIT_TIME);
        await expect((await $(SubmitForgotPassword.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       

        SubmitForgotPassword.click();
    });
});
