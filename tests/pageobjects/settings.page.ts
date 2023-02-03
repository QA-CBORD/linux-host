


import {  Ionic$ } from '../helpers';
import Page from './page';

class SettingsPage extends Page {

    get settingstitle(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-settings/st-header/ion-header/ion-toolbar/ion-title');
    }
    get helpLabel(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-settings/ion-content/ion-list[4]/st-settings-item[1]/ion-item/ion-label/h4');
    }

}

export default new SettingsPage();
