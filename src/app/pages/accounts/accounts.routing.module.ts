import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountsPage } from './accounts.page';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { LOCAL_ROUTING } from './accounts.config';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountsPage,
        pathMatch: 'full',
        resolve: {
          data: AccountsPageResolver,
        },
      },
      {
        path: LOCAL_ROUTING.accountDetails,
        component: AccountDetailsComponent,
      },
    ],
  },
  {
    path: LOCAL_ROUTING.addFunds,
    loadChildren: './pages/deposit-page/deposit.module#DepositModule',
  },
  {
    path: LOCAL_ROUTING.autoDeposit,
    loadChildren: './pages/automatic-deposit-page/automatic-deposit.module#AutomaticDepositModule',
  },
  {
    path: LOCAL_ROUTING.requestFunds,
    loadChildren: './pages/request-funds-page/request-funds.module#RequestFundsModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AccountsRoutingModule {}
