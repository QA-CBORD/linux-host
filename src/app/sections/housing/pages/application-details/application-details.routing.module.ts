import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationDetailsPage } from './application-details.page';

const routes: Routes = [{ path: '', component: ApplicationDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class ApplicationDetailsRoutingModule {}
