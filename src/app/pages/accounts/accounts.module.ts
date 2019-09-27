import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { AccountsSharedModule } from './shared/shared.module';
import { TransactionService } from './services/transaction.service';
import { TransactionsResolver } from './resolvers/transactions.resolver';
import { AutoDepositPageResolver } from './resolvers/auto-deposit-page.resolver';
import { SettingService } from './services/setting.service';
import { DepositService } from './services/deposit.service';
import { StHeaderModule } from '../../shared/ui-components/st-header/st-header.module';

const imports = [
  CommonModule,
  AccountsRoutingModule,
  AccountsSharedModule,
  StHeaderModule
];
const declarations = [AccountsPage];
const providers = [
  AccountsApiService,
  AccountsService,
  AccountsPageResolver,
  TransactionService,
  TransactionsResolver,
  AutoDepositPageResolver,
  SettingService,
  DepositService,
];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AccountsModule {
}
