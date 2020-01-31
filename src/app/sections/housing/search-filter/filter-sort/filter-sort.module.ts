import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FilterSortComponent } from './filter-sort.component';
import { SortControlComponent } from './sort-control/sort-control.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [FilterSortComponent, SortControlComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class FilterSortModule {}
