import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LabelModule } from '@shared/ui-components/label/label.module';
import { AddToFavoriteModule } from '@shared/ui-components/add-to-favorite/add-to-favorite.module';
import { UnitsRoutingModule } from './units.routing.module';

import { UnitsPage } from './units.page';
import { UnitComponent } from './unit/unit.component';

export const imports = [CommonModule, IonicModule, LabelModule, AddToFavoriteModule, UnitsRoutingModule];
export const declarations = [UnitsPage, UnitComponent];

@NgModule({
  imports,
  declarations,
})
export class UnitsPageModule {}
