<<<<<<< HEAD
=======




>>>>>>> 808fe6c11 (Finishing first test case)
import { Ionic$ } from '../helpers';
import Page from './page';

class AutoDepositPage extends Page {
<<<<<<< HEAD
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

  get SavedDialogTitle() {
    return Ionic$.$('/html/body/app-root/ion-app/ion-popover/st-popover/st-popover-layout/ion-content');
  }
  get SavedDialogButton() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-popover/st-popover/st-popover-layout/ion-footer/st-button/ion-button'
    );
  }
  get BalanceLimitOption() {
    return Ionic$.$('//body/app-root/ion-app/ion-action-sheet/div/div/div[1]/button[2]');
  }
  get SaveButton() {
    return Ionic$.$(
      '/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-automatic-deposit-page/ion-footer/st-button/ion-button'
    );
  }
  get AmountOption() {
    return Ionic$.$('//body/app-root/ion-app/ion-action-sheet/div/div/div[1]/button[2]');
  }

  get DayOfTheWeekSelect() {
    return Ionic$.$('#dayOfWeekSelect');
  }

  get Form() {
    return $('.deposit-form');
  }
  get PaymentSelect() {
    return Ionic$.$('#balanceAmountSelect');
  }
  get FrecuencyRadioGroup() {
    return $('<st-deposit-frequency />');
  }
  get BalanceLimitInput() {
    return Ionic$.$('#lowBalanceInput');
  }
  get BalanceLimitSelect() {
    return Ionic$.$('#lowBalanceSelect');
  }
  get AmountInput() {
    return Ionic$.$('#amountToDepositInput');
  }
  get AmountSelect() {
    return Ionic$.$('#amountToDepositSelect');
  }

  get BilmeOption() {
    return $('ion-action-sheet').$('button=Bill Me');
  }
  get DiningDolarsOption() {
    return $('ion-action-sheet').$('button*=Dining Dollars');
  }

  get MondayOption() {
    return $('button=Monday');
  }
  get DayOfTheMonthInput() {
    return $('#dayOfMonth');
  }
  get AccountSelect() {
    return Ionic$.$('#account');
  }
=======

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
>>>>>>> 808fe6c11 (Finishing first test case)
}

export default new AutoDepositPage();
