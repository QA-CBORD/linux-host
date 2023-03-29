import { pause } from '../../helpers';

import EmailSentPage from '../../pageobjects/emailsent.page';
import { AWAIT_TIME } from '../constants';

describe('EmailSent', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should display the email sent screen', async () => {

        const EmailSentDisclaimer = await EmailSentPage.EmailSentDisclaimer;
        await pause(AWAIT_TIME);
        await expect((await $(EmailSentDisclaimer.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
    });

    it('Should return to login', async() => {
        const ReturnToLoginButton = await EmailSentPage.ReturnToLoginButton;
        await pause(AWAIT_TIME);
        await expect((await $(ReturnToLoginButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);      

        ReturnToLoginButton.click();
    });
});
