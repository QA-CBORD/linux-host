

import { pause} from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import { AWAIT_TIME } from '../constants';

describe('Report card as lost', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate that the report card as lost button is displayed', async () => {
        await pause(AWAIT_TIME);
        const ReportCardAsLostBtn = await configurationPage.ReportCardAsLost;
        await pause(AWAIT_TIME);
        await expect((await $(ReportCardAsLostBtn.selector))).toBeDisplayed();

        ReportCardAsLostBtn.click();
    });

});


