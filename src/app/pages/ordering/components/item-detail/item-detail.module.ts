import { NgModule } from '@angular/core';

// import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ItemDetailComponent } from './item-detail.component';
import { IonicModule } from '@ionic/angular';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { CommonModule } from '@angular/common';


const declarations = [ItemDetailComponent];
const imports = [CommonModule, IonicModule, StTextareaFloatingLabelModule]

@NgModule({
  
  declarations,
  exports: declarations,
  entryComponents: declarations,
  imports

})
export class ItemDetailModule { }
