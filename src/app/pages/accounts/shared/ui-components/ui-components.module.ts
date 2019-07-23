import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuReceivingFundsComponent } from './menu-receiving-funds/menu-receiving-funds.component';
import { AccountListComponent } from './accout-list/account-list.component';
import { AccountComponent } from './accout-list/account/account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionItemComponent } from './transactions/transaction-item/transaction-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '../directives/directives.module';

const declarations = [
  MenuReceivingFundsComponent,
  AccountListComponent,
  AccountComponent,
  TransactionsComponent,
  TransactionItemComponent,
];

@NgModule({
  declarations,
  imports: [CommonModule, PipesModule, DirectivesModule, IonicModule],
  exports: [...declarations, IonicModule],
})
export class UiComponentsModule {}
