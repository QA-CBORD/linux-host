import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';

const imports = [CommonModule, SharedModule, IonicModule, DepositRoutingModule];
const declarations = [DepositPageComponent];

@NgModule({
  declarations,
  imports,
})
export class DepositModule {}
