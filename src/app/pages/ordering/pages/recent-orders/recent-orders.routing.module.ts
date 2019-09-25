import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentOrdersComponent } from './recent-orders.component';

const routes: Routes = [
  {
    path: '',
    component: RecentOrdersComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RecentOrdersRoutingModule {}
