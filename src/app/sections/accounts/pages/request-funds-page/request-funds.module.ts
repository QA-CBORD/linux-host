import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RequestFundsRoutingModule } from './request-funds.routing.module';
import { RequestFundsPageComponent } from './request-funds-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsSharedModule } from '../../shared/shared.module';
import { PopoverComponent } from './popover/popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StSelectFloatingLabelModule } from '@shared/ui-components/st-select-floating-label/st-select-floating-label.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

const declarations = [RequestFundsPageComponent, PopoverComponent];
const imports = [
  CommonModule,
  AccountsSharedModule,
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
];
const entryComponents = [PopoverComponent];
@NgModule({
  declarations,
  imports: [
    imports,
    TransactionUnitsPipeModule,
  ],
  entryComponents,
})
export class RequestFundsModule {}
