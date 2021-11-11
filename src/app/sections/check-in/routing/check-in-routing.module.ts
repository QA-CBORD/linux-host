import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHECKIN_ROUTES } from '../check-in-config';
import { CheckInPendingComponent } from '../components/check-in-pending/check-in-pending.component';
import { CheckInSuccessComponent } from '../components/check-in-success/check-in-success.component';
import { ScanCodeBackground } from '../components/scan-code/background/scan-code-background.component';
import { CheckinPendingResolver } from '../resolver/check-in-pending.resolver';
import { CheckinSuccessResolver } from '../resolver/check-in-success-resolver.component';

const routes: Routes = [
  { path: CHECKIN_ROUTES.pending, component: CheckInPendingComponent, resolve: { data: CheckinPendingResolver } },
  { path: CHECKIN_ROUTES.success, component: CheckInSuccessComponent, resolve: { data: CheckinSuccessResolver } },
  { path: CHECKIN_ROUTES.scanCodeBackground, component: ScanCodeBackground },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CheckinRoutingModule {}
