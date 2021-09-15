import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HousingRoutingModule } from './housing.routing.module';

import { HousingPage } from './housing.page';
import { RequestingRoommateModalModule } from '@shared/ui-components/requesting-roommate-modal/requesting-roommate-modal.module';

const imports = [IonicModule, HousingRoutingModule,RequestingRoommateModalModule];
const declarations = [HousingPage];

@NgModule({
  imports,
  declarations,
})
export class HousingPageModule {}
