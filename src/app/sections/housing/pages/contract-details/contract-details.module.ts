import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContractDetailsRoutingModule } from './contract-details.routing.module';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';
import { SignContractModule } from '@sections/housing/sign-contract/sign-contract.module';

import { ContractDetailsPage } from './contract-details.page';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  SignContractModule,
  ContractDetailsRoutingModule,
];
const declarations = [ContractDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class ContractDetailsPageModule {}
