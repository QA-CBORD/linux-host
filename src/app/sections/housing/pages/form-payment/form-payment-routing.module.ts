import { NgModule } from '@angular/core';
import { FormPaymentComponent } from './form-payment.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: FormPaymentComponent }];
const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class FormPaymentRoutingModule { }