import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelModule } from '@shared/ui-components/label/label.module';
import { AddToFavoriteModule } from '@shared/ui-components/add-to-favorite/add-to-favorite.module';
import { PinLocationModule } from '@shared/ui-components/pin-location/pin-location.module';

import { BuildingComponent } from './building.component';

export const imports = [CommonModule, LabelModule, AddToFavoriteModule, PinLocationModule];
export const declarations = [BuildingComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class BuildingModule {}
