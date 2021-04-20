import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationAccountDisplayPipe } from './destination-account-display.pipe';
import { TransactionUnitsPipe } from '@shared/pipes/transaction-units/transaction-units.pipe';

@NgModule({
  declarations: [DestinationAccountDisplayPipe],
  imports: [CommonModule],
  providers: [TransactionUnitsPipe],
  exports: [DestinationAccountDisplayPipe],
})
export class DestinationAccountDisplayModule {}
