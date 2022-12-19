import { pause } from '../helpers';

import createpin from '../pageobjects/createnewpin.page';

describe('Pin', () => {

    beforeEach(async () => {
        await pause(500);
    });

    it('Should create new four digit pin', async () => {
      
        const newpincontent = await createpin.createnewpintext;
        await pause(500);
        await expect((await $(newpincontent.selector))).toBeDisplayed();
        await pause(500);
        
        const pinnumber = await createpin.pinbutton
        
        //Button needs to be clicked 4 time when entering  new pin
        for (let i = 0; i < 4; i++) {
          await pinnumber.click();
        }
      });

      it('Should confirm new four digit pin', async () => {
        
         const confirmpincontent = await createpin.confirmnewpintext
         await pause(500);
         await expect((await $(confirmpincontent.selector))).toBeDisplayed();
         await pause(500);

         const pinnumber = await createpin.pinbutton
         
         //Button needs to be clicked 4 time when confirming new pin
         for (let i = 0; i < 4; i++) {
           await pinnumber.click();
         }
       });

    });
    

    