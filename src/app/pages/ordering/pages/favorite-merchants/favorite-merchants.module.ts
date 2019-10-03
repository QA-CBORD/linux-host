import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { FavoriteMerchantsRoutingModule } from './favorite-merchants.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { FavoriteMerhantsResolver } from './resolvers/favorite-merchants.resolver';
import { FavoriteMerhantsService } from './services/favorite-merhants.service';
import { MerchantListModule } from '@pages/ordering/components/merchant-list/merchant-list.module';

const imports = [CommonModule, IonicModule, FavoriteMerchantsRoutingModule, StHeaderModule, MerchantListModule];
const declarations = [FavoriteMerchantsComponent];
const providers = [FavoriteMerhantsResolver, FavoriteMerhantsService];

@NgModule({
  declarations,
  imports,
  providers
})
export class FavoriteMerchantsModule { }
