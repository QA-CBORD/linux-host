import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuReceivingFundsComponent } from './menu-receiving-funds.component';
import { IconPathModule } from '../../pipes/icon-path/icon-path.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    IconPathModule,
  ],
  providers: [],
  declarations: [MenuReceivingFundsComponent],
  exports: [MenuReceivingFundsComponent],
})
export class MenuReceivingFundsModule {
}
