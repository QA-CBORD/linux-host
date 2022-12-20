import { pause } from '../../helpers';

import PreLogin from '../../pageobjects/pre-login.page';
import { AWAIT_TIME } from '../constants';

describe('PreLogin', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should continue as student', async () => {
        const ContinueAsStudentButton = await PreLogin.ContinueAsStudentButton;

        await pause(AWAIT_TIME);

        await expect((await $(ContinueAsStudentButton.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        ContinueAsStudentButton.click();
    });
});
