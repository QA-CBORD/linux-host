


import {  Ionic$ } from '../helpers';
import Page from './page';

class AddressPage extends Page {

    get addNewAddress(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div/ion-item/span[2]');
    }

    get addAddressLine1input(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div[1]/st-add-edit-addresses/div/form/st-input-floating-label[1]/div/input');
    }

    get addcityInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div[1]/st-add-edit-addresses/div/form/st-input-floating-label[2]/div/input');
    }

    get stateInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div[1]/st-add-edit-addresses/div/form/st-select-floating-label/div/ion-select');
    } 

    get selectState(){
        return Ionic$.$('//body/app-root/ion-app/ion-action-sheet/div[2]/div/div[1]/button[1]');
    }    
    
    get addsaveButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div[1]/div/st-button[2]/ion-button');
    }

    get savedAddress(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/st-order-address-list/ion-list/st-order-address-item[1]');
    }
    
    get editSavedAddress(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-saved-addresses/ion-content/st-order-address-list/ion-list/st-order-address-item[1]/ion-item');
    }
    get editAddressTitle(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-address-edit-page/st-header/ion-header/ion-toolbar/ion-title');
    }

    get editAddressLine1input(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-address-edit-page/ion-content/div/st-add-edit-addresses/div/form/st-input-floating-label[1]/div/input');
    }

    get editcityInput(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-address-edit-page/ion-content/div/st-add-edit-addresses/div/form/st-input-floating-label[2]/div/input');
    }

    get editsaveButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-address-edit-page/ion-content/div/st-button/ion-button');
    }
    
    get removeButton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-address-edit-page/st-header/ion-header/ion-toolbar/ion-buttons[2]/ion-button');
    }

    get removeAddressbutton(){
        return Ionic$.$('//body/app-root/ion-app/ion-popover/st-confirm-popover/st-popover-layout/ion-footer/ion-button[2]');
    }

    get setAsDefaultbutton(){
        return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/div[1]/st-add-edit-addresses/div/form/ion-item/ion-checkbox');
    }

    get addressDefault(){
    return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-guest-sections/ion-router-outlet/st-saved-addresses/ion-content/st-order-address-list/ion-list/st-order-address-item[1]/ion-item/ion-label/div[1]');
    }
}

export default new AddressPage();

