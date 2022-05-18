import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StSuccesSummaryComponent } from './st-success-summary.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StButtonModule } from '../st-button';

const declarations = [StSuccesSummaryComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TypeMessageModule,
    ModifyPrepTimeModule,
    AddressHeaderFormatPipeModule,
    PriceUnitsResolverModule,
    StButtonModule
  ],
  exports: declarations
})
export class StSuccesSummaryModule { }
