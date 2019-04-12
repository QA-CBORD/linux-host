import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileAccessPage } from './mobile-access.page';
import { LocationsResolverGuard } from './locations.resolver.guard';
import { ActivateLocationComponent } from './activate-location/activate-location.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'activate/15831',
    component: MobileAccessPage,
    resolve: { coords: LocationsResolverGuard },
  },
  {
    path: 'activate/:id',
    component: ActivateLocationComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MobileAccessRoutingModule {}
