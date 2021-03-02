import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActionsModule } from '../actions/actions.module';
import { NonAssignmentsListComponent } from './non-assignments-list/non-assignments-list.component';
import { NonAssignmentsComponent } from './non-assignments.component';

const imports = [
  CommonModule,
  IonicModule,
  ActionsModule,
  RouterModule
];
const declarations = [
  NonAssignmentsComponent,
  NonAssignmentsListComponent
];

@NgModule({
  declarations,
  imports,
  exports: declarations
})
export class NonAssginmentsModule { }
