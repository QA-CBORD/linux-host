import { pause } from '../../helpers';

import Createaccount from '../../pageobjects/createaccount.page';
import { AWAIT_TIME } from '../constants';

describe('CreateAccount', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should create user account', async () => {
        
        const CreateAccountTitle = await Createaccount.CreateAccountTitle;
        await pause(AWAIT_TIME);
        await expect((await $(CreateAccountTitle.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);

        const FirstNameInput = await Createaccount.FirstNameInput;
        await FirstNameInput.setValue('g1test')
        await pause(AWAIT_TIME);

        const LastNameInput = await Createaccount.LastNameInput;
        await LastNameInput.setValue('g2test')
        await pause(AWAIT_TIME);

        const EmailInput = await Createaccount.EmailInput;
        //Change Email value evrytime before run
        await EmailInput.setValue('g2cas@test1.cbord.com')
        await pause(AWAIT_TIME);

        const PhoneNumberInput = await Createaccount.PhoneNumberInput;
        await PhoneNumberInput.setValue('6787656789')
        await pause(AWAIT_TIME);

        const PasswordInput = await Createaccount.PasswordInput;
        await PasswordInput.setValue('password1')
        await pause(AWAIT_TIME);

        const CreateAccountButton = await Createaccount.CreateAccountButton;
        await pause(AWAIT_TIME);
        await expect((await $(CreateAccountButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);       
        CreateAccountButton.click();
        
    });


    it('Should confirm the email confirmation text', async () => {

        const ConfirmationText = await Createaccount.ConfirmationText;
            await pause(AWAIT_TIME);
            await expect((await $(ConfirmationText.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);  

            const DismissButton = await Createaccount.DismissButton;
            await pause(AWAIT_TIME);
            await expect((await $(DismissButton.selector))).toBeDisplayed();
            await pause(AWAIT_TIME);       
            DismissButton.click();
    });
  });

