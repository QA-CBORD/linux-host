import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchByPage } from './search-by.page';

const routes: Routes = [{ path: '', component: SearchByPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class SearchByRoutingModule {}