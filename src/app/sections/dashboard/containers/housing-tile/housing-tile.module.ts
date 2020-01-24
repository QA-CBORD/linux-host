import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingTileComponent } from './housing-tile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HousingTileComponent],
  exports: [HousingTileComponent],
})
export class HousingTileModule {}
