import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { DonateModalComponent } from './donate-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TransactionUnitsPipeModule,
    StButtonModule
  ],
  providers: [],
  declarations: [DonateModalComponent],
  exports: [DonateModalComponent]
})
export class DonateModalModule { }
