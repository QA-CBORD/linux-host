import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { EmptyPlaceholderComponent } from './empty-placeholder.component';

export const imports = [IonicModule];
export const declarations = [EmptyPlaceholderComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class EmptyPlaceholderModule {}
