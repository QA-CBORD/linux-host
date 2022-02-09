import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkOrdersComponent } from './work-orders.component'
import { ActionsModule } from '../actions/actions.module';

const declarations = [
  WorkOrdersComponent
]
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ActionsModule,
    RouterModule
  ],
  exports: declarations
})
export class WorkOrdersModule { }
