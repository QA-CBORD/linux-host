import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestFundsPageComponent } from './request-funds-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RequestFundsPageComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RequestFundsRoutingModule {}
