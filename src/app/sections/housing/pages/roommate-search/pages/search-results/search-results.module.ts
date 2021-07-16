import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsPage } from './search-results.page';
import { IonicModule } from '@ionic/angular';

export const imports = [CommonModule, IonicModule];
export const declarations = [SearchResultsPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class SearchResultsPageModule { }
