


import {  Ionic$ } from '../helpers';

import Page from './page';

class ForgotPasswordPage extends Page {
    get ForgotPasswordDisclaimer(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-forgot-password/ion-content/div/ion-grid/ion-row/ion-col[2]/div');
    }

    get ForgotPasswordEmail(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-forgot-password/ion-content/div/form/st-input-floating-label/div/input');
    }

    get SubmitForgotPassword(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-forgot-password/ion-footer/st-button');
    }
}

export default new ForgotPasswordPage();
