import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DepositModalComponent } from './deposit-modal.component';
import { CreditCardTypeModule } from '../../pipes/credit-card-type/credit-card-type.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CreditCardTypeModule,
    TransactionUnitsPipeModule,
    StButtonModule
  ],
  providers: [],
  declarations: [DepositModalComponent],
  exports: [DepositModalComponent],
})
export class DepositModalModule { }
