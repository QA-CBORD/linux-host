import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { AccountsTileComponent } from './accounts-tile.component';
import { AccountsService } from '@sections/dashboard/services';

const imports = [IonicModule, CommonModule];
const declarations = [AccountsTileComponent, ];
const providers = [AccountsService];
const exports = [AccountsTileComponent, ];

@NgModule({
  declarations,
  imports,
  providers,
  exports,
})
export class AccountsTileModule {}
