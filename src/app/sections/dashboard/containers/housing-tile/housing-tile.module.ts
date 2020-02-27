import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HousingTileComponent } from './housing-tile.component';

export const imports = [CommonModule, RouterModule];
export const declarations = [HousingTileComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class HousingTileModule {}
