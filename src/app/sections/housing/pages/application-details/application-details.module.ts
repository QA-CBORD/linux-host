import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApplicationDetailsRoutingModule } from './application-details.routing.module';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';

import { ApplicationDetailsPage } from './application-details.page';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  ApplicationDetailsRoutingModule,
];
const declarations = [ApplicationDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class ApplicationDetailsPageModule {}
