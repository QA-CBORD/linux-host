import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FacilityDetailsRoutingModule } from './facility-details.routing.module';

import { FacilityDetailsPage } from './facility-details.page';

const imports = [CommonModule, FormsModule, IonicModule, FacilityDetailsRoutingModule];
const declarations = [FacilityDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class FacilityDetailsPageModule {}
