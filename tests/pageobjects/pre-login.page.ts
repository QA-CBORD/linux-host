import {  Ionic$ } from '../helpers';

import Page from './page';

class PreLogin extends Page {
    get ContinueAsStudentButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-pre-login/ion-content/div[2]/div/div[2]/st-button[1]');
    }
}

export default new PreLogin();
