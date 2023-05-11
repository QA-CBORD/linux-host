

import { pause } from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import emailAndPhoneNumberEditPage from '../../pageobjects/email-phone-number-edit.page';
import { AWAIT_TIME } from '../constants';

let generatedPhoneNumber = 0;

describe('Change phone number', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });


    it('Should validate that the email & phone number button is displayed', async () => {
        await pause(AWAIT_TIME);
        const EmailAndPhoneNumber = await configurationPage.EmailAndPhoneNumber;
        await pause(AWAIT_TIME);
        await expect((await $(EmailAndPhoneNumber.selector))).toBeDisplayed();

        EmailAndPhoneNumber.click();
    });
    it('Should display email & phone number edit page', async () => {
        await pause(AWAIT_TIME);
        const Title = await emailAndPhoneNumberEditPage.Title;
        await pause(AWAIT_TIME);
        await expect((await $(Title.selector))).toBeDisplayed();
    });

    it('Should change the phone number', async () => {
        generatedPhoneNumber = Math.floor(Math.random() * 10000000000);

        const PhoneInput = await emailAndPhoneNumberEditPage.PhoneInput;
        await pause(AWAIT_TIME);
        await expect((await $(PhoneInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        PhoneInput.setValue(generatedPhoneNumber);
    });

    it('Should save changes', async () => {
        const SaveChangesButton = await emailAndPhoneNumberEditPage.SaveChangesButton;
        await pause(AWAIT_TIME);
        await expect((await $(SaveChangesButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        SaveChangesButton.click();
    });

    it('Should validate that the phone number input has changed the value after the update', async ()=>{


        const PhoneInput = await emailAndPhoneNumberEditPage.PhoneInput;
        await pause(AWAIT_TIME);
        await expect((await $(PhoneInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        await expect((await PhoneInput.getValue())).toBe(generatedPhoneNumber.toString());
    });


});


