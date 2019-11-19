import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionsTileComponent } from './transactions-tile.component';
import { TransactionService } from './services/transaction.service';
import { TransactionUnitsPipeModule } from './pipes/transactions-units';


const imports = [IonicModule, CommonModule, TransactionUnitsPipeModule];
const declarations = [TransactionsTileComponent];
const exports = [TransactionsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [TransactionService],
  exports,
})
export class TransactionsTileModule { }