



import {  Ionic$ } from '../helpers';
import Page from './page';

class AccountsPage extends Page {
  
    get AddFundsButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-accounts/ion-content/div/div/section/st-menu-receiving-funds/nav/ul/li[1]');
    }
    get AutoDepositsButton(){
        return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-accounts/ion-content/div/div/section/st-menu-receiving-funds/nav/ul/li[2]');
    }
}

export default new AccountsPage();
