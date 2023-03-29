import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentsDetailsPage } from './attachments-details.page';

const routes: Routes = [{ path: '', component: AttachmentsDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class AttachmentsDetailsRoutingModule {}
