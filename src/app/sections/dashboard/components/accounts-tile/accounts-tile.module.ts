import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountsService } from './services/accounts.service';

import { AccountsTileComponent } from './accounts-tile.component';

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
