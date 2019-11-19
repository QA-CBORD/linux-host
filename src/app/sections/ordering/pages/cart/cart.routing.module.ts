import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartResolver } from '@sections/ordering/resolvers/cart.resolver';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    resolve: {
      data: CartResolver
    }
  }
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];


@NgModule({
  imports,
  exports
})
export class CartRoutingModule { }
