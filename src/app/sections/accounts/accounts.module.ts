import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { TransactionService } from './services/transaction.service';
import { TransactionsResolver } from './resolvers/transactions.resolver';
import { AutoDepositPageResolver } from './resolvers/auto-deposit-page.resolver';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { TransactionsModule } from './shared/ui-components/transactions/transactions.module';
import { MenuReceivingFundsModule } from './shared/ui-components/menu-receiving-funds/menu-receiving-funds.module';
import { AccountListModule } from './shared/ui-components/account-list/account-list.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

const imports = [
  IonicModule,
  CommonModule,
  AccountsRoutingModule,
  StHeaderModule,
  MenuReceivingFundsModule,
  AccountListModule,
  TransactionUnitsPipeModule,
  TransactionsModule,
];
const declarations = [AccountsPage];
const providers = [
  AccountsApiService,
  AccountsService,
  AccountsPageResolver,
  TransactionService,
  TransactionsResolver,
  AutoDepositPageResolver,
  DepositService,
];

@NgModule({
  declarations,
  imports: [
    imports,
  ],
  providers,
})
export class AccountsModule {}
