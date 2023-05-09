
import { pause } from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import emailAndPhoneNumberEditPage from '../../pageobjects/email-phone-number-edit.page';
import { AWAIT_TIME } from '../constants';

let generatedEmail = '';

const generateRandomEmail=() =>{
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const usernameLength = Math.floor(Math.random() * 10) + 5; // generates a random number between 5 and 14
    let username = "";
    for (let i = 0; i < usernameLength; i++) {
      username += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  }
describe('Change email address', () => {

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


    it('Should change the email address', async () => {
        generatedEmail = generateRandomEmail();

        const EmailInput = await emailAndPhoneNumberEditPage.EmailInput;
        await pause(AWAIT_TIME);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        EmailInput.setValue(generatedEmail);
    });


    it('Should save changes', async () => {
        const SaveChangesButton = await emailAndPhoneNumberEditPage.SaveChangesButton;
        await pause(AWAIT_TIME);
        await expect((await $(SaveChangesButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        SaveChangesButton.click();
    });

    it('Should validate that the email address input has changed the value after the update', async ()=>{

        const EmailInput = await emailAndPhoneNumberEditPage.EmailInput;
        await pause(AWAIT_TIME);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        await expect((await EmailInput.getValue())).toBe(generatedEmail.toString());
    });


    it('Should change the email address back', async () => {

        const EmailInput = await emailAndPhoneNumberEditPage.EmailInput;
        await pause(AWAIT_TIME);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        EmailInput.setValue('getaws403@test.cbord.com');
    });


    it('Should save changes', async () => {
        const SaveChangesButton = await emailAndPhoneNumberEditPage.SaveChangesButton;
        await pause(AWAIT_TIME);
        await expect((await $(SaveChangesButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        SaveChangesButton.click();
    });

    it('Should validate that the email address input has restored the previous value', async ()=>{

        const EmailInput = await emailAndPhoneNumberEditPage.EmailInput;
        await pause(AWAIT_TIME);
        await expect((await $(EmailInput.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        await expect((await EmailInput.getValue())).toBe('getaws403@test.cbord.com');
    });
});

