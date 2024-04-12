import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewCartComponent } from './view-cart.component';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [ViewCartComponent];

@NgModule({
  declarations,
  exports: [declarations],
  imports: [CommonModule, IonicModule, TranslateModule],
})
export class ViewCartModule {}
