import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { first } from 'rxjs/operators';

import { AutomaticDepositPageComponent } from '@sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component';
import {
  AUTO_DEPOSIT_PAYMENT_TYPES,
  DEPOSIT_FREQUENCY,
} from '@sections/accounts/pages/automatic-deposit-page/auto-deposit.config';
import { AutoDepositService } from '@sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service';
import { UserAutoDepositSettingInfo } from '@sections/accounts/pages/automatic-deposit-page/models/auto-deposit-settings';
import { PopoverController } from '@ionic/angular';
import { ConfirmUnsavedChangesPopoverComponent } from '@sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<AutomaticDepositPageComponent> {
  private component: AutomaticDepositPageComponent;
  private autoDepositSettings: UserAutoDepositSettingInfo;

  constructor(private readonly autoDepositService: AutoDepositService,
              private readonly popoverCtrl: PopoverController) {
  }

  async canDeactivate(component: AutomaticDepositPageComponent): Promise<boolean> {
    this.component = component;
    this.autoDepositSettings = await this.autoDepositService.settings$.pipe(first()).toPromise();
    const { active, autoDepositType } = this.autoDepositSettings;
    const { activeAutoDepositType, automaticDepositForm } = this.component;

    if (!active && activeAutoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.automaticDepositOff) return true;

    if (automaticDepositForm && automaticDepositForm.invalid) return true;

    if (!active && activeAutoDepositType !== AUTO_DEPOSIT_PAYMENT_TYPES.automaticDepositOff) return this.showModal();

    if (autoDepositType !== activeAutoDepositType) return this.showModal();

    if (!this.isSameGeneralInfo()) return this.showModal();

    if (autoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance)
      return this.isSameLowBalanceConditions() ? true : this.showModal();

    if (autoDepositType === AUTO_DEPOSIT_PAYMENT_TYPES.timeBased)
      return this.isSameTimeBasedConditions() ? true : this.showModal();

    return true;
  }

  private isSameGeneralInfo(): boolean {
    const {
      account: { value: { id: toId } },
      amountToDeposit: { value: amountToDeposit },
      paymentMethod: { value: { id: fromId } },
    } = this.component;
    const { amount, fromAccountId, toAccountId } = this.autoDepositSettings;

    return Number(amount) === Number(amountToDeposit)
      && fromAccountId === fromId
      && toId === toAccountId;
  }

  private isSameLowBalanceConditions(): boolean {
    const { lowBalanceAmount: { value: clb } } = this.component;
    const { lowBalanceAmount: slb } = this.autoDepositSettings;

    return Number(clb) === Number(slb);
  }

  private isSameTimeBasedConditions(): boolean {
    const { dayOfWeek: cdow, dayOfMonth: cdom, activeFrequency } = this.component;
    const { dayOfWeek: sdow, dayOfMonth: sdom } = this.autoDepositSettings;

    return activeFrequency === DEPOSIT_FREQUENCY.week
      ? Number(cdow.value) === Number(sdow)
      : Number(cdom.value) === Number(sdom);
  }

  private async showModal(): Promise<boolean> {
    const modal = await this.popoverCtrl.create({
      component: ConfirmUnsavedChangesPopoverComponent,
      animated: false,
      backdropDismiss: true,
    });
    await modal.present();

    return modal.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.component.onSubmit();
        return false;
      }
      return true;
    });
  }
}
