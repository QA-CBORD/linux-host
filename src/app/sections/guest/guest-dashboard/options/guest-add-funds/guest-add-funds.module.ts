import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AccountDisplayPipeModule } from '@sections/accounts/shared/pipes/account-display/account-display.module';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';
import { RouterModule } from '@angular/router';
import { GuestAddFundsComponent } from './guest-add-funds.component';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';

const imports = [
  CommonModule,
  StHeaderModule,
  ReactiveFormsModule,
  AccountDisplayPipeModule,
  TransactionUnitsPipeModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  RouterModule.forChild([
    {
      path: '',
      component: GuestAddFundsComponent
    },
  ]),
  ConfirmDepositPopoverModule,
  DepositModalModule,
  StButtonModule,
  AccessibleSelectModule,
  StSelectFloatingLabelModule
];
const declarations = [GuestAddFundsComponent];;

@NgModule({
  declarations,
  imports: [imports]
})
export class GuestAddFundsModule {}
