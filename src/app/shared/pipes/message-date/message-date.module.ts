import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDatePipe } from './message-date.pipe';
import { MessageDatePipeOverview } from './message-date-overview.pipe';

const declarations = [MessageDatePipe,MessageDatePipeOverview];
@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class MessageDatePipeModule { }
