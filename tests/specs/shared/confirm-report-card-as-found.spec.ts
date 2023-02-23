

import { pause} from '../../helpers';
import reportCardAsFoundPage from '../../pageobjects/report-card-as-found.page';
import { AWAIT_TIME } from '../constants';

describe('Report card as found confirmation', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate that we are on report card as found confirmation page', async () => {
        await pause(AWAIT_TIME);
        const ReportCardAsFoundTitle = await reportCardAsFoundPage.Title;
        await pause(AWAIT_TIME);
        await expect((await $(ReportCardAsFoundTitle.selector))).toBeDisplayed();
    });


    it('Should press confirm report card as found', async () => {
        await pause(AWAIT_TIME);
        const ConfirmButton = await reportCardAsFoundPage.ConfirmButton;
        await pause(AWAIT_TIME);
        await expect((await $(ConfirmButton.selector))).toBeDisplayed();

        ConfirmButton.click();
    });

});


