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
import { SharedModule } from '../../shared/shared.module';
import { MobileAccessPopoverComponent } from './mobile-access-popover';

const imports = [
  CommonModule,
  FormsModule,
  IonicModule,
  MobileAccessRoutingModule,
  SharedModule
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
