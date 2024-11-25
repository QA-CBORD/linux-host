import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesPage } from './favorites.page';
import { BuildingsPage } from './pages/buildings/buildings.page';
import { UnitsPage } from './pages/units/units.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage,
    children: [
      {
        path: 'buildings',
        component: BuildingsPage,
      },
      {
        path: 'units',
        component: UnitsPage,
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
export class FavoritesRoutingModule {}
