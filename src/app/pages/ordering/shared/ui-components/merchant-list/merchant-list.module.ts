import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantListComponent } from './merchant-list.component';
import { MerchantItemComponent } from './merchant-list-item/merchant-item.component';
import { IonicModule } from '@ionic/angular';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule],
})
export class MerchantListModule {}
