import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCreditCardComponent } from './add-credit-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddCreditCardComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AddCreditCardRoutingModule { }
