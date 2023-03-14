import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsModule } from '@sections/housing/questions/questions.module';
import { StepperModule } from '@sections/housing/stepper/stepper.module';
import { NonAssignmentsDetailsPage } from './non-assignments-details.page';
import { NonAssignmentsDetailsRoutingModule } from './non-assignments-details.routing.module';
import { StFormsHeaderModule } from '@sections/housing/st-forms-header/st-forms-header.module';

const declarations = [NonAssignmentsDetailsPage];
const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
  NonAssignmentsDetailsRoutingModule,
  StFormsHeaderModule
];

@NgModule({
  imports,
  declarations
})
export class NonAssignmentsDetailsModule { }
