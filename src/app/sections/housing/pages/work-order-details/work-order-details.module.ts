import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WorkOrderDetailsRoutingModule } from './work-order-details.routing.module';

import { WorkOrderDetailsPage } from './work-order-details.page';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsModule } from '@sections/housing/questions/questions.module';
import { StepperModule } from '@sections/housing/stepper/stepper.module';
import { StFormsHeaderModule } from '@sections/housing/st-forms-header/st-forms-header.module';
import { StButtonModule } from '@shared/ui-components/st-button';

const imports = [
  CommonModule,
  IonicModule,
  WorkOrderDetailsRoutingModule,
  ReactiveFormsModule,
  QuestionsModule,
  StepperModule,
  StFormsHeaderModule,
  StButtonModule
];
const declarations = [WorkOrderDetailsPage];

@NgModule({
  imports,
  declarations
})
export class WorkOrderDetailsPageModule {}
