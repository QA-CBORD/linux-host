import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RequestFundsRoutingModule } from './request-funds.routing.module';
import { RequestFundsPageComponent } from './request-funds-page.component';
import { PopoverComponent } from './popover/popover.component';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { RequestFundsResolver } from './resolvers/request-funds.resolver';

const declarations = [RequestFundsPageComponent, PopoverComponent];
const imports = [
  CommonModule,
  ReactiveFormsModule,
  StTextareaFloatingLabelModule,
  StInputFloatingLabelModule,
  StSelectFloatingLabelModule,
  RequestFundsRoutingModule,
  StPopoverLayoutModule,
  StHeaderModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  ReactiveFormsModule,
  TransactionUnitsPipeModule,
  StButtonModule,
  FocusNextModule,
];
const providers = [RequestFundsResolver];
@NgModule({
  declarations,
  imports,
  providers
})
export class RequestFundsModule {}
