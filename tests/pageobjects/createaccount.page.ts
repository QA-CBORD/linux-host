
import {  Ionic$ } from '../helpers';

import Page from './page';

class CreateAccount extends Page {

    get CreateAccountTitle(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-header/ion-toolbar/ion-title');
    }

    get FirstNameInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-content/div/form/div[1]/ion-grid/ion-row/ion-col[1]/st-input-floating-label/div/input');
    }

    get LastNameInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-content/div/form/div[1]/ion-grid/ion-row/ion-col[2]/st-input-floating-label/div/input');
    }

    get EmailInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-content/div/form/div[2]/div[1]/st-input-floating-label/div/input');
    }
    
    get PhoneNumberInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-content/div/form/div[2]/div[2]/st-input-floating-label/div/input');
    }

    get PasswordInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-content/div/form/div[2]/div[3]/st-input-floating-label/div/input');
    }

    get CreateAccountButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration/ion-footer/div/st-button/ion-button');
    }

    get ConfirmationText(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration-success/ion-content/div/div/div/div[2]');
    }

    get DismissButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-registration-success/ion-footer/div/st-button/ion-button');
    }
    
}

export default new CreateAccount();
