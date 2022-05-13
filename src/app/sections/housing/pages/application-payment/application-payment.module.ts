import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuestionsModule } from '../../questions/questions.module';
import { StepperModule } from '../../stepper/stepper.module';
import { ApplicationPaymentComponent } from './application-payment.component';
import { CreditCardModule } from '@sections/settings/creditCards/credit-card.module';
import { CreditCardMgmtComponent } from '@sections/settings/creditCards/credit-card-mgmt/credit-card-mgmt.component';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  QuestionsModule,
  StepperModule,
];
const declarations = [ApplicationPaymentComponent];
const entryComponents = [ApplicationPaymentComponent];
@NgModule({
  imports,
  declarations,
  entryComponents
})
export class ApplicationPaymentModule {}
