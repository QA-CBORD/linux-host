import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsModule } from '../actions/actions.module';

import { ContractsComponent } from './contracts.component';
import { ContractsListComponent } from './contracts-list/contracts-list.component';
import { HousingAccordionModule } from '../housing-accordion/housing-accordion.module';

const imports = [CommonModule, IonicModule, ActionsModule, RouterModule,HousingAccordionModule];
const declarations = [ContractsComponent, ContractsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ContractsModule {}
