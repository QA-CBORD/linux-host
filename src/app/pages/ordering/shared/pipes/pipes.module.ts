import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantDistancePipe } from './merchant-distance.pipe';

const declarations = [MerchantDistancePipe];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
  providers: [],
})
export class PipesModule {}
