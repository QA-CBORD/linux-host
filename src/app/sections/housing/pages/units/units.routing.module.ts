import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsPage } from './units.page';

const routes: Routes = [
  {
    path: '',
    component: UnitsPage,
  },
];

export const imports = [RouterModule.forChild(routes)];
export const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class UnitsRoutingModule {}
