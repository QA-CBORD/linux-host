import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderTileComponent } from './order-tile.component';
import { MerchantService } from '@sections/ordering';
import { OrderingApiService } from '@sections/ordering/services/ordering.api.service';


const imports = [IonicModule, CommonModule];
const declarations = [OrderTileComponent];
const providers = [MerchantService, OrderingApiService]
const exports = [OrderTileComponent];

@NgModule({
  declarations,
  imports,
  providers,
  exports,
})
export class OrderTileModule { }