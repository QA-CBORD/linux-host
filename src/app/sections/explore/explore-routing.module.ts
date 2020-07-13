import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ExploreComponent } from '@sections/explore/explore.component';
import { MerchantResolverService } from '@sections/explore/resolvers/merchant-resolver.service';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { MerchantDetailsResolverService } from '@sections/explore/resolvers/merchant-details-resolver.service';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ExploreComponent,
    resolve: { merchant: MerchantResolverService },
  },
  {
    path: `${EXPLORE_ROUTING.merchantDetails}/:id`,
    loadChildren: './pages/merchant-details/merchant-details.module#MerchantDetailsPageModule',
    resolve: { data: MerchantDetailsResolverService },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ExploreRoutingModule {
}
