import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AttachmentsComponent } from './attachments.component'
import { ActionsModule } from '../actions/actions.module';

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
  ],
  exports: declarations
})
export class AttachmentModule { }
