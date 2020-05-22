import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsSearchPage } from './rooms-search.page';

const routes: Routes = [{ path: '', component: RoomsSearchPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class RoomsSearchRoutingModule {}
