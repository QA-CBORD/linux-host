import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';
import { AccountsService } from '@sections/dashboard/services';

const declarations = [TransactionUnitsPipe];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  providers: [AccountsService],
  exports: declarations
})
export class TransactionUnitsPipeModule { }
