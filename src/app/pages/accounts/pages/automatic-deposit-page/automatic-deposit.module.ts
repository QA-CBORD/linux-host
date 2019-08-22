import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutomaticDepositRoutingModule } from './automatic-deposit.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { DepositTypeNavComponent } from './components/deposit-type-nav/deposit-type-nav.component';
import { AutoDepositService } from './service/auto-deposit.service';
import { AutoDepositApiServiceService } from './service/auto-deposit-api-service.service';
import { AutomaticDepositResolver } from './resolver/automatic-deposit.resolver';

const declarations = [AutomaticDepositPageComponent, DepositTypeNavComponent];
const imports = [CommonModule, SharedModule, AutomaticDepositRoutingModule, IonicModule];
const providers = [AutoDepositService, AutoDepositApiServiceService, AutomaticDepositResolver];

@NgModule({
  imports,
  declarations,
  providers
})
export class AutomaticDepositModule {}
