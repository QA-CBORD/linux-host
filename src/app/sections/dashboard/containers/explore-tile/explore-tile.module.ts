import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreTileComponent } from './explore-tile.component';
import { MerchantMainInfoComponent } from '@shared/ui-components/merchant-main-info/merchant-main-info.component';

const imports = [IonicModule, CommonModule, MerchantMainInfoComponent];
const declarations = [ExploreTileComponent];

@NgModule({
  declarations,
  imports,
  exports: [ExploreTileComponent],
})
export class ExploreTileModule {}
