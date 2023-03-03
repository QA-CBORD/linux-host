

import { Ionic$ } from '../helpers';
import Page from './page';

class PaymentsPage extends Page {
    get Title() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/st-header/ion-header/ion-toolbar/ion-title');
    }
    get AddNewPaymentMethod() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/ion-footer/div/st-button');
    }
}

export default new PaymentsPage();
