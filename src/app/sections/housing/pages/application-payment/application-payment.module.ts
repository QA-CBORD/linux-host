import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicationPaymentComponent } from './application-payment.component';
import { CreditCardModule } from '@sections/settings/creditCards/credit-card.module';
import { DepositModule } from '@sections/accounts/pages/deposit-page/deposit.module';
import { ApplicationDetailsPageModule } from '../application-details/application-details.module';
import { ConfirmFeePopoverComponent } from './confirm-fee-popover/confirm-fee-popover.component';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { CreditCardTypeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  StPopoverLayoutModule,
  TransactionUnitsPipeModule,
  CreditCardTypeModule,
  CreditCardModule,
  DepositModule,
  ApplicationDetailsPageModule,
  ConfirmDepositPopoverModule,
  DepositModalModule
];
const declarations = [ApplicationPaymentComponent, ConfirmFeePopoverComponent, PaymentModalComponent];
const entryComponents = [ApplicationPaymentComponent, ConfirmFeePopoverComponent, DepositModalComponent, PaymentModalComponent];

@NgModule({
  imports,
  declarations,
  entryComponents,
  providers: [AccountService]
})
export class ApplicationPaymentModule {}
