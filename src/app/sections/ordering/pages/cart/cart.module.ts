import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartRoutingModule } from '@sections/ordering/pages/cart/cart.routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
