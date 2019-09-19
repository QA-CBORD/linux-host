import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LOCAL_ROUTING } from './housing.config';

import { HousingPage } from './housing.page';

const routes: Routes = [
  {
    path: '',
    component: HousingPage,
    children: [
      {
        path: LOCAL_ROUTING.dashboard,
        loadChildren: './pages/housing-dashboard/housing-dashboard.module#HousingDashboardPageModule',
      },
    ],
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class HousingRoutingModule {}
