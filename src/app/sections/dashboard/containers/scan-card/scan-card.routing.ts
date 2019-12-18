import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ScanCardComponent } from './scan-card.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ScanCardComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class ScanCardRoutingModule { }