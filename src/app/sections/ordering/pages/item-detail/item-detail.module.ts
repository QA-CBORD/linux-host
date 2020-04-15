import { NgModule } from '@angular/core';

import { ItemDetailComponent } from './item-detail.component';
import { IonicModule } from '@ionic/angular';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailRoutingModule } from './item-detail.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { SingleListComponent } from './components/single-list';
import { MultiListComponent } from './components/multi-list';
import { ItemDetailResolver } from './resolvers/item-detail.resolver';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { ItemDetailModalModule } from '@sections/ordering';

const declarations = [ItemDetailComponent, SingleListComponent, MultiListComponent];
const imports = [
  CommonModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  ItemDetailModalModule,
  ReactiveFormsModule,
  StTextareaFloatingLabelModule,
  ItemDetailRoutingModule,
  StHeaderModule,
  PriceUnitsResolverModule,
  StButtonModule,
  StPopoverLayoutModule
];

@NgModule({
  declarations,
  imports,
  exports: [ItemDetailComponent],
  entryComponents: [ItemDetailComponent],
  providers: [ItemDetailResolver],
})
export class ItemDetailModule {}
