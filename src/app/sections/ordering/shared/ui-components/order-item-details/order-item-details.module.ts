import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemDetailsComponent } from './order-item-details.component';
import { PriceUnitsResolverModule } from '../../pipes/price-units-resolver/price-units-resolver.module';

@NgModule({
  declarations: [OrderItemDetailsComponent],
  exports: [OrderItemDetailsComponent],
  imports: [CommonModule, PriceUnitsResolverModule],
})
export class OrderItemDetailsModule {}
