import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileAccessPage } from './mobile-access.page';
import { LocationDetailPageModule } from './location-detail/location-detail.module';
import { MobileAccessRoutingModule } from './mobile-access-routing.module';
import { SharedModule } from '../../shared/shared.module';

const imports = [
  CommonModule,
  FormsModule,
  IonicModule,
  MobileAccessRoutingModule,
  LocationDetailPageModule,
  SharedModule
];

const declarations = [MobileAccessPage];

@NgModule({
  imports,
  declarations,
})
export class MobileAccessPageModule {}
