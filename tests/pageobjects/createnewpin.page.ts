import {  Ionic$ } from '../helpers';

import Page from './page';

class createnewpin extends Page {

    get createnewpintext(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[1]/ion-label[1]');
    }
    get confirmnewpintext(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[1]/ion-label[1]');
    }
    get pinbutton(){
        return Ionic$.$('//*[@id="pin-modal"]/st-pin/ion-content/div/div[2]/div[2]/ion-button');
    }
    
}
export default new createnewpin();
