import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FavoriteMerchantsRoutingModule } from './favorite-merchants.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { FavoriteMerchantsResolver } from './resolvers/favorite-merchants.resolver';
import { FavoriteMerchantsService } from './services/favorite-merchants.service';
import { MerchantListModule } from '@sections/ordering/components/merchant-list/merchant-list.module';
import { FavoriteMerchantsComponent } from '@sections/ordering/pages';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

const imports = [CommonModule, IonicModule, FavoriteMerchantsRoutingModule, StHeaderModule, MerchantListModule, StButtonModule];
const declarations = [FavoriteMerchantsComponent];
const providers = [FavoriteMerchantsResolver, FavoriteMerchantsService];

@NgModule({
  declarations,
  imports,
  providers
})
export class FavoriteMerchantsModule { }
