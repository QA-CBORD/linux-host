import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionsDetailsPage } from './inspections-details.page';

const routes: Routes = [{ path: '', component: InspectionsDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports,
})
export class InspectionsDetailsRoutingModule {}