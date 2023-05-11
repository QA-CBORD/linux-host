import { pause } from '../../helpers';

import Createaccount from '../../pageobjects/createaccount.page';
import { AWAIT_TIME } from '../constants';

describe('CreateAccountWithIncompleteFields', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should fill the fields incomplete', async () => {
        
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
    });
    it('Should leave the create button gray out', async () => {
        const CreateAccountButton = await Createaccount.CreateAccountButton;
        await pause(AWAIT_TIME);
        await expect((await $(CreateAccountButton.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);      

        const cssClass = await (await $(CreateAccountButton.selector)).getAttribute('class')

        await expect(cssClass).toContain('st-button--disabled')
    });
  });

