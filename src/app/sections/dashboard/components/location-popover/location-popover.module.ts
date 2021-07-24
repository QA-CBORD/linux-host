import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { LocationPermissionModal } from './location-popover.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const declarations = [LocationPermissionModal];

@NgModule({
  declarations,
  exports: [LocationPermissionModal],
  imports: [CommonModule, IonicModule, StPopoverLayoutModule, StHeaderModule],
})


export class LocationPermissionModalModule {}