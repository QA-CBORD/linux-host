import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WaitingListsComponent } from './waiting-lists.component'
import { ActionsModule } from '../actions/actions.module';

const declarations = [
  WaitingListsComponent
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
export class WaitingListsModule { }
