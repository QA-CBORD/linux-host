import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details.component';
import { TransactionsResolver } from '../../resolvers/transactions.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailsComponent,
    resolve: {
      data: TransactionsResolver,
    },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AccountDetailsRoutingModule {}
