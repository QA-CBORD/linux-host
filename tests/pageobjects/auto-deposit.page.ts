import { Ionic$ } from '../helpers';
import Page from './page';

class AutoDepositPage extends Page {
  get AutoDepositsTitle() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/h1'
    );
  }
  get AutomaticDepositOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[1]'
    );
  }
  get LowBalanceOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[2]'
    );
  }
  get TimeBasedOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/st-deposit-type-nav/ion-radio-group/ion-item[3]'
    );
  }
  get Form() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form'
    );
  }
  get FrecuencyRadioGroup() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-deposit-frequency'
    );
  }
  get OncePerWeekOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-deposit-frequency/ion-list/ion-radio-group/ion-item[1]'
    );
  }
  get OncePerMonthOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-deposit-frequency/ion-list/ion-radio-group/ion-item[2]'
    );
  }
  get DayOfTheWeekSelect() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[1]/div/ion-select'
    );
  }
  get MondayOption() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[1]/div/ion-select/ion-select-option[2]'
    );
  }
  get DayOfTheMonthInput() {
    return $('#dayOfMonth');
  }
  get PaymentSelectLowBalance() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[1]/div/ion-select'
    );
  }
  get PaymentSelectTimeBased() {
    return Ionic$.$('#lowBalanceAmount');
  }
  get AccountSelectTimeBased() {
    return Ionic$.$('#account');
  }
  get AccountSelectLowBalance() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[2]/div/ion-select'
    );
  }
  get AmountInputLowBalance() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-input-floating-label[1]/div/input'
    );
  }
  get AmountInputTimeBased() {
    return Ionic$.$('#amountToDeposit');
  }
  get BalanceLimitInput() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-input-floating-label[2]/div/input'
    );
  }
  get SaveButton() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-footer/st-button/ion-button'
    );
  }
  get BilmeOptionLowBalance() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[1]/div/ion-select/ion-select-option[2]'
    );
  }
  get BilmeOptionTimeBased() {
    return $('ion-action-sheet').$('button=Bill Me');
  }
  get DiningDolarsOptionTimeBased() {
    return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[3]/div/ion-select/ion-select-option[1]');
  }
  get DiningDolarsOptionLowBalance() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-content/form/st-select-floating-label[2]/div/ion-select/ion-select-option[1]'
    );
  }
  get SavedDialogTitle() {
    return Ionic$.$('/html/body/app-root/ion-app/ion-popover/st-popover/st-popover-layout/ion-content');
  }
  get SavedDialogButton() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-popover/st-popover/st-popover-layout/ion-footer/st-button/ion-button'
    );
  }
}

export default new AutoDepositPage();
