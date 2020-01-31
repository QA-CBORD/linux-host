import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';
import { RangeModule } from '@shared/ui-components/range/range.module';
import { ShowMoreModule } from '@shared/ui-components/show-more/show-more.module';

import { SearchFilterComponent } from './search-filter.component';
import { SearchFilterModalComponent } from './search-filter-modal/search-filter-modal.component';
import { SearchFilterSectionComponent } from './search-filter-section/search-filter-section.component';

export const imports = [CommonModule, IonicModule, PageTitleModule, RangeModule, ShowMoreModule];
export const declarations = [SearchFilterComponent, SearchFilterModalComponent, SearchFilterSectionComponent];
export const entryComponents = [SearchFilterModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents,
})
export class SearchFilterModule {}
