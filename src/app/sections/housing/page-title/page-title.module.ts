import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PageTitleComponent } from './page-title.component';

export const imports = [IonicModule];
export const declarations = [PageTitleComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class PageTitleModule {}
