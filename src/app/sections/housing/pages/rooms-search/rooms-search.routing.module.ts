import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsSearchPage } from './rooms-search.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsSearchPage,
    children: [
      {
        path: 'buildings',
        loadChildren: '../buildings/buildings.module#BuildingsPageModule',
      },
      {
        path: 'units',
        loadChildren: '../units/units.module#UnitsPageModule',
      },
      {
        path: '',
        redirectTo: 'buildings',
        pathMatch: 'full',
      },
    ],
  },
];

export const imports = [RouterModule.forChild(routes)];
export const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class RoomsSearchRoutingModule {}
