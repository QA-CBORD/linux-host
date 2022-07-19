import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContractDetailsRoutingModule } from './contract-details.routing.module';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';
import { SignContractModule } from '@sections/housing/sign-contract/sign-contract.module';

import { ContractDetailsPage } from './contract-details.page';
import { StButtonModule } from '@shared/ui-components/st-button';
import { FormPaymentService } from '../form-payment/form-payment.service';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { AccountsService } from '@sections/dashboard/services';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  SignContractModule,
  ContractDetailsRoutingModule,
  StButtonModule,
];
const declarations = [ContractDetailsPage];

@NgModule({
  imports,
  declarations,
  providers: [FormPaymentService, CreditCardService, AccountsService],
})
export class ContractDetailsPageModule {}
