import { NgModule } from '@angular/core';

import { LabelModule } from '@shared/ui-components/label/label.module';

import { BuildingComponent } from './building.component';

export const imports = [LabelModule];
export const declarations = [BuildingComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class BuildingModule {}
