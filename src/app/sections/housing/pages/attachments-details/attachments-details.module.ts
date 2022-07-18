import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AttachmentsDetailsRoutingModule } from './attachments-details.routing.module';

import { AttachmentsDetailsPage } from './attachments-details.page';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsModule } from '@sections/housing/questions/questions.module';
import { StepperModule } from '@sections/housing/stepper/stepper.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { SuccessAttachmentModal } from './successful-attachment-modal/successful-attachment-modal.component';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

const imports = [CommonModule, IonicModule, FormsModule,AttachmentsDetailsRoutingModule,ReactiveFormsModule,QuestionsModule,StepperModule,StTextareaFloatingLabelModule,StButtonModule];
const declarations = [AttachmentsDetailsPage,SuccessAttachmentModal];
const entryComponents = [SuccessAttachmentModal]
const providers = [Chooser]
@NgModule({
  imports,
  declarations,
  entryComponents,
  providers,
})
export class AttachmentsDetailsPageModule {}
