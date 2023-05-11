import { pause } from '../../helpers';

import settingsAddress from '../../pageobjects/settings-address.page';

import { AWAIT_TIME } from '../constants';

describe('SavedDelAddresses', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should remove address', async () => {

        
        const delSavedAddress = await settingsAddress.editSavedAddress;
        await pause(AWAIT_TIME);
        await expect((await $(delSavedAddress.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await delSavedAddress.click();
        await pause(AWAIT_TIME);


        const removeButton = await settingsAddress.removeButton;
        await pause(AWAIT_TIME);
        await expect((await $(removeButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await removeButton.click();
        await pause(AWAIT_TIME);


        const removeAddressbutton = await settingsAddress.removeAddressbutton;
        await pause(AWAIT_TIME);
        await expect((await $(removeAddressbutton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await removeAddressbutton.click();
        await pause(AWAIT_TIME);

    }); 


});
