import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HousingRoutingModule } from './housing.routing.module';

import { HousingPage } from './housing.page';

const imports = [IonicModule, HousingRoutingModule];
const declarations = [HousingPage];

@NgModule({
  imports,
  declarations,
})
export class HousingPageModule {}
