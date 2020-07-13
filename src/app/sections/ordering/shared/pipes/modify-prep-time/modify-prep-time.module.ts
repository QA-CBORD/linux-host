import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyPrepTimePipe } from './modify-prep-time.pipe';

const declarations = [ModifyPrepTimePipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class ModifyPrepTimeModule {}
