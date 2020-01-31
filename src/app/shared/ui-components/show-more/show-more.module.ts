import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShowMoreComponent } from './show-more.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [ShowMoreComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ShowMoreModule {}
