import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormPaymentComponent } from './form-payment.component';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { CreditCardTypePipeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { SuccessfulPaymentModal } from './successful-payment-modal/successful-payment-modal.component';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StCreditCardListModule } from '@sections/settings/creditCards/credit-card-mgmt/card-list/credit-card-list.module';
import { StInputAmountModule } from '@sections/accounts/pages/deposit-page/input-amount/input-amount.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPaymentPopover } from './confirm-payment-popover/confirm-payment-popover.component';
import { FormPaymentRoutingModule } from './form-payment-routing.module';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  HttpClientModule,
  StPopoverLayoutModule,
  TransactionUnitsPipeModule,
  CreditCardTypePipeModule,
  StCreditCardListModule,
  StInputAmountModule,
  ConfirmDepositPopoverModule,
  DepositModalModule,
  StButtonModule,
  FormPaymentRoutingModule
];
const declarations = [FormPaymentComponent, ConfirmPaymentPopover, SuccessfulPaymentModal];
const entryComponents = [FormPaymentComponent, ConfirmPaymentPopover, DepositModalComponent, SuccessfulPaymentModal];

@NgModule({
  imports,
  declarations,
  entryComponents,
  providers: [AccountService, CreditCardService],
})
export class FormPaymentModule {}
