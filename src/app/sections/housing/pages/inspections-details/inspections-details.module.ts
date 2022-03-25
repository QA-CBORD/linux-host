import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InspectionsDetailsRoutingModule } from './inspections-details.routing.module';

import { InspectionsDetailsPage } from './inspections-details.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StepperModule } from '@sections/housing/stepper/stepper.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';

const imports = [CommonModule,FormsModule , CommonModule, IonicModule, ReactiveFormsModule,InspectionsDetailsRoutingModule,StepperModule,StTextareaFloatingLabelModule];
const declarations = [InspectionsDetailsPage];

@NgModule({
  imports,
  declarations
})
export class InspectionsDetailsPageModule {}
