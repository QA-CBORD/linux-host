import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileAccessPage } from './mobile-access.page';

const routes: Routes = [
  {
    path: '',
    component: MobileAccessPage,
    // resolve: { coords: }
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MobileAccessRoutingModule {}
