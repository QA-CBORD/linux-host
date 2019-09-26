import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPage,
    // resolve: {
    //   data: AccountsPageResolver,
    // },
  },

];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class DashboardRoutingModule {}
