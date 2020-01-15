import { NgModule } from '@angular/core';

import { RoomsSearchPage } from './rooms-search.page';
import { RoomsSearchRoutingModule } from './rooms-search.routing.module';

const imports = [RoomsSearchRoutingModule];
const declarations = [RoomsSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoomsSearchModule {}
