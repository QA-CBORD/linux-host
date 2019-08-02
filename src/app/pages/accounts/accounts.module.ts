import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { AccountsSharedModule } from './shared/shared.module';
import { TransactionService } from './services/transaction.service';
import { TransactionsResolver } from './resolvers/transactions.resolver';
import { DepositService } from './services/deposit.service';
import { DepositResolver } from './resolvers/deposit.resolver';

const imports = [CommonModule, AccountsRoutingModule, SharedModule, AccountsSharedModule];
const declarations = [AccountsPage];
const providers = [
  AccountsApiService,
  AccountsService,
  AccountsPageResolver,
  TransactionService,
  TransactionsResolver,
  DepositService,
  DepositResolver,
];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AccountsModule {}
