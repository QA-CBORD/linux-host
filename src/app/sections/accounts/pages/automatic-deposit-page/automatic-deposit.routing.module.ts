import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticDepositPageComponent } from './automatic-deposit-page.component';
import { AutomaticDepositResolver } from './resolver/automatic-deposit.resolver';
import { UnsavedChangesGuard } from '@sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AutomaticDepositPageComponent,
    resolve: { data: AutomaticDepositResolver },
    canDeactivate: [UnsavedChangesGuard]
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class AutomaticDepositRoutingModule {}
