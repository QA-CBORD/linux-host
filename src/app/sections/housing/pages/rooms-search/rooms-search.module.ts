import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomsFilterModule } from './rooms-filter/rooms-filter.module';
import { RoomsSearchRoutingModule } from './rooms-search.routing.module';

import { RoomsSearchPage } from './rooms-search.page';

const imports = [CommonModule, IonicModule, RoomsFilterModule, RoomsSearchRoutingModule];
const declarations = [RoomsSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoomsSearchModule {}
