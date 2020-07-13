import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TileWrapperComponent } from './tile-wrapper.component';


const imports = [IonicModule, CommonModule];
const declarations = [TileWrapperComponent];
const exports = [TileWrapperComponent];

@NgModule({
  declarations,
  imports,
  exports,
})
export class TileWrapperModule { }
