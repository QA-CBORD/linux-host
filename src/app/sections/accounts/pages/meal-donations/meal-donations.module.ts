import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { MealDonationsComponent } from './meal-donations.component';
import { MealDonationsRoutingModule } from './meal-donations.routing.module';
import { MealDonationsResolver } from './resolver/meal-donations.resolver';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { MealDonationsService } from '@sections/accounts/services/meal-donations.service';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { ConfirmDonatePopoverComponent } from './components/confirm-donate-popover';
import { ConfirmDonatePopoverModule } from './components/confirm-donate-popover/confirm-donate-popover.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { PopoverComponent } from './components/popover/popover.component';

const imports = [
  IonicModule,
  CommonModule,
  MealDonationsRoutingModule,
  StHeaderModule,
  StSelectFloatingLabelModule,
  StInputFloatingLabelModule,
  ReactiveFormsModule,
  TransactionUnitsPipeModule,
  StButtonModule,
  ConfirmDonatePopoverModule,
  StPopoverLayoutModule
];
const declarations = [MealDonationsComponent, PopoverComponent];
const providers = [MealDonationsResolver, MealDonationsService];
const entryComponents = [ConfirmDonatePopoverComponent, PopoverComponent];
@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class MealDonationsModule {}
