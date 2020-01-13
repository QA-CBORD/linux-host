import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDonationsComponent } from './meal-donations.component';
import { MealDonationsRoutingModule } from './meal-donations.routing.module';
import { MealDonationsResolver } from '../../resolvers/meal-donations.resolver';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { MealDonationsService } from '@sections/accounts/services/meal-donations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    MealDonationsRoutingModule,
    StHeaderModule,
    StSelectFloatingLabelModule,
    StInputFloatingLabelModule,
    ReactiveFormsModule,
    TransactionUnitsPipeModule,
    StButtonModule
  ],
  providers: [MealDonationsResolver, MealDonationsService],
  declarations: [MealDonationsComponent],
  exports: [MealDonationsComponent]
})
export class MealDonationsModule { }
