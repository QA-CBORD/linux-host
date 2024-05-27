import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartResolver } from '@sections/ordering/resolvers/cart.resolver';
import { CART_ROUTES } from './cart-config';
import { NonCheckingSuccessComponent } from './components/non-checking-success/non-checking-success.component';
import { OrderingResolver } from '@sections/ordering/resolvers';

const routes: Routes = [
  {
    path: '',
    redirectTo: CART_ROUTES.cart,
    pathMatch: 'full',
  },
  {
    path: CART_ROUTES.cart,
    component: CartComponent,
    resolve: {
      data: CartResolver,
      ordering: OrderingResolver,
    },
  },
  {
    path: CART_ROUTES.success,
    component: NonCheckingSuccessComponent,
  },
];

const imports = [RouterModule.forChild(routes)];

@NgModule({
  imports,
})
export class CartRoutingModule {}
