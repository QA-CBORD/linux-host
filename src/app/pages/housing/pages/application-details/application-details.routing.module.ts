import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationDetailsPage } from './application-details.page';

const imports = [RouterModule.forChild([{ path: '', component: ApplicationDetailsPage }])];
const exports = [RouterModule]

@NgModule({
  imports,
  exports
})
export class ApplicationDetailsRoutingModule {}
