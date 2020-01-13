import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartRoutingModule } from '@sections/ordering/pages/cart/cart.routing.module';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { SuccessModalComponent } from '@sections/ordering/pages/cart/components/success-modal/success-modal.component';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

@NgModule({
  declarations: [CartComponent, SuccessModalComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    OrderDetailsModule,
    StHeaderModule,
    IonicModule,
    PriceUnitsResolverModule,
    StButtonModule
  ],
   entryComponents: [SuccessModalComponent]
})
export class CartModule { }
