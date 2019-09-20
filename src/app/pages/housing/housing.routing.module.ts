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
      {
        path: `${LOCAL_ROUTING.applications}/:applicationId`,
        loadChildren: './pages/application-details/application-details.module#ApplicationDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.facilities}/:facilityId`,
        loadChildren: './pages/facility-details/facility-details.module#FacilityDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.contracts}/:contractId`,
        loadChildren: './pages/housing/pages/contract-details/contract-details.module#ContractDetailsPageModule',
      },
      {
        path: LOCAL_ROUTING.workOrders,
        loadChildren: './pages/housing/pages/work-orders/work-orders.module#WorkOrdersPageModule',
      },
      {
        path: `${LOCAL_ROUTING.units}/:unitId`,
        loadChildren: './pages/housing/pages/unit-details/unit-details.module#UnitDetailsPageModule',
      },
      {
        path: '',
        redirectTo: LOCAL_ROUTING.dashboard,
        pathMatch: 'full',
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
