import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { StPopoverLayoutModule } from '../st-popover-layout/st-popover-layout.module';

const declarations = [StGlobalPopoverComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    StPopoverLayoutModule
  ],
  exports: declarations
})
export class StGlobalPopoverModule { }
