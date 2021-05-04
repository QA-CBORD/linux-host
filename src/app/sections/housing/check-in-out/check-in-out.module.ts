import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CheckInOutComponent } from './check-in-out.component';
import { CheckInOutItemsComponent } from './check-in-out-items.component'


export const imports = [CommonModule, IonicModule, RouterModule];
export const declarations = [CheckInOutComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations: [
    declarations,
    CheckInOutItemsComponent
  ],
})
export class CheckInOutModule {}