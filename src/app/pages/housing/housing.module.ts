import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HousingPage } from './housing.page';
import { HousingRoutingModule } from './housing.routing.module';

const imports = [IonicModule, HousingRoutingModule];
const declarations = [HousingPage];

@NgModule({
  imports,
  declarations,
})
export class HousingPageModule {}
