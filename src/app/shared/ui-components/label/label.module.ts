import { NgModule } from '@angular/core';

import { LabelComponent } from './label.component';

export const declarations = [LabelComponent];

@NgModule({
  exports: declarations,
  declarations,
})
export class LabelModule {}
