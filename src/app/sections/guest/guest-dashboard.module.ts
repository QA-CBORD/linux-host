import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestDashboard } from './dashboard/guest-dashboard.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { GuestDashboardResolver } from './services/guest-dashboard.resolver';
import { ProminentDisclosureService } from '@sections/dashboard/services/prominent-disclosure.service';
import { LocationPermissionModalModule } from '@sections/dashboard/components/location-disclosure/location-disclosure.module';
import { LocationPermissionModal } from '@sections/dashboard/components/location-disclosure/location-disclosure.component';

@NgModule({
  declarations: [GuestDashboard],
  imports: [
    CommonModule,
    IonicModule,
    StButtonModule,
    StHeaderModule,
    LocationPermissionModalModule,
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
  providers:[GuestDashboardResolver, ProminentDisclosureService],
  entryComponents:[LocationPermissionModal]
})
export class GuestDashboardModule {}
