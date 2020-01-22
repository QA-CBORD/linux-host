import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TermsComponent } from './terms.component';

const imports = [CommonModule, IonicModule];
const declarations = [TermsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class TermsModule {}
