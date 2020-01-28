import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesPage } from './favorites.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage,
  },
];

export const imports = [RouterModule.forChild(routes)];
export const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class FavoritesRoutingModule {}
