import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LabelModule } from '@shared/ui-components/label/label.module';
import { AddToFavoriteModule } from '@shared/ui-components/add-to-favorite/add-to-favorite.module';
import { PinLocationModule } from '@shared/ui-components/pin-location/pin-location.module';
import { BuildingsRoutingModule } from './buildings.routing.module';

import { BuildingsPage } from './buildings.page';
import { BuildingComponent } from './building/building.component';

export const imports = [
  CommonModule,
  IonicModule,
  LabelModule,
  AddToFavoriteModule,
  PinLocationModule,
  BuildingsRoutingModule,
];
export const declarations = [BuildingsPage, BuildingComponent];

@NgModule({
  imports,
  declarations,
})
export class BuildingsPageModule {}
