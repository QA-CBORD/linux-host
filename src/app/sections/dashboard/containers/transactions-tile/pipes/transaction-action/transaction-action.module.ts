import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionActionPipe } from './transaction-action.pipe';
import { AccountsService } from '@sections/accounts/services/accounts.service';


const declarations = [TransactionActionPipe];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  providers: [AccountsService],
  exports: declarations
})
export class TransactionActionPipeModule { }
