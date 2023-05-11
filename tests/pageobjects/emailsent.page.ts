
import {  Ionic$ } from '../helpers';
import Page from './page';

class EmailSentPage extends Page {
    get EmailSentDisclaimer(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-forgot-password/ion-content/div/p');
    }

    get ReturnToLoginButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-forgot-password/ion-footer/st-button[1]');
    }
}

export default new EmailSentPage();
