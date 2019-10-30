import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartRoutingModule } from '@sections/ordering/pages/cart/cart.routing.module';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    OrderDetailsModule,
    StHeaderModule,
    IonicModule
  ]
})
export class CartModule { }
