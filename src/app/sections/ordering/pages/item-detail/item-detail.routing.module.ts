import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './item-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailComponent,
    // resolve: {
    //   data: FavoriteMerhantsResolver,
    // },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class ItemDetailRoutingModule { }