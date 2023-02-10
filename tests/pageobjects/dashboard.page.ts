


import {  Ionic$ } from '../helpers';
import Page from './page';

class DashboardPage extends Page {
    get DashboardHeaderCover(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-dashboard');
    }

    get SettingsIcon(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-footer/st-global-navigation/nav/div/ul/li[4]/div');
    }
    get ConfigurationButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-footer/st-global-navigation/nav/div/ul/li[4]');
    }

}

export default new DashboardPage();
