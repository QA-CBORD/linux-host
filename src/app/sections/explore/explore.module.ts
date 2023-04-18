import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from '@sections/explore/explore-routing.module';
import { ExploreComponent } from '@sections/explore/explore.component';
import { MerchantResolverService } from '@sections/explore/resolvers/merchant-resolver.service';
import { MerchantListComponent } from '@sections/explore/components/merchant-list/merchant-list.component';
import { MerchantCardComponent } from '@sections/explore/components/merchant-list/merchant-card/merchant-card.component';
import { IonicModule } from '@ionic/angular';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MerchantMainInfoModule } from '@shared/ui-components/merchant-main-info/merchant-main-info.module';
import { MerchantDetailsResolverService } from '@sections/explore/resolvers/merchant-details-resolver.service';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';
import { StHeaderSearchBarModule } from '@shared/ui-components/st-header-search-bar/st-header-search-bar.module';

@NgModule({
  declarations: [
    ExploreComponent,
    MerchantListComponent,
    MerchantCardComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    IonicModule,
    StHeaderModule,
    MerchantMainInfoModule,
    SearchPipeModule,
    StHeaderSearchBarModule
  ],
  providers: [MerchantResolverService, MerchantDetailsResolverService],
})
export class ExploreModule {
}
