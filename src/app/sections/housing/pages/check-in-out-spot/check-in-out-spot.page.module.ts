import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CheckInOutSpotPage } from './check-in-out-spot.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CheckInOutSpotRoutingModule } from './check-in-out-spot.routing.module';

const imports = [
  CommonModule,
  IonicModule,
  StHeaderModule,
  CheckInOutSpotRoutingModule,
];
export const declarations = [CheckInOutSpotPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class CheckInOutSpotPageModule { }
