import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreTileComponent } from './explore-tile.component';


const imports = [IonicModule, CommonModule];
const declarations = [ExploreTileComponent];
const exports = [ExploreTileComponent];

@NgModule({
  declarations,
  imports,
  exports,
})
export class ExploreTileModule { }
