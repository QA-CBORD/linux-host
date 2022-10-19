import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsModule } from '../actions/actions.module';

import { ApplicationsComponent } from './applications.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { HousingAccordionModule } from '../housing-accordion/housing-accordion.module';

const imports = [CommonModule, IonicModule, ActionsModule, RouterModule, HousingAccordionModule];
const declarations = [ApplicationsComponent, ApplicationsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ApplicationsModule {}
