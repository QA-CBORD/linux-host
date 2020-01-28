import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';

import { RoomsFilterComponent } from './rooms-filter.component';
import { RoomsFilterModalComponent } from './rooms-filter-modal/rooms-filter-modal.component';

export const imports = [CommonModule, IonicModule, PageTitleModule];
export const declarations = [RoomsFilterComponent, RoomsFilterModalComponent];
export const entryComponents = [RoomsFilterModalComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents,
})
export class RoomsFilterModule {}
