import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StPopoverLayoutModule } from '../st-popover-layout/st-popover-layout.module';
import { StNativeStartupPopoverComponent } from '@shared/ui-components/st-native-startup-popover/st-native-startup-popover.component';

const declarations = [StNativeStartupPopoverComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    StPopoverLayoutModule
  ],
  exports: declarations
})
export class StNativeStartupPopoverModule { }
