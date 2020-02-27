import { NgModule } from '@angular/core';

import { ItemDetailComponent } from './item-detail.component';
import { IonicModule } from '@ionic/angular';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailRoutingModule } from './item-detail.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { SingleListComponent } from './single-list';
import { MultiListComponent } from './multi-list';
import { ItemDetailResolver } from './resolvers/item-detail.resolver';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

const declarations = [ItemDetailComponent, SingleListComponent, MultiListComponent, ];
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
  StButtonModule
];

@NgModule({
  declarations,
  imports,
  exports: [ItemDetailComponent],
  entryComponents: [ItemDetailComponent],
  providers: [ItemDetailResolver],
})
export class ItemDetailModule {}
