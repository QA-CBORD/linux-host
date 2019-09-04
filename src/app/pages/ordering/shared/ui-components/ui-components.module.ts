import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MerchantItemComponent } from './merchant-list/merchant-list-item/merchant-item.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MenuOrderingComponent } from './menu-ordering/menu-ordering.component';

const declarations = [MenuOrderingComponent, MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  imports: [CommonModule, IonicModule],
  exports: [...declarations, IonicModule],
  entryComponents: [],
})
export class UiComponentsModule {}
