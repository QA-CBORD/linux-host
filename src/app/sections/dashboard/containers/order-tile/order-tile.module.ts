import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { OrderTileComponent } from './order-tile.component';


const imports = [IonicModule, CommonModule, SwiperModule];
const declarations = [OrderTileComponent];

@NgModule({
  declarations,
  imports,
  exports : [OrderTileComponent],
})
export class OrderTileModule { }
