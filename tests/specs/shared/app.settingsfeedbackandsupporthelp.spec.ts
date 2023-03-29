import { pause } from '../../helpers';

import Help from '../../pageobjects/settings.page';
import settingshelp from '../../pageobjects/settings-help.page';

import { AWAIT_TIME } from '../constants';

describe('Help', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should click on Help', async () => {
        const helpLabel = await Help.helpLabel;

        await pause(AWAIT_TIME);

        await expect((await $(helpLabel.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        helpLabel.click();
    });


     it('Should display information about the GET and copyright with the current year', async () => {
        const helpAboutGet = await settingshelp.helpAboutGet;

        await pause(AWAIT_TIME);

        await expect((await $(helpAboutGet.selector))).toBeDisplayed();
        
        console.log(await helpAboutGet.getText())
        

        if ((await (helpAboutGet.getText())).search('Copyright © 2012 - 2023 The CBORD Group, Inc.') == -1 ) {

            console.log("HELP About Get information does not contains the copyright with the current year" ); 

         } else { 

            console.log("HELP About Get information contains the copyright with the current year" ); 
            
         } 

    });

});
