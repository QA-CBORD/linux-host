import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AttachmentsComponent } from './attachments.component'
import { ActionsModule } from '../actions/actions.module';
import { SortByDatePipeModule } from '@shared/pipes/sort-by-date-pipe/sort-by-date.module';

const declarations = [
  AttachmentsComponent
]
@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ActionsModule,
    RouterModule,
    SortByDatePipeModule
  ],
  exports: declarations
})
export class AttachmentModule { }
