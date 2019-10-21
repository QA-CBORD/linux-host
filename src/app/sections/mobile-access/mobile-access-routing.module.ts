import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MobileAccessPage } from './mobile-access.page';
import { LocationsResolverGuard } from './resolvers';
import { ActivateLocationComponent } from './activate-location';
import { LOCAL_ROUTING } from './mobile-acces.config';

const routes: Routes = [
  {
    path: '',
    component: MobileAccessPage,
    resolve: { coords: LocationsResolverGuard },
    data: { preload: true },
  },
  {
    path: `${LOCAL_ROUTING.activate}/:id`,
    component: ActivateLocationComponent,
    data: { preload: true },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MobileAccessRoutingModule {}
