import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHierarcheTreeDialogComponent } from './st-hierarchy-tree-dialog.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StHierarcheTreeDialogComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations,
  entryComponents: declarations
})
export class StHierarcheTreeDialogModule { }
