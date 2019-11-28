import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionsTileComponent } from './transactions-tile.component';
import { TransactionService } from './services/transaction.service';
import { TransactionActionPipe } from '@sections/accounts/shared/pipes/transaction-action.pipe';
import { AccountsService } from '@sections/accounts/services/accounts.service';
import { TransactionUnitsPipeModule } from './pipes/transactions-units';


const imports = [IonicModule, CommonModule, TransactionUnitsPipeModule];
const declarations = [TransactionsTileComponent, TransactionActionPipe];
const exports = [TransactionsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [TransactionService, AccountsService],
  exports,
})
export class TransactionsTileModule { }