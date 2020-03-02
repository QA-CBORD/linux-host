import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionsTileComponent } from './transactions-tile.component';
import { TransactionService } from './services/transaction.service';

import { AccountsService } from '@sections/accounts/services/accounts.service';
import { TransactionActionPipeModule } from '@shared/pipes/transaction-operation/transaction-action-pipe.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

const imports = [IonicModule, CommonModule, TransactionUnitsPipeModule, TransactionActionPipeModule];
const declarations = [TransactionsTileComponent];
const exports = [TransactionsTileComponent];

@NgModule({
  declarations,
  imports: [
    imports,
    TransactionActionPipeModule,
    TransactionUnitsPipeModule,
  ],
  providers: [TransactionService, AccountsService],
  exports,
})
export class TransactionsTileModule { }
