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
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanCardRoutingModule {}
