import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { LocationPermissionPopover } from './location-popover.component';

const declarations = [LocationPermissionPopover];

@NgModule({
  declarations,
  exports: [LocationPermissionPopover],
  imports: [CommonModule, IonicModule, StPopoverLayoutModule],
})

export class LocationPermissionPopoverModule {}