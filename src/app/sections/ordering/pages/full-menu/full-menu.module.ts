import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FullMenuComponent } from './full-menu.component';
import { FullMenuRoutingModule } from './full-menu.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MerchantDistanceModule } from '@sections/ordering/shared/pipes/merchant-distance/merchant-distance.module';
import { ViewCartModule } from '@sections/ordering/shared/ui-components/view-cart';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { FullMenuPopoverComponent } from './full-menu-popover';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const imports = [
  CommonModule,
  IonicModule,
  FullMenuRoutingModule,
  StHeaderModule,
  MerchantDistanceModule,
  ViewCartModule,
  ModifyPrepTimeModule,
  StPopoverLayoutModule
];
const declarations = [FullMenuComponent, FullMenuPopoverComponent];

@NgModule({
  declarations,
  imports,
  entryComponents: [FullMenuPopoverComponent]
})
export class FullMenuModule {}
