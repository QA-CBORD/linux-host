import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullMenuComponent } from './full-menu.component';

const routes: Routes = [
  {
    path: '',
    component: FullMenuComponent,
    // resolve: {
    //   data: FavoriteMerhantsResolver,
    // },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class FullMenuRoutingModule { }
