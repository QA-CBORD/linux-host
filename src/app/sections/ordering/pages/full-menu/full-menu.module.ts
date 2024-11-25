import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FullMenuComponent } from './full-menu.component';
import { FullMenuRoutingModule } from './full-menu.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ViewCartModule } from '@sections/ordering/shared/ui-components/view-cart';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { MenuItemFinderModule } from '@sections/ordering/components/menu-item-finder/menu-item-finder.module';
import { OrderPrepTime } from '../../shared/ui-components/order-prep-time/order-prep-time.component';
import { OrderingResolver } from '@sections/ordering/resolvers';

const imports = [
  CommonModule,
  IonicModule,
  FullMenuRoutingModule,
  StHeaderModule,
  MerchantDistanceModule,
  ViewCartModule,
  MenuItemFinderModule,
  ModifyPrepTimeModule,
  StPopoverLayoutModule,
  AddressHeaderFormatPipeModule,
  OrderPrepTime,
];
const declarations = [FullMenuComponent];
const providers = [OrderingResolver];

@NgModule({
  declarations,
  imports,
  providers
})
export class FullMenuModule {}
