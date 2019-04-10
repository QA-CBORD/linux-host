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

const imports = [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileAccessRoutingModule,
];

const declarations = [MobileAccessPage, LocationListComponent];
const providers = [LocationsResolverGuard, MobileAccessService];

@NgModule({
    imports,
    declarations: [
        declarations,
        LocationItemComponent
    ],
    providers
})
export class MobileAccessPageModule {
}
