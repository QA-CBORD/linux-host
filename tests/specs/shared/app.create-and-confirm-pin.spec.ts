import { pause } from '../../helpers';

import createpin from '../../pageobjects/createnewpin.page';
import { AWAIT_TIME } from '../constants';

describe('Pin', () => {

  beforeEach(async () => {
    await pause(AWAIT_TIME);
  });

  it('Should create new four digit pin', async () => {

    const newpincontent = await createpin.createNewPinText;
    await pause(AWAIT_TIME);
    await expect((await $(newpincontent.selector))).toBeDisplayed();
    await pause(AWAIT_TIME);

    const pinnumber = await createpin.pinButton

    //Button needs to be clicked 4 time when entering  new pin
    for (let i = 0; i < 4; i++) {
      await pinnumber.click();
    }
  });

  it('Should confirm new four digit pin', async () => {

    const confirmpincontent = await createpin.confirmNewPinText
    await pause(AWAIT_TIME);
    await expect((await $(confirmpincontent.selector))).toBeDisplayed();
    await pause(AWAIT_TIME);

    const pinnumber = await createpin.pinButton

    //Button needs to be clicked 4 time when confirming new pin
    for (let i = 0; i < 4; i++) {
      await pinnumber.click();
    }
  });

});


