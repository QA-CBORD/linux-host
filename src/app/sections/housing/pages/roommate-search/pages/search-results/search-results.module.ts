import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsPage } from './search-results.page';
import { IonicModule } from '@ionic/angular';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

export const imports = [CommonModule, IonicModule, SearchResultsRoutingModule, StHeaderModule];
export const declarations = [SearchResultsPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class SearchResultsPageModule { }
