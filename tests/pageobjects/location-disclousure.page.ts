import {  Ionic$ } from '../helpers';

import Page from './page';

class LocationDisclousurePage extends Page {

    get useLocationTitle(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-location-disclosure/ion-content/div/ion-col/ion-title');
    }
    get locationSettingsButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-location-disclosure/div/st-button[2]/ion-button');
    }
}
export default new LocationDisclousurePage();
