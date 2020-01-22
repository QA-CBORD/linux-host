import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UnitsRoutingModule } from './units.routing.module';

import { UnitsPage } from './units.page';

export const imports = [CommonModule, IonicModule, UnitsRoutingModule];
export const declarations = [UnitsPage];

@NgModule({
  imports,
  declarations,
})
export class UnitsPageModule {}
