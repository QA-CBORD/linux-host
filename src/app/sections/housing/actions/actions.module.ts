import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsComponent } from './actions.component';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { CommonModule } from '@angular/common';

export const imports = [IonicModule, RouterModule,CommonModule];
export const declarations = [ActionsComponent, ActionsListComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class ActionsModule {}
