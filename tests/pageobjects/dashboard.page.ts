


import {  Ionic$ } from '../helpers';
import Page from './page';

class DashboardPage extends Page {
    get DashboardHeaderCover(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-dashboard');
    }

}

export default new DashboardPage();
