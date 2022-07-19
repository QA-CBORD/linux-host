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
        loadChildren: () => import('./pages/housing-dashboard/housing-dashboard.module').then(m => m.HousingDashboardPageModule),
      },
      {
        path: `${LOCAL_ROUTING.applications}/:applicationKey`,
        loadChildren: () => import('./pages/application-details/application-details.module').then(m => m.ApplicationDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.facilities}/:facilityId`,
        loadChildren: () => import('./pages/facility-details/facility-details.module').then(m => m.FacilityDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.contracts}/:contractKey/:contractElementKey`,
        loadChildren: () => import('./pages/contract-details/contract-details.module').then(m => m.ContractDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.nonAssignments}/:nonAssignmentKey`,
        loadChildren: () => import('./pages/non-assignments-details/non-assignments-details.module').then(m => m.NonAssignmentsDetailsModule),
      },
      {
        path: `${LOCAL_ROUTING.workOrders}/:termKey/:workOrderKey`,
        loadChildren: () => import('./pages/work-order-details/work-order-details.module').then(m => m.WorkOrderDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.attachments}`,
        loadChildren: () => import('./pages/attachments-details/attachments-details.module').then(m => m.AttachmentsDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.inspections}/:termKey/:residentInspectionKey/:contractElementKey/:checkIn`,
        loadChildren: () => import('./pages/inspections-details/inspections-details.module').then(m => m.InspectionsDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.inspections}/:termKey/:contractElementKey/:checkIn`,
        loadChildren: () => import('./pages/inspections-details/inspections-details.module').then(m => m.InspectionsDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.units}`,
        loadChildren: () => import('./pages/unit-details/unit-details.module').then(m => m.UnitDetailsPageModule),
      },
      {
        path: `${LOCAL_ROUTING.roomsSearch}/:roomSelectKey`,
        loadChildren: () => import('./pages/rooms-search/rooms-search.module').then(m => m.RoomsSearchPageModule),
      },
      {
        path: LOCAL_ROUTING.favorites,
        loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesPageModule),
      },
      {
        path: `${LOCAL_ROUTING.checkInOut}/:checkInOutKey`,
        loadChildren: () => import('./pages/check-in-out/check-in-out.page.module').then(m => m.CheckInOutPageModule),
      },
      {
        path: `${LOCAL_ROUTING.checkInOutSpots}/spots`,
        loadChildren: () => import('./pages/check-in-out-spot/check-in-out-spot.page.module').then(m => m.CheckInOutSpotPageModule),
      },
      {
        path: `${LOCAL_ROUTING.waitingLists}/:waitingListsKey`,
        loadChildren: () => import('./pages/waiting-lists-details/waiting-lists-details.module').then(m => m.WaitingListsDetailsPageModule),
      },{
        path: `${LOCAL_ROUTING.roommates}`,
        loadChildren: () => import('./pages/roommate-search/roommate-search.module').then(m => m.RoommateSearchPageModule),
      },
      {
        path: `${LOCAL_ROUTING.formPayment}`,
        loadChildren: () => import('./pages/form-payment/form-payment.module').then(m => m.FormPaymentModule),
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
