import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { AccountsTileComponent } from './accounts-tile.component';
import { TransactionUnitsPipeModule } from '@shared/pipes';

const imports = [IonicModule, CommonModule, SwiperModule, TransactionUnitsPipeModule];
const declarations = [AccountsTileComponent];

@NgModule({
  declarations,
  imports: [imports, TransactionUnitsPipeModule],
  exports: [AccountsTileComponent],
})
export class AccountsTileModule {}
