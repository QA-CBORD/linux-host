import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHierarcheTreeComponent } from './st-hierarchy-tree.component';
import { IonicModule } from '@ionic/angular';
import { StHierarcheTreeDialogModule } from '@shared/ui-components/st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';

const declarations = [StHierarcheTreeComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    StHierarcheTreeDialogModule,
    StTextareaFloatingLabelModule
  ],
  exports: declarations,
  entryComponents: declarations
})
export class StHierarcheTreeModule { }
