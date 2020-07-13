import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDistancePipe } from '@shared/pipes/merchant-distance/merchant-distance.pipe';

const declarations = [MerchantDistancePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: [
    declarations,
    MerchantDistancePipe,
  ],
})
export class MerchantDistanceModule { }
