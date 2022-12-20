import { pause } from '../helpers';

import createpin from '../pageobjects/createnewpin.page';

const AWAIT_TIME = 500;

describe('Pin', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should create new four digit pin', async () => {
      
        const newpincontent = await createpin.createnewpintext;
        await pause(AWAIT_TIME);
        await expect((await $(newpincontent.selector))).toBeDisplayed();
        await pause(AWAIT_TIME);
        
        const pinnumber = await createpin.pinbutton
        
        //Button needs to be clicked 4 time when entering  new pin
        for (let i = 0; i < 4; i++) {
          await pinnumber.click();
        }
      });

      it('Should confirm new four digit pin', async () => {
        
         const confirmpincontent = await createpin.confirmnewpintext
         await pause(AWAIT_TIME);
         await expect((await $(confirmpincontent.selector))).toBeDisplayed();
         await pause(AWAIT_TIME);

         const pinnumber = await createpin.pinbutton
         
         //Button needs to be clicked 4 time when confirming new pin
         for (let i = 0; i < 4; i++) {
           await pinnumber.click();
         }
       });

    });
    

    