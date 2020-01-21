import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BuildingModule } from '../../building/building.module';
import { RoomsSearchRoutingModule } from './rooms-search.routing.module';

import { RoomsSearchPage } from './rooms-search.page';

const imports = [CommonModule, IonicModule, BuildingModule, RoomsSearchRoutingModule];
const declarations = [RoomsSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoomsSearchModule {}
