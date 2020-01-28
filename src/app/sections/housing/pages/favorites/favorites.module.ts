import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BackButtonModule } from '@shared/ui-components/back-button/back-button.module';
import { PageTitleModule } from '../../page-title/page-title.module';
import { UnitsSwitchModule } from '../../units-switch/units-switch.module';
import { SearchFilterModule } from '../../search-filter/search-filter.module';
import { FavoritesRoutingModule } from './favorites.routing.module';

import { FavoritesPage } from './favorites.page';

export const imports = [
  CommonModule,
  IonicModule,
  FavoritesRoutingModule,
  BackButtonModule,
  PageTitleModule,
  UnitsSwitchModule,
  SearchFilterModule,
];
export const declarations = [FavoritesPage];

@NgModule({
  imports,
  declarations,
})
export class FavoritesPageModule {}
