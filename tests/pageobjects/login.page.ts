
import {  Ionic$ } from '../helpers';

import Page from './page';

class Login extends Page {
    get EmailInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[2]/form/st-input-floating-label[1]/div/input');
    }

    get PasswordInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[2]/form/st-input-floating-label[2]/div/input');
    }

    get LoginButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[2]/form/div[3]/st-button[2]');
    }

    get LoginHeaderTitle(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[1]/ion-text');
    }
    get ForgotPassword(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[2]/form/div[2]/a');
    }
}

export default new Login();
