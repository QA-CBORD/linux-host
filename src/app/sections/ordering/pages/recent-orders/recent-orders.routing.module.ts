import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentOrdersComponent,  } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecentOrdersComponent,
    resolve: { recentOrders: RecentOrdersResolver }

  }, {
    path: ':id',
    component: RecentOrderComponent,
    resolve: { recentOrders: RecentOrdersResolver }
  },
];

const imports = [RouterModule.forChild(routes)];

@NgModule({ imports, exports: [RouterModule] })
export class RecentOrdersRoutingModule {}
