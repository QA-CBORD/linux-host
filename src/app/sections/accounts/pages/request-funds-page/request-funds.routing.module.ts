import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestFundsPageComponent } from './request-funds-page.component';
import { RequestFundsResolver } from './resolvers/request-funds.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RequestFundsPageComponent,
    resolve: {
      data: RequestFundsResolver,
    },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RequestFundsRoutingModule {}
