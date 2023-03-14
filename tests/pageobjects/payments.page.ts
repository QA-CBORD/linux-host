

import { Ionic$ } from '../helpers';
import Page from './page';

class PaymentsPage extends Page {
    get Title() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/st-header/ion-header/ion-toolbar/ion-title');
    }
    get AddNewPaymentMethod() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/ion-footer/div/st-button');
    }

    get PaymentsIonList() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/ion-content/st-credit-card-list/div/div/div[1]/ion-list');
    }

    DeleteButton(index: number) {
        return Ionic$.$(`/html/body/app-root/ion-app/ion-modal/st-credit-card-mgmt/ion-content/st-credit-card-list/div/div/div[1]/ion-list/ion-item[${index}]/div[2]`)
    }

    get DeleteModal(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-popover/st-confirm-modal');
    }

    get ConfirmDeleteButtonInModal(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-popover/st-confirm-modal/ion-content/div[2]/div[2]/st-button');
    }
}

export default new PaymentsPage();
