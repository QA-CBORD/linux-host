import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HousingPage } from './housing.page';

const routes: Routes = [
  {
    path: '',
    component: HousingPage,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class HousingRoutingModule {}
