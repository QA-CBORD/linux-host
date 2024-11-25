import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';
import { DepositResolver } from './resolvers/deposit.resolver';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AccountDisplayPipeModule } from '@sections/accounts/shared/pipes/account-display/account-display.module';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { DestinationAccountDisplayModule } from './pipes/destination-account-display.module';
import { StInputAmountModule } from './input-amount/input-amount.module';
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
  DepositRoutingModule,
  ConfirmDepositPopoverModule,
  DepositModalModule,
  StButtonModule,
  StSelectFloatingLabelModule,
  AccessibleSelectModule,
  DestinationAccountDisplayModule,
  StInputAmountModule
];
const declarations = [DepositPageComponent];
const providers = [DepositResolver, DepositService, AccessibilityService];

@NgModule({
  declarations,
  imports: [imports],
  providers,
})
export class DepositModule {}
