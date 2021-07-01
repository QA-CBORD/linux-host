import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoommateSearchPage } from './roommate-search.page';
import { SearchResultsPage } from './pages/search-results/search-results.page';
import { SearchByPage } from './pages/search-by/search-by.page';

const routes: Routes = [
  {
    path: '',
    component: RoommateSearchPage,
    children: [
      {
        path: 'search',
        component: SearchByPage,
      },
      {
        path: 'results',
        component: SearchResultsPage,
      },
    ]
  }
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports
})
export class RoommateSearchRoutingModule { }
