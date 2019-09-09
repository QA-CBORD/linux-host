import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OrderingPage } from './ordering.page';

import { OrderingResolver } from './resolvers';
import { LOCAL_ROUTING } from './ordering.config';

const routes: Route[] = [
  {
    path: '',
    component: OrderingPage,
    resolve: {
      data: OrderingResolver,
    },
  },
  {
    path: `${LOCAL_ROUTING.ordersInfo}/:destinationPage`,
    loadChildren: './pages/nav-modal-page/nav-modal.module#NavModalModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class OrderingRoutingModule {}
