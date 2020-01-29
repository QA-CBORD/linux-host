import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildingsPage } from './buildings.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingsPage,
  },
];

export const imports = [RouterModule.forChild(routes)];
export const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class BuildingsRoutingModule {}
