import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UnitsModule } from '@sections/housing/unit/unit.module';
import { UnitsRoutingModule } from './units.routing.module';

import { UnitsPage } from './units.page';

export const imports = [CommonModule, IonicModule, UnitsModule, UnitsRoutingModule];
export const declarations = [UnitsPage];

@NgModule({
  imports,
  declarations,
})
export class UnitsPageModule {}
