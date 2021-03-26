import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ContractListComponent } from './contract-list.component';
import { ContractListItemsComponent } from './contract-list-items.component'


export const imports = [CommonModule, IonicModule, RouterModule];
export const declarations = [ContractListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations: [
    declarations,
    ContractListItemsComponent
  ],
})
export class ContractListModule {}