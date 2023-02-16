

import { pause} from '../../helpers';
import reportCardAsLostPage from '../../pageobjects/report-card-as-lost.page';
import { AWAIT_TIME } from '../constants';

describe('Report card as lost confirmation', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate that we are on report card as lost confirmation page', async () => {
        await pause(AWAIT_TIME);
        const ReportCardAsLostTitle = await reportCardAsLostPage.Title;
        await pause(AWAIT_TIME);
        await expect((await $(ReportCardAsLostTitle.selector))).toBeDisplayed();
    });


    it('Should press confirm report card as lost', async () => {
        await pause(AWAIT_TIME);
        const ConfirmButton = await reportCardAsLostPage.ConfirmButton;
        await pause(AWAIT_TIME);
        await expect((await $(ConfirmButton.selector))).toBeDisplayed();

        ConfirmButton.click();
    });

});


