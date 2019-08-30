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
import { DepositFrequencyComponent } from './components/deposit-frequency/deposit-frequency.component';
import { AccountsSharedModule } from '../../shared/shared.module';
import { PopoverComponent } from './components/popover/popover.component';

const declarations = [
  AutomaticDepositPageComponent,
  DepositTypeNavComponent,
  DepositFrequencyComponent,
  PopoverComponent,
];
const imports = [CommonModule, SharedModule, AutomaticDepositRoutingModule, IonicModule, AccountsSharedModule];
const providers = [AutoDepositService, AutoDepositApiServiceService, AutomaticDepositResolver];
const entryComponents = [PopoverComponent];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents: entryComponents,
})
export class AutomaticDepositModule {}
