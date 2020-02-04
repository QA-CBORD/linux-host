import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ScanCardComponent } from './scan-card.component';
import { ScanCardResolverService } from '@sections/dashboard/containers/scan-card/scan-card-resolver.service';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ScanCardComponent,
    resolve: { data: ScanCardResolverService },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class ScanCardRoutingModule {
}
