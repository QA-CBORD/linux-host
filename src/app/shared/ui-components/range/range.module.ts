import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RangeComponent } from './range.component';

const imports = [IonicModule, ReactiveFormsModule];
const declarations = [RangeComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RangeModule {}
