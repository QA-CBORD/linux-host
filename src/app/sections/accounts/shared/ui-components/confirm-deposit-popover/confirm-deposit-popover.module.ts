import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfirmDepositPopoverComponent } from './confirm-deposit-popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { CreditCardTypePipeModule } from '../../pipes/credit-card-type/credit-card-type.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

@NgModule({
  imports: [IonicModule, CommonModule, StPopoverLayoutModule, TransactionUnitsPipeModule, CreditCardTypePipeModule],
  providers: [],
  declarations: [ConfirmDepositPopoverComponent],
  exports: [ConfirmDepositPopoverComponent],
})
export class ConfirmDepositPopoverModule {}
