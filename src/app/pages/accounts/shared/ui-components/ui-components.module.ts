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
import { FilterComponent } from './filter/filter.component';
import { FilterMenuComponent } from './filter/filter-menu/filter-menu.component';
import { TimeRangePipe } from './filter/pipes/time-range.pipe';
import { AccountNamePipe } from './filter/pipes/account-name.pipe';

const declarations = [
  MenuReceivingFundsComponent,
  AccountListComponent,
  AccountComponent,
  TransactionsComponent,
  TransactionItemComponent,
  FilterComponent,
  FilterMenuComponent,
  TimeRangePipe,
  AccountNamePipe,
];

@NgModule({
  declarations,
  imports: [CommonModule, PipesModule, DirectivesModule, IonicModule],
  exports: [...declarations, IonicModule],
  entryComponents: [FilterMenuComponent],
})
export class UiComponentsModule {}
