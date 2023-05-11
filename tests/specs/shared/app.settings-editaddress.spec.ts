import { pause } from '../../helpers';


import settingsAddress from '../../pageobjects/settings-address.page';

import { AWAIT_TIME } from '../constants';

describe('SavedEditAddresses', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should edit address and save', async () => {

        
        const savedAddress = await settingsAddress.savedAddress;
        await pause(AWAIT_TIME);
        await expect((await $(savedAddress.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await savedAddress.click();
        await pause(AWAIT_TIME);


        const editAddressLine1input = await settingsAddress.editAddressLine1input;
        await pause(AWAIT_TIME);
        await expect((await $(editAddressLine1input.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await editAddressLine1input.setValue('2222 PeachTree')
        await pause(AWAIT_TIME);

        const editcityInput = await settingsAddress.editcityInput;
        await pause(AWAIT_TIME);
        await expect((await $(editcityInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);     
        await editcityInput.setValue('Duluth')
        await pause(AWAIT_TIME);

        const editAddressTitle = await settingsAddress.editAddressTitle;
        await pause(AWAIT_TIME);
        await expect((await $(editAddressTitle.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
        editAddressTitle.click();

        const editsaveButton = await settingsAddress.editsaveButton;
        await pause(AWAIT_TIME);
        await expect((await $(editsaveButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME); 
        await editsaveButton.click();
        await pause(AWAIT_TIME);

    }); 
    

});
