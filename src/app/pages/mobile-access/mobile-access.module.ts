import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileAccessPage } from './mobile-access.page';
import { MobileAccessRoutingModule } from './mobile-access-routing.module';
import { LocationsResolverGuard } from './locations.resolver.guard';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationItemComponent } from './location-list/location-item/location-item.component';
import { MobileAccessService } from './service/mobile-access.service';
import { ActivateLocationComponent } from './activate-location/activate-location.component';
import { SharedModule } from '../../shared/shared.module';

const imports = [CommonModule, FormsModule, IonicModule, MobileAccessRoutingModule, SharedModule];

const declarations = [MobileAccessPage, LocationListComponent, ActivateLocationComponent, LocationItemComponent];
const providers = [LocationsResolverGuard, MobileAccessService];

@NgModule({
  imports,
  declarations,
  providers,
})
export class MobileAccessPageModule {}
