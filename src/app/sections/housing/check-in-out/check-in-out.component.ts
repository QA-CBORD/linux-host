import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CheckInOutStateService } from './check-in-out-state.service';

@Component({
  selector: 'st-check-in-out',
  templateUrl: './check-in-out.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent {

  constructor(
    public checkInOutStateService: CheckInOutStateService
  ) {}
}
