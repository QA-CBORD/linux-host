import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StAlertBannerComponent } from './st-alert-banner.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StAlertBannerComponent],
  exports: [StAlertBannerComponent],
  imports: [CommonModule, IonicModule],
})
export class StAlertBannerModule {}
