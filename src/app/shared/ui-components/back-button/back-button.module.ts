import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from './back-button.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [BackButtonComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class BackButtonModule {}
