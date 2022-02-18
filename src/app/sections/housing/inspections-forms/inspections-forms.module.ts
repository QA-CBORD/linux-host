import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InspectionsComponent } from './inspections-forms.component'
import { ActionsModule } from '../actions/actions.module';

const declarations = [
  InspectionsComponent
]
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ActionsModule,
    RouterModule,
  ],
  exports: declarations
})
export class InspectionsModule { }
