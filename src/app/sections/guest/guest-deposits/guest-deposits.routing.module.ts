import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IdentifyRecipientComponent } from './components/identify-recipient/identify-recipient.component';

const routes: Route[] = [
  {
    path: '',
    component: IdentifyRecipientComponent
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class GuestDepositsRoutingModule {}
