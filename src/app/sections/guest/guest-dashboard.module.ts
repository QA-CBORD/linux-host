import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestDashboard } from './dashboard/guest-dashboard.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { GuestDashboardResolver } from './services/guest-dashboard.resolver';
import { ConfirmDepositComponent } from './deposit/confirm-deposit/confirm-deposit.component';
import { SuccessPage } from './deposit/success-page/success-page.component';

@NgModule({
  declarations: [GuestDashboard, SuccessPage, ConfirmDepositComponent],
  imports: [
    CommonModule,
    IonicModule,
    StButtonModule,
    StHeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: GuestDashboard,
        resolve: {
          data: GuestDashboardResolver,
        }
      },
    ]),
  ],
})
export class GuestDashboardModule {}
