import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositPageComponent } from './deposit-page.component';
import { DepositResolver } from './resolvers/deposit.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DepositPageComponent,
    resolve: {
      data: DepositResolver,
    },
  },
];

const imports = [RouterModule.forChild(routes)];

@NgModule({ imports, exports: [RouterModule] })
export class DepositRoutingModule {}
