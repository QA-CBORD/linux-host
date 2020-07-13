import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsComponent } from './actions.component';
import { ActionsListComponent } from './actions-list/actions-list.component';

export const imports = [IonicModule, RouterModule];
export const declarations = [ActionsComponent, ActionsListComponent];
export const entryComponents = [ActionsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents,
})
export class ActionsModule {}
