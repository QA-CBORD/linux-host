import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BuildingModule } from '@sections/housing/building/building.module';
import { EmptyPlaceholderModule } from '@sections/housing/empty-placeholder/empty-placeholder.module';

import { BuildingsPage } from './buildings.page';

export const imports = [CommonModule, IonicModule, BuildingModule, EmptyPlaceholderModule];
export const declarations = [BuildingsPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class BuildingsPageModule {}
