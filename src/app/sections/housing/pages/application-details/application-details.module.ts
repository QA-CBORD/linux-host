import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicationDetailsRoutingModule } from './application-details.routing.module';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';
import { ApplicationDetailsPage } from './application-details.page';
import { StButtonModule } from '@shared/ui-components/st-button';
import { AccountsService } from '@sections/dashboard/services';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { FormPaymentModule } from '../form-payment/form-payment.module';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  ApplicationDetailsRoutingModule,
  FormPaymentModule,
  StButtonModule,
];
const declarations = [ApplicationDetailsPage];

@NgModule({
  imports,
  declarations,
  providers: [AccountsService, CreditCardService],
})
export class ApplicationDetailsPageModule {}
