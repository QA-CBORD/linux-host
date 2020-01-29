import { NgModule } from '@angular/core';

import { EmptyBuildingsComponent } from './empty-buildings.component';

export const declarations = [EmptyBuildingsComponent];

@NgModule({
  exports: declarations,
  declarations,
})
export class EmptyBuildingsModule {}
