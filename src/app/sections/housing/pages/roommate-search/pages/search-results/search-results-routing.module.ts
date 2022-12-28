import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsPage } from './search-results.page';

const routes: Routes = [{ path: '', component: SearchResultsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class SearchResultsRoutingModule {}