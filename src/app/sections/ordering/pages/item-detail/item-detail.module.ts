import { NgModule } from '@angular/core';

// import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ItemDetailComponent } from './item-detail.component';
import { IonicModule } from '@ionic/angular';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemDetailRoutingModule } from './item-detail.routing.module';
import { MultiListComponent } from './multi-list/multi-list.component';
import { SingleListComponent } from './single-list/single-list.component';


const declarations = [ItemDetailComponent, SingleListComponent, MultiListComponent];
const imports = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  StTextareaFloatingLabelModule,
  ItemDetailRoutingModule
]

@NgModule({

  declarations,
  exports: [ItemDetailComponent],
  entryComponents: [ItemDetailComponent],
  imports

})
export class ItemDetailModule { }
