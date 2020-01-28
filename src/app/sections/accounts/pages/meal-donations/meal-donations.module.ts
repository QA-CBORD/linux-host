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
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { ConfirmDonatePopoverComponent } from './components/confirm-donate-popover';
import { ConfirmDonatePopoverModule } from './components/confirm-donate-popover/confirm-donate-popover.module';
import { MealDonationsService } from './service/meal-donations.service';
import { AccountTypePipe } from './pipes/account-type';
import { DonateModalComponent } from './components/donate-modal';
import { DonateModalModule } from './components/donate-modal/donate-modal.module';

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
  DonateModalModule

];
const declarations = [MealDonationsComponent, AccountTypePipe];
const providers = [MealDonationsResolver, MealDonationsService];
const entryComponents = [ConfirmDonatePopoverComponent, DonateModalComponent];
@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class MealDonationsModule {}
