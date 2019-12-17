import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      data: DashboardPageResolver,
    }
  },
  {
    path: DASHBOARD_NAVIGATE.scanCard,
    loadChildren: './containers/scan-card/scan-card.module#ScanCardModule',
  }

];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class DashboardRoutingModule {}
