import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionsTileComponent } from './transactions-tile.component';
import { TransactionService } from './services/transaction.service';

import { TransactionUnitsPipeModule } from './pipes/transaction-units';
import { TransactionActionPipeModule } from './pipes/transaction-action';
import { AccountsService } from '@sections/accounts/services/accounts.service';

const imports = [IonicModule, CommonModule, TransactionUnitsPipeModule, TransactionActionPipeModule];
const declarations = [TransactionsTileComponent];
const exports = [TransactionsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [TransactionService, AccountsService],
  exports,
})
export class TransactionsTileModule { }