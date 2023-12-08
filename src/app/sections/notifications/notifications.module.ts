import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { IonicModule } from '@ionic/angular';
import { NotificationsRoutingModule } from './notifications.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { TimeBlockModule } from '@shared/pipes/time-block/time-block.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, IonicModule, NotificationsRoutingModule, StHeaderModule, TimeBlockModule],
})
export class NotificationsModule {}
