import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MerchantDetailsPage } from '@sections/explore/pages/merchant-details/merchant-details.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantDetailsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MerchantDetailsRouterModule {
}
