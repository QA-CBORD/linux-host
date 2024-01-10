import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { notificationsResolver } from './resolvers/notifications.resolver';

const routes: Route[] = [
  {
    path: '',
    component: NotificationsComponent,
    resolve: { data: notificationsResolver },
  },
];
const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class NotificationsRoutingModule {}
