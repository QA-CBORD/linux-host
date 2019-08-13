import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { RequestFundsRoutingModule } from './request-funds.routing.module';
import { RequestFundsPageComponent } from './request-funds-page.component';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [RequestFundsPageComponent];
const imports = [CommonModule, SharedModule, RequestFundsRoutingModule, IonicModule, ReactiveFormsModule];

@NgModule({
  declarations,
  imports,
})
export class RequestFundsModule {}
