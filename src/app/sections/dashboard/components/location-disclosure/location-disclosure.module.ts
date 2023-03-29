import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { LocationPermissionModal } from './location-disclosure.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';

const declarations = [LocationPermissionModal];

@NgModule({
  declarations,
  exports: [LocationPermissionModal],
  imports: [CommonModule, IonicModule, StPopoverLayoutModule, StHeaderModule, StButtonModule, StopPropagationModule],
})

export class LocationPermissionModalModule {}
