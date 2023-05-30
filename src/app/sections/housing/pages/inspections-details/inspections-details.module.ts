import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InspectionsDetailsRoutingModule } from './inspections-details.routing.module';

import { InspectionsDetailsPage } from './inspections-details.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StepperModule } from '@sections/housing/stepper/stepper.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { HousingTabsComponentModule } from '../housing-dashboard/housing-tabs/housing-tabs.module';
import { StFormsHeaderModule } from '@sections/housing/st-forms-header/st-forms-header.module';
import { StInputFloatingLabelModule } from "../../../../shared/ui-components/st-input-floating-label/st-input-floating-label.module";

const imports = [
  CommonModule,
  FormsModule,
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  InspectionsDetailsRoutingModule,
  StepperModule,
  StTextareaFloatingLabelModule,
  HousingTabsComponentModule,
  StFormsHeaderModule,
  StInputFloatingLabelModule
];
const declarations = [InspectionsDetailsPage];

@NgModule({
    imports,
    declarations,
})
export class InspectionsDetailsPageModule {}
