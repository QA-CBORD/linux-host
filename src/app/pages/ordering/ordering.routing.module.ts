import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OrderingPage } from './ordering.page';

const routes: Route[] = [
  {
    path: '',
    component: OrderingPage,
    resolve: {
     // data: AccountsPageResolver,
    },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class OrderingRoutingModule {}
