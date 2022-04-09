import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@sections/ordering/pages/cart/cart.component';
import { CartRoutingModule } from '@sections/ordering/pages/cart/cart.routing.module';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { NonCheckingSuccessComponent } from '@sections/ordering/pages/cart/components/non-checking-success/non-checking-success.component';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { ModalsService } from '@core/service/modals/modals.service';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { StSuccesSummaryModule } from '@shared/ui-components/success-summary/st-success-summary.module';

@NgModule({
  declarations: [CartComponent, NonCheckingSuccessComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    OrderDetailsModule,
    StHeaderModule,
    IonicModule,
    PriceUnitsResolverModule,
    StButtonModule,
    TypeMessageModule,
    AddressHeaderFormatPipeModule,
    ModifyPrepTimeModule,
    StSuccesSummaryModule
  ],
   providers: [ModalsService]
})
export class CartModule { }
