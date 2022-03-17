import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountsPage } from './accounts.page';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { LOCAL_ROUTING } from './accounts.config';
import { AutoDepositPageResolver } from './resolvers/auto-deposit-page.resolver';

const routes: Route[] = [
  {
    path: '',
    component: AccountsPage,
    resolve: {
      data: AccountsPageResolver,
    },
    children: [
      {
        path: `${LOCAL_ROUTING.accountDetails}/:id`,
        loadChildren: () => import('./pages/account-details/account-details.module').then(m => m.AccountDetailsModule),
      },
    ],
  },
  {
    path: `${LOCAL_ROUTING.accountDetailsM}/:id`,
    loadChildren: () => import('./pages/account-details/account-details.module').then(m => m.AccountDetailsModule),
  },
  {
    path: LOCAL_ROUTING.addFunds,
    loadChildren: () => import('./pages/deposit-page/deposit.module').then(m => m.DepositModule),
  },
  {
    path: LOCAL_ROUTING.autoDeposit,
    loadChildren: () => import('./pages/automatic-deposit-page/automatic-deposit.module').then(m => m.AutomaticDepositModule),
    resolve: { data: AutoDepositPageResolver },
  },
  {
    path: LOCAL_ROUTING.requestFunds,
    loadChildren: () => import('./pages/request-funds-page/request-funds.module').then(m => m.RequestFundsModule),
  },
  {
    path: LOCAL_ROUTING.addCreditCard,
    loadChildren: () => import('./pages/add-credit-card/add-credit-card.module').then(m => m.AddCreditCardModule),
  },
  {
    path: LOCAL_ROUTING.mealDonations,
    loadChildren: () => import('./pages/meal-donations/meal-donations.module').then(m => m.MealDonationsModule),
  },
];

const imports = [RouterModule.forChild(routes),];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AccountsRoutingModule {}
