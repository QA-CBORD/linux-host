import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsSearchPage } from './rooms-search.page';
import { BuildingsPage } from './pages/buildings/buildings.page';
import { UnitsPage } from './pages/units/units.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsSearchPage,
    children: [
      {
        path: 'buildings',
        component: BuildingsPage,
      },
      {
        path: 'units',
        component: UnitsPage,
      }
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
