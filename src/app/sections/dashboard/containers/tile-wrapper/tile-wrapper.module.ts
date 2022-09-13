import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TileWrapperComponent } from './tile-wrapper.component';


const imports = [IonicModule, CommonModule];
const declarations = [TileWrapperComponent];

@NgModule({
  declarations,
  imports,
  exports : [TileWrapperComponent],
})
export class TileWrapperModule { }
