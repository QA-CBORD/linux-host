



import { Ionic$ } from '../helpers';
import Page from './page';

class AutoDepositPage extends Page {

    get AutoDepositsTitle() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/h1');
    }
    get AutomaticDepositOption() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[1]');
    }
    get LowBalanceOption() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[2]');
    }
    get TimeBasedOption() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[3]');
    }
}

export default new AutoDepositPage();
