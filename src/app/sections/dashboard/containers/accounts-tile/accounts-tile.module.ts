import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { AccountsTileComponent } from './accounts-tile.component';

const imports = [IonicModule, CommonModule];
const declarations = [AccountsTileComponent, ];
const exports = [AccountsTileComponent];

@NgModule({
  declarations,
  imports,
  exports,
})
export class AccountsTileModule {}
