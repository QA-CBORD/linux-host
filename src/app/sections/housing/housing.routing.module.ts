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
        path: `${LOCAL_ROUTING.applications}/:applicationKey`,
        loadChildren: './pages/application-details/application-details.module#ApplicationDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.facilities}/:facilityId`,
        loadChildren: './pages/facility-details/facility-details.module#FacilityDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.contracts}/:contractKey/:contractElementKey`,
        loadChildren: './pages/contract-details/contract-details.module#ContractDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.nonAssignments}/:nonAssignmentKey`,
        loadChildren: './pages/non-assignments-details/non-assignments-details.module#NonAssignmentsDetailsModule',
      },
      {
        path: `${LOCAL_ROUTING.workOrders}/:workOrderId`,
        loadChildren: './pages/work-order-details/work-order-details.module#WorkOrderDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.units}`,
        loadChildren: './pages/unit-details/unit-details.module#UnitDetailsPageModule',
      },
      {
        path: `${LOCAL_ROUTING.roomsSearch}/:roomSelectKey`,
        loadChildren: './pages/rooms-search/rooms-search.module#RoomsSearchPageModule',
      },
      {
        path: LOCAL_ROUTING.favorites,
        loadChildren: './pages/favorites/favorites.module#FavoritesPageModule',
      },
      {
        path: `${LOCAL_ROUTING.checkInOut}/:checkInOutKey`,
        loadChildren: './pages/check-in-out/check-in-out.page.module#CheckInOutPageModule',
      },
      {
        path: `${LOCAL_ROUTING.checkInOutSpots}/spots`,
        loadChildren: './pages/check-in-out-spot/check-in-out-spot.page.module#CheckInOutSpotPageModule',
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
