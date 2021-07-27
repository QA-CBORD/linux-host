import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPendingComponent } from './components/check-in-pending/check-in-pending.component';
import { ScanCodeComponent } from './components/scan-code/scan-code.component';
import { CheckInFailureComponent } from './components/check-in-failure/check-in-failure.component';

const declarations = [CheckInPendingComponent, ScanCodeComponent, CheckInFailureComponent, CheckInFailureComponent];

@NgModule({
  declarations,
  entryComponents: declarations,
  
  imports: [CommonModule],
})
export class CheckInModule {

}
