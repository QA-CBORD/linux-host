import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { RoomsSearchRoutingModule } from './rooms-search.routing.module';

import { RoomsSearchPage } from './rooms-search.page';

const imports = [IonicModule, RoomsSearchRoutingModule];
const declarations = [RoomsSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoomsSearchModule {}
