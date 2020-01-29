import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UnitsModule } from '@sections/housing/unit/unit.module';
import { EmptyPlaceholderModule } from '@sections/housing/empty-placeholder/empty-placeholder.module';

import { UnitsPage } from './units.page';

export const imports = [CommonModule, IonicModule, UnitsModule, EmptyPlaceholderModule];
export const declarations = [UnitsPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class UnitsPageModule {}
