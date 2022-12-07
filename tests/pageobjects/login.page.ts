
import {  Ionic$ } from '../helpers';

import Page from './page';

class Login extends Page {
    get EmailInput(){
        return Ionic$.$('//*[@id="username"]');
    }

    get PasswordInput(){
        return Ionic$.$('//*[@id="password"]');
    }

    get LoginButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/user-pass-form/ion-content/div[2]/form/div[3]/st-button[2]');
    }
}

export default new Login();
