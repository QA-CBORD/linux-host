import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInOutSpotPage } from './check-in-out-spot.page';

const routes: Routes = [
  {
    path: '',
    component: CheckInOutSpotPage,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class CheckInOutSpotRoutingModule {}
