import { Ionic$ } from "tests/helpers";
import Page from "./page";




class EmailAndPhoneNumberEditPage extends Page {
    get Title() {
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-phone-email/st-header/ion-header/ion-toolbar/ion-title');
    }

    get PhoneInput(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-phone-email/ion-content/div/form/st-input-floating-label[2]/div/input');
    }

    get SaveChangesButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-phone-email/ion-footer/st-button/ion-button');
    }
}

export default new EmailAndPhoneNumberEditPage();
