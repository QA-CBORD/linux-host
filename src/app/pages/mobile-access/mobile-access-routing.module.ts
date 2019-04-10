import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileAccessPage } from './mobile-access.page';
import { LocationsResolverGuard } from './locations.resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: MobileAccessPage,
    resolve: { coords: LocationsResolverGuard }
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MobileAccessRoutingModule {}
