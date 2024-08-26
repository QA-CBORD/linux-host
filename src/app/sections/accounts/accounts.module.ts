import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { AccountService } from './services/accounts.service';
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
import { PlanNameComponent } from './shared/ui-components/plan-name/plan-name.component';

const imports = [
  IonicModule,
  CommonModule,
  AccountsRoutingModule,
  StHeaderModule,
  MenuReceivingFundsModule,
  AccountListModule,
  TransactionUnitsPipeModule,
  TransactionsModule,
  PlanNameComponent
];
const declarations = [AccountsPage];
const providers = [
  AccountService,
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
