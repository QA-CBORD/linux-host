import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutomaticDepositRoutingModule } from './automatic-deposit.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

const declarations = [AutomaticDepositPageComponent];
const imports = [CommonModule, SharedModule, AutomaticDepositRoutingModule, IonicModule];

@NgModule({
  declarations,
  imports,
})
export class AutomaticDepositModule {}
