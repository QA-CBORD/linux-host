import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { DashboardPageResolver } from './resolvers/dashboard-page.resolver';
import { NAVIGATE } from 'src/app/app.global';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPage,
    resolve: {
      data: DashboardPageResolver,
    }
  },
  {
    path: NAVIGATE.scanCard,
    loadChildren: './containers/scan-card/scan-card.module#ScanCardModule',
  }
  
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class DashboardRoutingModule {}
