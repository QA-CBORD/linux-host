import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDonationsComponent } from './meal-donations.component';
import { MealDonationsResolver } from './resolver/meal-donations.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MealDonationsComponent,
    resolve: { data: MealDonationsResolver },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class MealDonationsRoutingModule {}
