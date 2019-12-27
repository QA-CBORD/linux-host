import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MobileAccessPage } from './mobile-access.page';
import { MobileAccessRoutingModule } from './mobile-access-routing.module';
import { LocationsResolverGuard } from './resolvers';
import { LocationListComponent } from './location-list';
import { LocationItemComponent } from './location-list/location-item';
import { MobileAccessService } from './service';
import { ActivateLocationComponent } from './activate-location';
import { MobileAccessPopoverComponent } from './mobile-access-popover';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { MetersToMilesPipeModule } from '@shared/pipes/meters-to-miles-pipe/meters-to-miles-pipe.module';
import { TruncatePipeModule } from '@shared/pipes/truncate-pipe/truncate-pipe.module';
import { StCountdownModule } from '@shared/ui-components/st-countdown/st-countdown.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StSpinnerModule } from '@shared/ui-components/st-spinner/st-spinner.module';

const imports = [
  CommonModule,
  FormsModule,
  IonicModule,
  MobileAccessRoutingModule,
  StopPropagationModule,
  MetersToMilesPipeModule,
  TruncatePipeModule,
  StCountdownModule,
  StPopoverLayoutModule,
  StHeaderModule,
  StSpinnerModule
];

const declarations = [
  MobileAccessPage,
  LocationListComponent,
  ActivateLocationComponent,
  LocationItemComponent,
  MobileAccessPopoverComponent,
];
const providers = [LocationsResolverGuard, MobileAccessService];
const entryComponents = [MobileAccessPopoverComponent];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents,
})
export class MobileAccessPageModule {}
