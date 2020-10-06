import { NgModule } from '@angular/core';

import { TogglerDirective } from './toggler.directive';

export const declarations = [TogglerDirective];

@NgModule({
  exports: declarations,
  declarations,
})
export class TogglerModule {}
