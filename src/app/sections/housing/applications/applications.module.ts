import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsModule } from '../actions/actions.module';

import { ApplicationsComponent } from './applications.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';

const imports = [CommonModule, IonicModule, ActionsModule, RouterModule];
const declarations = [ApplicationsComponent, ApplicationsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ApplicationsModule {}
