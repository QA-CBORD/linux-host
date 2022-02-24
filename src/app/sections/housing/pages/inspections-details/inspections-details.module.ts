import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InspectionsDetailsRoutingModule } from './inspections-details.routing.module';

import { InspectionsDetailsPage } from './inspections-details.page';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsModule } from '@sections/housing/questions/questions.module';
import { StepperModule } from '@sections/housing/stepper/stepper.module';

const imports = [CommonModule, IonicModule, InspectionsDetailsRoutingModule,ReactiveFormsModule,QuestionsModule,StepperModule];
const declarations = [InspectionsDetailsPage];

@NgModule({
  imports,
  declarations
})
export class InspectionsDetailsPageModule {}
