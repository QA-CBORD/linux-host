import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';

const routes: Route[] = [
  {
    path: '',
    component: NotificationsComponent,
  },
];
const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class NotificationsRoutingModule {}
