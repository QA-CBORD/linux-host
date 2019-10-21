import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentOrdersComponent,  } from '@sections/ordering/pages';
import { RecentOrderComponent } from '@sections/ordering/pages/';

const routes: Routes = [
  {
    path: '',
    component: RecentOrdersComponent,
  }, {
    path: ':id',
    component: RecentOrderComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RecentOrdersRoutingModule {}
