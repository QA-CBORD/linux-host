import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MerchantListPage } from './merchant-list.page';

const routes: Route[] = [
  {
    path: '',
    component: MerchantListPage,
    resolve: {
     // data: AccountsPageResolver,
    },
  //   children: [
  //     {
  //       path: `${LOCAL_ROUTING.accountDetails}/:id`,
  //       loadChildren: './pages/account-details/account-details.module#AccountDetailsModule',
  //     },
  //   ],
  // },
  // {
  //   path: `${LOCAL_ROUTING.accountDetailsM}/:id`,
  //   loadChildren: './pages/account-details/account-details.module#AccountDetailsModule',
  // },
  // {
  //   path: LOCAL_ROUTING.addFunds,
  //   loadChildren: './pages/deposit-page/deposit.module#DepositModule',
  // },
  // {
  //   path: LOCAL_ROUTING.autoDeposit,
  //   loadChildren: './pages/automatic-deposit-page/automatic-deposit.module#AutomaticDepositModule',
  // },
  // {
  //   path: LOCAL_ROUTING.requestFunds,
  //   loadChildren: './pages/request-funds-page/request-funds.module#RequestFundsModule',
  // },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class OrderingRoutingModule {}
