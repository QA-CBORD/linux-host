import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesPage } from './favorites.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage,
    children: [
      {
        path: 'buildings',
        loadChildren: './pages/buildings/buildings.module#BuildingsPageModule',
      },
      {
        path: 'units',
        loadChildren: './pages/units/units.module#UnitsPageModule',
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
