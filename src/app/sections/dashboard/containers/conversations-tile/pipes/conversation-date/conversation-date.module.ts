import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationDatePipe } from './conversation-date.pipe';

const declarations = [ConversationDatePipe];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class ConversationDatePipeModule { }