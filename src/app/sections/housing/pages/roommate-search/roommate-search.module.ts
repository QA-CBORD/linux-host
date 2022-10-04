import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';
import { BackButtonModule } from '@shared/ui-components/back-button/back-button.module';
import { RoommateSearchPage } from './roommate-search.page';
import { RoommateSearchRoutingModule } from './roommate-search.routing.module';
import { SearchResultsPageModule } from './pages/search-results/search-results.module';
import { SearchByPageModule } from './pages/search-by/search-by.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [
  CommonModule,
  IonicModule,
  PageTitleModule,
  BackButtonModule,
  SearchByPageModule,
  SearchResultsPageModule,
  RoommateSearchRoutingModule,
  StHeaderModule
];
const declarations = [RoommateSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoommateSearchPageModule { }
