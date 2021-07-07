import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaitingListsDetailsPage } from './waiting-lists-details.page';

const routes: Routes = [{ path: '', component: WaitingListsDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class WaitingListsDetailsRoutingModule {}
