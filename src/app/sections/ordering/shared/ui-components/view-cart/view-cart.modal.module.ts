import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewCartComponent } from './view-cart.component';

const declarations = [ViewCartComponent];

@NgModule({
  declarations,
  exports: [declarations],
  imports: [CommonModule, IonicModule],
})
export class ViewCartModule {}
