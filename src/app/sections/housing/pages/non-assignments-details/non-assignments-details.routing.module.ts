import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NonAssignmentsDetailsPage } from './non-assignments-details.page';

const routes: Routes = [{ path: '', component: NonAssignmentsDetailsPage }];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({
  imports,
  exports
})
export class NonAssignmentsDetailsRoutingModule { }
