import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomsFilterComponent } from './rooms-filter.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [RoomsFilterComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RoomsFilterModule {}
