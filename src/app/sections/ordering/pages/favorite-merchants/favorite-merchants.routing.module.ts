import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteMerchantsComponent } from '@sections/ordering/pages';
import { FavoriteMerchantsResolver } from './resolvers/favorite-merchants.resolver';

const routes: Routes = [
  {
    path: '',
    component: FavoriteMerchantsComponent,
    resolve: {
      data: FavoriteMerchantsResolver,
    },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class FavoriteMerchantsRoutingModule { }
