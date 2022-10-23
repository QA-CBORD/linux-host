import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ContractListComponent } from './contract-list.component';
import { ContractListItemsComponent } from './contract-list-items.component'
import { HousingAccordionModule } from '../housing-accordion/housing-accordion.module';


export const imports = [CommonModule, IonicModule, RouterModule, HousingAccordionModule];
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