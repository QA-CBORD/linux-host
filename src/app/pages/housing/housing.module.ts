import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HousingRoutingModule } from './housing.routing.module';
import { HousingDashboardPageModule } from './pages/housing-dashboard/housing-dashboard.module';

import { HousingPage } from './housing.page';

const imports = [IonicModule, HousingRoutingModule, HousingDashboardPageModule];
const declarations = [HousingPage];

@NgModule({
  imports,
  declarations,
})
export class HousingPageModule {}
