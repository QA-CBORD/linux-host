import {  Ionic$ } from '../helpers';

import Page from './page';

class createnewpin extends Page {

    get createNewPinText(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[1]/ion-label[1]');
    }
    get confirmNewPinText(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[1]/ion-label[1]');
    }
    get pinButton2(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[2]/div[2]/ion-button');
    }
    get pinButton3(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[2]/div[3]/ion-button');
    }
    get pinPageTitle(){
        return Ionic$.$('ion-label.pin__info')
    }
    
}
export default new createnewpin();
