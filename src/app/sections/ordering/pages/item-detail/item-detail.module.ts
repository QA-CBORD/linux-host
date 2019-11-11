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

const declarations = [ItemDetailComponent, SingleListComponent, MultiListComponent];
const imports = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  StTextareaFloatingLabelModule,
  ItemDetailRoutingModule,
  StHeaderModule,
];

@NgModule({
  declarations,
  exports: [ItemDetailComponent],
  entryComponents: [ItemDetailComponent],
  imports,
  providers: [ItemDetailResolver],
})
export class ItemDetailModule {}
