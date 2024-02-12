import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { IonicModule } from '@ionic/angular';
import { NotificationsRoutingModule } from './notifications.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { NotificationComponent } from './notification/notification.component';
import { IconPathModule } from '@sections/accounts/shared/pipes/icon-path/icon-path.module';
import { StSpinnerModule } from '@shared/ui-components/st-spinner/st-spinner.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    IonicModule,
    NotificationsRoutingModule,
    StHeaderModule,
    IconPathModule,
    StSpinnerModule,
    TranslateModule,
    NotificationComponent
  ],
})
export class NotificationsModule {}
