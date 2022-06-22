import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AccountDisplayPipeModule } from '@sections/accounts/shared/pipes/account-display/account-display.module';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';
import { RouterModule } from '@angular/router';
import { GuestAddFundsComponent } from './guest-add-funds.component';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CartService, MerchantService } from '@sections/ordering';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { DestinationAccountDisplayModule } from '@sections/accounts/pages/deposit-page/pipes/destination-account-display.module';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component';
import { GuestAddFundsResolver } from '../resolver/guest-add-funds.resolver';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { StInputAmountModule } from '@sections/accounts/pages/deposit-page/input-amount/input-amount.module';


const imports = [
  CommonModule,
  StHeaderModule,
  ReactiveFormsModule,
  AccountDisplayPipeModule,
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
  DepositModalModule,
  ConfirmDepositPopoverModule,
  StButtonModule,
  AccessibleSelectModule,
  StSelectFloatingLabelModule,
  DestinationAccountDisplayModule,
  TransactionUnitsPipeModule,
  StInputAmountModule
];

const declarations = [GuestAddFundsComponent];
const providers = [AccountService, DepositService, MerchantService, OrderingApiService, CartService, GuestAddFundsResolver, GuestDepositsService];
const entryComponents = [ConfirmDepositPopoverComponent, DepositModalComponent];

@NgModule({
  declarations,
  imports: [imports],
  providers,
  entryComponents
})
export class GuestAddFundsModule {}
