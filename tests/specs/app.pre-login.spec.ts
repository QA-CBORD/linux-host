import { pause } from '../helpers';

import PreLogin from '../pageobjects/pre-login.page';

describe('PreLogin', () => {

    beforeEach(async () => {
        await pause(500);
    });

    it('Should continue as student', async () => {
        const ContinueAsStudentButton = await PreLogin.ContinueAsStudentButton;

        await pause(500);

        await expect((await $(ContinueAsStudentButton.selector))).toBeDisplayed();

        await pause(500);

        ContinueAsStudentButton.click();
    });
});
