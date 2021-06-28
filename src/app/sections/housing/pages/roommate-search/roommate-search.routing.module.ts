import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoommateSearchPage } from './roommate-search.page';

const routes: Routes = [{ path: '', component: RoommateSearchPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports
})
export class RoommateSearchRoutingModule { }
