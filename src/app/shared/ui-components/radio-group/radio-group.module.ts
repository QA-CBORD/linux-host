import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RadioGroupComponent } from './radio-group.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [RadioGroupComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RadioGroupModule {}
