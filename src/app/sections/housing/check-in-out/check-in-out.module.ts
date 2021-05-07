import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CheckInOutComponent } from './check-in-out.component';
import { CheckInOutItemsComponent } from './check-in-out-items/check-in-out-items.component'
import { CheckInOutSpotsComponent } from './check-in-out-spots/check-in-out-spots.component';

export const imports = [
  CommonModule,
  IonicModule,
  RouterModule
];
export const declarations = [
  CheckInOutComponent,
  CheckInOutItemsComponent,
  CheckInOutSpotsComponent
];

@NgModule({
  imports,
  exports: declarations,
  declarations: declarations,
})
export class CheckInOutModule {}