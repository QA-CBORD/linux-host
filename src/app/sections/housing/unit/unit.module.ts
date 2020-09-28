import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelModule } from '@shared/ui-components/label/label.module';
import { AddToFavoriteModule } from '@shared/ui-components/add-to-favorite/add-to-favorite.module';

import { UnitComponent } from './unit.component';

export const imports = [CommonModule, LabelModule, AddToFavoriteModule];
export const declarations = [UnitComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class UnitsModule {}
