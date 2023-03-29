import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDatePipe } from './message-date.pipe';

const declarations = [MessageDatePipe];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class MessageDatePipeModule { }
