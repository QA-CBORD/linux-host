import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UnitDetailsRoutingModule } from './unit-details.routing.module';

import { UnitDetailsPage } from './unit-details.page';

const imports = [CommonModule, FormsModule, IonicModule, UnitDetailsRoutingModule];
const declarations = [UnitDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class UnitDetailsPageModule {}
