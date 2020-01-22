import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PinLocationComponent } from './pin-location.component';

export const imports = [IonicModule];
export const declarations = [PinLocationComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class PinLocationModule {}
