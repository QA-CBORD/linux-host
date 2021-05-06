import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckInOutPage } from './check-in-out.page';

const routes: Routes = [{ path: '', component: CheckInOutPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class CheckInOutRoutingModule {}
