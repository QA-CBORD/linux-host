import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { QuestionChargeSchedule } from '../questions/types';
import { ChargeScheduleValue } from './charge-schedules.model';

@Component({
  selector: 'st-charge-schedules',
  templateUrl: './charge-schedules.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeSchedulesComponent {
  @Input() question: QuestionChargeSchedule;

  trackByLabel(_: number, chargeScheduleValue: ChargeScheduleValue): string {
    return chargeScheduleValue.label;
  }
}
