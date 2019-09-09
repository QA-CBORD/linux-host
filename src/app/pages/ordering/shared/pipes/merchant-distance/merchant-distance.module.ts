import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDistancePipe } from './merchant-distance.pipe';

const declarations = [MerchantDistancePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class MerchantDistanceModule { }
