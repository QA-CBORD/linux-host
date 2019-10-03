import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteMerchantsComponent } from './favorite-merchants.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteMerchantsComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class FavoriteMerchantsRoutingModule {}