import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';
import { DASHBOARD_NAVIGATE } from './dashboard.config';
import { SwipeBackGuard } from '@sections/dashboard/resolvers/swipe-back.guard';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      data: DashboardPageResolver,
    },
    canDeactivate: [SwipeBackGuard]
  },
  {
    path: DASHBOARD_NAVIGATE.scanCard,
    loadChildren: () => import('./containers/scan-card/scan-card.module').then(m => m.ScanCardModule),
  }

];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class DashboardRoutingModule {}
