import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { OrderTileComponent } from './order-tile.component';
import { TranslateModule } from '@ngx-translate/core';

const imports = [IonicModule, CommonModule, SwiperModule, TranslateModule];
const declarations = [OrderTileComponent];

@NgModule({
  declarations,
  imports,
  exports: [OrderTileComponent],
})
export class OrderTileModule {}
