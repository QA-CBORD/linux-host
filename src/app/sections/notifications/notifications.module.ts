import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notification.component';
import { IonicModule } from '@ionic/angular';
import { NotificationsRoutingModule } from './notifications.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, IonicModule, NotificationsRoutingModule, StHeaderModule],
})
export class NotificationsModule {}
