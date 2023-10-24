


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

    get MoreButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-footer/st-global-navigation/nav/div/ul/li[5]');
    }

    get InnerConfigurationButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-footer/st-global-navigation/nav/st-popup-list/div/div/div/ul/li[2]');
    }

    get AddFundsButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-dashboard/ion-content/st-tile-wrapper[1]/div/ion-item[2]');
    }

    get AccountsIcon(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-footer/st-global-navigation/nav/div/ul/li[2]');
    }
    get AccountsTileHeader(){
        return Ionic$.$('html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-dashboard/ion-content/st-tile-wrapper/div/ion-item/button')
    }
    get HomeIcon(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-footer/st-global-navigation/nav/div/ul/li[1]');
    }

}

export default new DashboardPage();
