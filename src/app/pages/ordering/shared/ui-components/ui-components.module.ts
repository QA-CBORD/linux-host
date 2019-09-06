import { PipesModule } from '../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantItemComponent } from './merchant-list/merchant-item/merchant-item.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [...declarations, IonicModule],
  entryComponents: [],
})
export class UiComponentsModule {}
