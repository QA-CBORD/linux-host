import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApplicationsComponent } from './applications.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationActionsComponent } from './application-actions/application-actions.component';
import { ApplicationActionsListComponent } from './application-actions-list/application-actions-list.component';

const imports = [CommonModule, IonicModule];
const declarations = [
  ApplicationsComponent,
  ApplicationsListComponent,
  ApplicationActionsComponent,
  ApplicationActionsListComponent,
];
const entryComponents = [ApplicationActionsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
  entryComponents,
})
export class ApplicationsModule {}
