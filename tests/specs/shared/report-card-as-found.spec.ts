

import { pause} from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import { AWAIT_TIME } from '../constants';

describe('Report card as found', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate that the report card as lost button is displayed', async () => {
        await pause(AWAIT_TIME);
        const ReportCardAsFoundBtn = await configurationPage.ReportCardAsFound;
        await pause(AWAIT_TIME);
        await expect((await $(ReportCardAsFoundBtn.selector))).toBeDisplayed();

        ReportCardAsFoundBtn.click();
    });

});


