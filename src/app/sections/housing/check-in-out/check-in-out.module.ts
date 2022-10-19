import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CheckInOutComponent } from './check-in-out.component';
import { CheckInOutItemsComponent } from './check-in-out-items/check-in-out-items.component'
import { HousingAccordionModule } from '../housing-accordion/housing-accordion.module';

export const imports = [
  CommonModule,
  IonicModule,
  RouterModule,
  HousingAccordionModule
];
export const declarations = [
  CheckInOutComponent,
  CheckInOutItemsComponent,
];

@NgModule({
  imports,
  exports: declarations,
  declarations: declarations,
})
export class CheckInOutModule {}