import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';
import { BackButtonModule } from '@shared/ui-components/back-button/back-button.module';
import { UnitsSwitchModule } from '../../units-switch/units-switch.module';
import { SearchFilterModule } from '../../search-filter/search-filter.module';
import { BuildingsPageModule } from './pages/buildings/buildings.module';
import { UnitsPageModule } from './pages/units/units.module';
import { RoomsSearchRoutingModule } from './rooms-search.routing.module';

import { RoomsSearchPage } from './rooms-search.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [
  CommonModule,
  IonicModule,
  PageTitleModule,
  BackButtonModule,
  SearchFilterModule,
  UnitsSwitchModule,
  BuildingsPageModule,
  UnitsPageModule,
  RoomsSearchRoutingModule,
  StHeaderModule,
];
const declarations = [RoomsSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoomsSearchPageModule {}
