import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  }
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];


@NgModule({
  imports,
  exports
})
export class CartRoutingModule { }
