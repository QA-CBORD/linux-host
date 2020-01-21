import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddToFavoriteModule } from '@shared/ui-components/add-to-favorite/add-to-favorite.module';
import { LabelModule } from '@shared/ui-components/label/label.module';

import { BuildingComponent } from './building.component';

export const imports = [CommonModule, LabelModule, AddToFavoriteModule];
export const declarations = [BuildingComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class BuildingModule {}
