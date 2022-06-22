import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfirmDonatePopoverComponent } from './confirm-donate-popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { CreditCardTypePipeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';

@NgModule({
  imports: [IonicModule, CommonModule, StPopoverLayoutModule, TransactionUnitsPipeModule, CreditCardTypePipeModule],
  providers: [],
  declarations: [ConfirmDonatePopoverComponent],
  exports: [ConfirmDonatePopoverComponent],
})
export class ConfirmDonatePopoverModule {}
