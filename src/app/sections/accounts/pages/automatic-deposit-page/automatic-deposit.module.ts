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
import { PopoverComponent } from './components/popover/popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditCardTypeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

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
  TransactionUnitsPipeModule,
  CreditCardTypeModule,
  AutomaticDepositRoutingModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
];
const entryComponents = [PopoverComponent];
const providers = [AutoDepositService, AutoDepositApiService, AutomaticDepositResolver];

@NgModule({
  imports: [
    imports,
  ],
  declarations,
  providers,
  entryComponents: entryComponents,
})
export class AutomaticDepositModule {}
