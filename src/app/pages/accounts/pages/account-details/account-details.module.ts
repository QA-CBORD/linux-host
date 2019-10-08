import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details.routing.module';
import { AccountsSharedModule } from '../../shared/shared.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const declarations = [AccountDetailsComponent];
const imports = [
  CommonModule,
  AccountDetailsRoutingModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  AccountsSharedModule,
  StHeaderModule,
];

@NgModule({
  declarations,
  imports,
})
export class AccountDetailsModule {}
