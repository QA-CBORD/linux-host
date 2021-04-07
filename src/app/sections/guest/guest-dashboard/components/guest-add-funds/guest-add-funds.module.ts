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
import { AccountsService } from '@sections/dashboard/services';
import { DestinationAccountDisplayModule } from '@sections/accounts/pages/deposit-page/pipes/destination-account-display.module';

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
  StButtonModule,
  AccessibleSelectModule,
  StSelectFloatingLabelModule,
  DestinationAccountDisplayModule,
  TransactionUnitsPipeModule
];

const declarations = [GuestAddFundsComponent];
const providers = [AccountsService, DepositService, MerchantService, OrderingApiService, CartService];

@NgModule({
  declarations,
  imports: [imports],
  providers,
})
export class GuestAddFundsModule {}
