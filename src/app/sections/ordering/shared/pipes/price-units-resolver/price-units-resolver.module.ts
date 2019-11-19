import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PriceUnitsResolverPipe } from './price-units-resolver.pipe';

@NgModule({
  declarations: [PriceUnitsResolverPipe],
  exports: [
    PriceUnitsResolverPipe,
  ],
  imports: [
    CommonModule,
  ],
  providers: [CurrencyPipe]
})
export class PriceUnitsResolverModule { }
