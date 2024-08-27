import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.component';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';
import { DASHBOARD_NAVIGATE } from './dashboard.config';
import { SwipeBackGuard } from '@sections/dashboard/resolvers/swipe-back.guard';
import { userFullnameResolverResolver } from '@shared/services/user-local-profile/resolvers/user-fullname-resolver.resolver';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      data: DashboardPageResolver,
      user:userFullnameResolverResolver
    },
    canDeactivate: [SwipeBackGuard]
  },
  {
    path: DASHBOARD_NAVIGATE.scanCard,
    loadChildren: () => import('./containers/scan-card/scan-card.module').then(m => m.ScanCardModule),
  }

];

const imports = [RouterModule.forChild(routes)];

@NgModule({ imports, exports : [RouterModule] })
export class DashboardRoutingModule {}
