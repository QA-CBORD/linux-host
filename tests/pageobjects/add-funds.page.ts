


import {  Ionic$ } from '../helpers';
import Page from './page';

class AddFundsPage extends Page {
   get SelectPaymentMethod(){
    return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-deposit-page/ion-content/form/section/div[1]/ion-select');
   }
   get PaymentMethodOptions(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-action-sheet/div[2]/div/div[1]');
   }
   get SelectToAccount(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-deposit-page/ion-content/form/section/div[3]/ion-select');
   }

   get InputDeposit(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-deposit-page/ion-content/form/section/div[4]/st-input-amount/div/ion-input/input');
   }
   get AccountOptions(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-action-sheet/div[2]/div/div[1]/button[1]');
   }

   get SelectAmountToDeposit(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-deposit-page/ion-content/form/section/div[4]/div/div/ion-select');
   }

   get FiveDollarsAmount(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-action-sheet/div[2]/div/div[1]/button[1]');
   }

   get DepositButton(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-deposit-page/ion-footer/st-button');
   }

   get ConfirmDepositModalTitle(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-popover/confirm-deposit-popover/st-popover-layout/ion-header/ion-toolbar');
   }
   get ConfirmDepositButton(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-popover/confirm-deposit-popover/st-popover-layout/ion-footer/st-button[2]');
   }

   get ConfirmationDepositDone(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-deposit-modal/ion-content/h1');
   }

   get DoneButton(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-modal/st-deposit-modal/ion-footer/st-button');
   }
   get TargetScroll(){
      return Ionic$.$('/html/body/app-root/ion-app/ion-popover/confirm-deposit-popover/st-popover-layout/ion-content/section[1]/div');
   }
}

export default new AddFundsPage();
