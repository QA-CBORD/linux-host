import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionActionPipe } from '@shared/pipes/transaction-operation/transaction-action.pipe';

@NgModule({
  declarations: [TransactionActionPipe],
  imports: [
    CommonModule
  ],
  exports: [TransactionActionPipe]
})
export class TransactionActionPipeModule { }
