import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notification-list.component';
import { IonicModule } from '@ionic/angular';
import { NotificationsRoutingModule } from './notifications.routing.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, IonicModule, NotificationsRoutingModule],
})
export class NotificationsModule {}
