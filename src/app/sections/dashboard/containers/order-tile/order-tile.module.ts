import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderTileComponent } from './order-tile.component';


const imports = [IonicModule, CommonModule];
const declarations = [OrderTileComponent];
const exports = [OrderTileComponent];

@NgModule({
  declarations,
  imports,
  exports,
})
export class OrderTileModule { }