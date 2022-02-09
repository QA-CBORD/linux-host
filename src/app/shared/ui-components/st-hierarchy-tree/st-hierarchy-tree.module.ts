import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHierarcheTreeComponent } from './st-hierarchy-tree.component';
import { IonicModule } from '@ionic/angular';
import { StHierarcheTreeDialogModule } from '@shared/ui-components/st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.module';
import { entryComponents } from '@sections/housing/actions/actions.module';

const declarations = [StHierarcheTreeComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    StHierarcheTreeDialogModule
  ],
  exports: declarations,
  entryComponents: declarations
})
export class StHierarcheTreeModule { }
