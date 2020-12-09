import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TermsComponent } from './terms.component';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';

const imports = [CommonModule, IonicModule, AccessibleSelectModule];
const declarations = [TermsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class TermsModule {}
