import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CheckInOutPage } from './check-in-out.page';
import { CheckInOutRoutingModule } from './check-in-out.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [
  CommonModule,
  IonicModule,
  StHeaderModule,
  CheckInOutRoutingModule,
];
const declarations = [CheckInOutPage];

@NgModule({
  imports,
  declarations,
})
export class CheckInOutPageModule {}
