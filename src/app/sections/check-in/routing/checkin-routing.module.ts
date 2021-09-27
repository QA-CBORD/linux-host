import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInSuccessComponent } from '../components/check-in-success/check-in-success.component';
import { CheckinSuccessResolver } from '../resolver/checkin-success-resolver.component';

const routes: Routes = [
  { path: 'success', component: CheckInSuccessComponent, resolve: { data: CheckinSuccessResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CheckinRoutingModule {}
