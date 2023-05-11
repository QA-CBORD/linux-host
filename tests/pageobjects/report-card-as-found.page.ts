

import {  Ionic$ } from '../helpers';
import Page from './page';

class ReportCardAsFoundPage extends Page {
    get Title(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-report-card/ion-content/div/ion-label');
    }

    get ConfirmButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-report-card/ion-footer/st-button');
    }
   
}

export default new ReportCardAsFoundPage();
