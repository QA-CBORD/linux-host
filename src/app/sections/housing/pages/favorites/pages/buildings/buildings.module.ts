import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BuildingModule } from '@sections/housing/building/building.module';
import { BuildingsRoutingModule } from './buildings.routing.module';

import { BuildingsPage } from './buildings.page';

export const imports = [CommonModule, IonicModule, BuildingModule, BuildingsRoutingModule];
export const declarations = [BuildingsPage];

@NgModule({
  imports,
  declarations,
})
export class BuildingsPageModule {}
