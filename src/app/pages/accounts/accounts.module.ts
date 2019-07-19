import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { MenuReceivingFundsComponent } from './components/menu-receiving-funds/menu-receiving-funds.component';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { PageNamePipe } from './components/menu-receiving-funds/pipes/page-name.pipe';
import { AccountListComponent } from './components/accout-list/account-list.component';
import { AccountComponent } from './components/accout-list/account/account.component';
import { IconPathPipe } from './components/menu-receiving-funds/pipes/icon-path.pipe';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionItemComponent } from './components/transactions/transaction-item/transaction-item.component';
import { AccountsSharedModule } from './shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';

const imports = [CommonModule, AccountsRoutingModule, SharedModule, IonicModule, AccountsSharedModule];
const declarations = [
  AccountsPage,
  MenuReceivingFundsComponent,
  PageNamePipe,
  AccountListComponent,
  AccountComponent,
  IconPathPipe,
  TransactionsComponent,
  TransactionItemComponent,
  FilterComponent,
];
const providers = [AccountsApiService, AccountsService, AccountsPageResolver];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AccountsModule {}
