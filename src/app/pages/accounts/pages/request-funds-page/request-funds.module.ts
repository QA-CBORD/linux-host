import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RequestFundsRoutingModule } from './request-funds.routing.module';
import { RequestFundsPageComponent } from './request-funds-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsSharedModule } from '../../shared/shared.module';
import { SharedModule } from '../../../../shared/shared.module';
import { PopoverComponent } from './popover/popover.component';

const declarations = [RequestFundsPageComponent, PopoverComponent];
const imports = [
  CommonModule,
  AccountsSharedModule,
  SharedModule,
  RequestFundsRoutingModule,
  IonicModule,
  ReactiveFormsModule,
];
const entryComponents = [PopoverComponent];
@NgModule({
  declarations,
  imports,
  entryComponents,
})
export class RequestFundsModule {}
