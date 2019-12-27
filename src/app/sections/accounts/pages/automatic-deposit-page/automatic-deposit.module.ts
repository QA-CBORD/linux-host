import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutomaticDepositRoutingModule } from './automatic-deposit.routing.module';
import { IonicModule } from '@ionic/angular';
import { DepositTypeNavComponent } from './components/deposit-type-nav/deposit-type-nav.component';
import { AutoDepositService } from './service/auto-deposit.service';
import { AutoDepositApiService } from './service/auto-deposit-api-service.service';
import { AutomaticDepositResolver } from './resolver/automatic-deposit.resolver';
import { DepositFrequencyComponent } from './components/deposit-frequency/deposit-frequency.component';
import { AccountsSharedModule } from '../../shared/shared.module';
import { PopoverComponent } from './components/popover/popover.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const declarations = [
  AutomaticDepositPageComponent,
  DepositTypeNavComponent,
  DepositFrequencyComponent,
  PopoverComponent,
];
const imports = [
  CommonModule,
  ReactiveFormsModule,
  StInputFloatingLabelModule,
  StSelectFloatingLabelModule,
  StHeaderModule,
  StPopoverLayoutModule,
  AutomaticDepositRoutingModule,
  IonicModule.forRoot({
  scrollPadding: false,
  scrollAssist: true,
}), AccountsSharedModule];
const entryComponents = [PopoverComponent];
const providers = [AutoDepositService, AutoDepositApiService, AutomaticDepositResolver];

@NgModule({
  imports,
  declarations,
  providers,
  entryComponents: entryComponents,
})
export class AutomaticDepositModule {
}
