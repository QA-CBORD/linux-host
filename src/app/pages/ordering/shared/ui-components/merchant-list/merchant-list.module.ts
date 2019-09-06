import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantListComponent } from './merchant-list.component';
import { IonicModule } from '@ionic/angular';
import { MerchantItemComponent } from './merchant-item/merchant-item.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';

const declarations = [MerchantListComponent, MerchantItemComponent];

@NgModule({
  declarations,
  exports: [MerchantListComponent],
  imports: [CommonModule, IonicModule, SharedModule, PipesModule],
})
export class MerchantListModule {}
