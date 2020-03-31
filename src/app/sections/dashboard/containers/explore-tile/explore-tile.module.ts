import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreTileComponent } from './explore-tile.component';
import { MerchantMainInfoModule } from '@shared/ui-components/merchant-main-info/merchant-main-info.module';


const imports = [IonicModule, CommonModule];
const declarations = [ExploreTileComponent];
const exports = [ExploreTileComponent];

@NgModule({
  declarations,
  imports: [
    imports,
    MerchantMainInfoModule,
  ],
  exports,
})
export class ExploreTileModule { }
