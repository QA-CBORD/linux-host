import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkOrdersComponent } from './work-orders.component'
import { ActionsModule } from '../actions/actions.module';
import { StHierarcheTreeModule } from '@shared/ui-components/st-hierarchy-tree/st-hierarchy-tree.module';
import { StHierarcheTreeDialogModule } from '@shared/ui-components/st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.module';
import { SortByDatePipeModule } from '@shared/pipes/sort-by-date-pipe/sort-by-date.module';

const declarations = [
  WorkOrdersComponent
]
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ActionsModule,
    RouterModule,
    StHierarcheTreeModule,
    StHierarcheTreeDialogModule,
    SortByDatePipeModule
  ],
  exports: declarations
})
export class WorkOrdersModule { }
