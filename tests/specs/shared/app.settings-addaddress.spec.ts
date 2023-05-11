import { pause } from '../../helpers';

import savedAddresses from '../../pageobjects/settings.page';
import settingsAddress from '../../pageobjects/settings-address.page';

import { AWAIT_TIME } from '../constants';

describe('SavedAddAddresses', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should click on Saved Addresses', async () => {
        const saveAddressLabel = await savedAddresses.saveAddressLabel;

        await pause(AWAIT_TIME);

        await expect((await $(saveAddressLabel.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        saveAddressLabel.click();
    });


    it('Should click on Add New Address', async () => {
        const addNewAddress = await settingsAddress.addNewAddress;

        await pause(AWAIT_TIME);

        await expect((await $(addNewAddress.selector))).toBeDisplayed();

        await pause(AWAIT_TIME);

        addNewAddress.click();
    }); 

    it('Should enter new address and save', async () => {
        const addAddressLine1input = await settingsAddress.addAddressLine1input;
        await pause(AWAIT_TIME);
        await expect((await $(addAddressLine1input.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await addAddressLine1input.setValue('3333 PeachTree pky')
        await pause(AWAIT_TIME);


        const addcityInput = await settingsAddress.addcityInput;
        await pause(AWAIT_TIME);
        await expect((await $(addcityInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await addcityInput.setValue('Atlanta')
        await pause(AWAIT_TIME);

        const stateInput = await settingsAddress.stateInput;
        await pause(AWAIT_TIME);
        await expect((await $(stateInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await stateInput.click();
        await pause(AWAIT_TIME);

        const selectState = await settingsAddress.selectState;
        await pause(AWAIT_TIME);
        await expect((await $(selectState.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await selectState.click();
        await pause(AWAIT_TIME);

        const selectSetAsDefault = await settingsAddress.setAsDefaultbutton;
        await pause(AWAIT_TIME);
        await expect((await $(selectSetAsDefault.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await selectSetAsDefault.click();
        await pause(AWAIT_TIME);

        const addsaveButton = await settingsAddress.addsaveButton;
        await pause(AWAIT_TIME);
        await expect((await $(addsaveButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        await addsaveButton.click();
        await pause(AWAIT_TIME);

    }); 

    it('Should address set to default address', async () => {
        const addressDefault = await settingsAddress.addressDefault;
        await pause(AWAIT_TIME);
        await expect((await $(addressDefault.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

    }); 

});
