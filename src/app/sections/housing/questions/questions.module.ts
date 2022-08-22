import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StDateSelectModule } from '@shared/ui-components/st-date-select/st-date-select.module';
import { ControlErrorsModule } from '@shared/ui-components/control-errors/control-errors.module';
import { RadioGroupModule } from '@shared/ui-components/radio-group/radio-group.module';
import { FacilityPickerModule } from './facility-picker/facility-picker.module';
import { ChargeSchedulesModule } from '../charge-schedules/charge-schedules.module';
import { SignContractModule } from '@sections/housing/sign-contract/sign-contract.module';
import { AssetTypeDetailsModule } from '../asset-type-details/asset-type-details.module';

import { QuestionComponent } from './question.component';
import { EmptyFormControlDirective } from '../empty-form-control/empty-form-control.directive';
import { StHierarcheTreeModule } from '@shared/ui-components/st-hierarchy-tree/st-hierarchy-tree.module';
import { StHierarcheTreeDialogModule } from '@shared/ui-components/st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.module';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  StInputFloatingLabelModule,
  StTextareaFloatingLabelModule,
  StSelectFloatingLabelModule,
  StDateSelectModule,
  ControlErrorsModule,
  RadioGroupModule,
  FacilityPickerModule,
  ChargeSchedulesModule,
  SignContractModule,
  AssetTypeDetailsModule,
  StHierarcheTreeModule,
  StHierarcheTreeDialogModule,
];
const exports = [QuestionComponent];
const declarations = [QuestionComponent, EmptyFormControlDirective];

@NgModule({
  imports,
  exports,
  declarations,
})
export class QuestionsModule {}
