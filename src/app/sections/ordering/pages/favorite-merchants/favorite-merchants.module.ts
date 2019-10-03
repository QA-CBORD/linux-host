import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';
import { FavoriteMerchantsRoutingModule } from './favorite-merchants.routing.module';

const imports = [CommonModule, SharedModule, IonicModule, FavoriteMerchantsRoutingModule];
const declarations = [FavoriteMerchantsComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class FavoriteMerchantsModule { }
