

import { pause} from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import { AWAIT_TIME } from '../constants';

describe('Settings', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
 

    it('Should validate we are on setting screen', async () => {
        await pause(5000);
        const title = await configurationPage.Titlte;
        await pause(AWAIT_TIME);
        await expect((await $(title.selector))).toBeDisplayed();
        

        await pause(5000);
        const TargetScroll = await configurationPage.TargetScroll;
        await pause(AWAIT_TIME);
        await expect((await $(TargetScroll.selector))).toBeDisplayed();
    
        driver.executeScript("arguments[0].scrollIntoView(true);", [TargetScroll]);
        
        await pause(5000);
        const VersionText = await configurationPage.VersionText;
        await pause(AWAIT_TIME);
        await expect((await $(VersionText.selector))).toBeDisplayed();
    
    });
});


