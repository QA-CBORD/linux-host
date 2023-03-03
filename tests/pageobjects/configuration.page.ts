import {  Ionic$ } from '../helpers';
import Page from './page';

class ConfigurationPage extends Page {
    get Titlte(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-settings/st-header/ion-header/ion-toolbar/ion-title');
    }
    get TargetScroll(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-settings/ion-content/ion-list[3]/st-settings-item');
    }
    get VersionText(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-settings/ion-content/ion-grid/ion-row[2]');
    }

    get ReportCardAsLost(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-settings/ion-content/ion-list[1]/st-settings-item[2]/ion-item');
    }

    get ReportCardAsFound(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-settings/ion-content/ion-list[1]/st-settings-item[2]/ion-item');
    }
    get TextContent (){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-settings/ion-content/ion-list[1]/st-settings-item[2]/ion-item/ion-label/h4')
    }

    get PaymentsMethods(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-settings/ion-content/ion-list[2]/st-settings-item[5]/ion-item');
    }
}

export default new ConfigurationPage();
