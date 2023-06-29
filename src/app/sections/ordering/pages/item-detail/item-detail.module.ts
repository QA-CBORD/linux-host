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
import { ItemDetailModalComponent } from '@sections/ordering/pages/item-detail/components/item-detail-modal/item-detail-modal.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const declarations = [ItemDetailComponent, SingleListComponent, MultiListComponent, ItemDetailModalComponent];
const imports = [
  CommonModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  ReactiveFormsModule,
  StTextareaFloatingLabelModule,
  ItemDetailRoutingModule,
  StHeaderModule,
  PriceUnitsResolverModule,
  StButtonModule,
];

@NgModule({
  declarations,
  imports: [
    imports,
    StPopoverLayoutModule,
  ],
  exports: [ItemDetailComponent],
  providers: [ItemDetailResolver],
})
export class ItemDetailModule {}
