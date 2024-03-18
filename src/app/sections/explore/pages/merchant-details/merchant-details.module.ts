import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantDetailsPage } from './merchant-details.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MerchantDetailsRouterModule } from '@sections/explore/pages/merchant-details/merchant-details-router.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { MerchantMainInfoModule } from '@shared/ui-components/merchant-main-info/merchant-main-info.module';
import { MapsUriPipeModule } from '@shared/pipes/maps-uri/maps-uri-pipe.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StHeaderModule,
    MerchantDetailsRouterModule,
    MerchantMainInfoModule,
    StButtonModule,
    AddressHeaderFormatPipeModule,
    MapsUriPipeModule,
    TranslateModule
  ],
  declarations: [MerchantDetailsPage]
})
export class MerchantDetailsPageModule {}
