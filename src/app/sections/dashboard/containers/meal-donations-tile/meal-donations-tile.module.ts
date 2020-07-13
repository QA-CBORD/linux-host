import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDonationsTileComponent } from './meal-donations-tile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MealDonationsTileComponent],
  exports: [MealDonationsTileComponent]
})
export class MealDonationsTileModule { }
