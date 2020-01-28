import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';

import { SearchFilterComponent } from './search-filter.component';
import { SearchFilterModalComponent } from './search-filter-modal/search-filter-modal.component';

export const imports = [CommonModule, IonicModule, PageTitleModule];
export const declarations = [SearchFilterComponent, SearchFilterModalComponent];
export const entryComponents = [SearchFilterModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents,
})
export class SearchFilterModule {}
