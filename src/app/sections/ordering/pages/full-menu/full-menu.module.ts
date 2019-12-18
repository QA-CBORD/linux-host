import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FullMenuComponent } from './full-menu.component';
import { FullMenuRoutingModule } from './full-menu.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MerchantDistanceModule } from '@sections/ordering/shared/pipes/merchant-distance/merchant-distance.module';
import { ViewCartModule } from '@sections/ordering/shared/ui-components/view-cart';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';

const imports = [
  CommonModule,
  IonicModule,
  FullMenuRoutingModule,
  StHeaderModule,
  MerchantDistanceModule,
  ViewCartModule,
  ModifyPrepTimeModule,
];
const declarations = [FullMenuComponent];

@NgModule({
  declarations,
  imports,
})
export class FullMenuModule {}
