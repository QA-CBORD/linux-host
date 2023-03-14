import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WaitingListsDetailsRoutingModule } from './waiting-lists-details.routing.module';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';

import { WaitingListsDetailsPage } from './waiting-lists-details.page';
import { StFormsHeaderModule } from '@sections/housing/st-forms-header/st-forms-header.module';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  WaitingListsDetailsRoutingModule,
  StFormsHeaderModule
];
const declarations = [WaitingListsDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class WaitingListsDetailsPageModule {}
