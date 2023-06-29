import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { ReactiveFormsModule } from '@angular/forms';

import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutomaticDepositRoutingModule } from './automatic-deposit.routing.module';
import { DepositTypeNavComponent } from './components/deposit-type-nav/deposit-type-nav.component';
import { AutoDepositService } from './service/auto-deposit.service';
import { AutoDepositApiService } from './service/auto-deposit-api-service.service';
import { AutomaticDepositResolver } from './resolver/automatic-deposit.resolver';
import { DepositFrequencyComponent } from './components/deposit-frequency/deposit-frequency.component';
import { PopoverComponent } from './components/popover/popover.component';
import { CreditCardTypePipeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { UnsavedChangesGuard } from '@sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard';
import { ConfirmUnsavedChangesPopoverComponent } from '@sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component';
import { StButtonModule } from '@shared/ui-components/st-button';

const declarations = [
  AutomaticDepositPageComponent,
  DepositTypeNavComponent,
  DepositFrequencyComponent,
  PopoverComponent,
  ConfirmUnsavedChangesPopoverComponent,
];
const imports = [
  CommonModule,
  ReactiveFormsModule,
  StInputFloatingLabelModule,
  StSelectFloatingLabelModule,
  StHeaderModule,
  StPopoverLayoutModule,
  TransactionUnitsPipeModule,
  CreditCardTypePipeModule,
  AutomaticDepositRoutingModule,
  StButtonModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
];
const providers = [AutoDepositService, AutoDepositApiService, AutomaticDepositResolver, UnsavedChangesGuard];

@NgModule({
  imports: [imports],
  declarations,
  providers,
})
export class AutomaticDepositModule {}
