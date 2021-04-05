import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AccountDisplayPipeModule } from '@sections/accounts/shared/pipes/account-display/account-display.module';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';
import { RouterModule } from '@angular/router';
import { GuestAddFundsComponent } from './guest-add-funds.component';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { CartService } from '@sections/ordering/services/cart.service';
import { MerchantService } from '@sections/ordering';
import { OrderingResolver } from '@sections/ordering/resolvers';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';
import { CartResolver } from '@sections/ordering/resolvers/cart.resolver';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ModalsService } from '@core/service/modals/modals.service';

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
  ConfirmDepositPopoverModule,
  DepositModalModule,
  StButtonModule,
  AccessibleSelectModule,
  StSelectFloatingLabelModule
];
const declarations = [GuestAddFundsComponent];
const providers = [DepositService, OrderingResolver, MerchantService, OrderingApiService, CartService, CartResolver, OrderingService, ModalsService];

@NgModule({
  declarations,
  imports: [imports],
  providers
})
export class GuestAddFundsModule {}
