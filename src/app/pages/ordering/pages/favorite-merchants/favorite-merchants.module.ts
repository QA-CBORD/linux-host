import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { FavoriteMerchantsRoutingModule } from './favorite-merchants.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [CommonModule, IonicModule, FavoriteMerchantsRoutingModule, StHeaderModule];
const declarations = [FavoriteMerchantsComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class FavoriteMerchantsModule {}
