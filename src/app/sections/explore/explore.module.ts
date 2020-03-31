import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from '@sections/explore/explore-routing.module';
import { ExploreComponent } from '@sections/explore/explore.component';
import { MerchantResolverService } from '@sections/explore/resolvers/merchant-resolver.service';
import { MerchantListComponent } from '@sections/explore/components/merchant-list/merchant-list.component';
import { MerchantCardComponent } from '@sections/explore/components/merchant-list/merchant-card/merchant-card.component';
import { IonicModule } from '@ionic/angular';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { ExploreService } from '@sections/explore/services/explore.service';
import { MerchantMainInfoModule } from '@shared/ui-components/merchant-main-info/merchant-main-info.module';
import { MerchantDetailsResolverService } from '@sections/explore/resolvers/merchant-details-resolver.service';

@NgModule({
  declarations: [
    ExploreComponent,
    MerchantListComponent,
    MerchantCardComponent,
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    IonicModule,
    StHeaderModule,
    MerchantMainInfoModule,
  ],
  providers: [MerchantResolverService, ExploreService, MerchantDetailsResolverService],
})
export class ExploreModule {
}
