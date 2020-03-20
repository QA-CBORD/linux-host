import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionChargeSchedule, QuestionChargeScheduleValue } from '../types';

@Component({
  selector: 'st-charge-schedule',
  templateUrl: './charge-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeScheduleComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input() question: QuestionChargeSchedule;

  @Input() parentForm: FormGroup;

  chargeSchedules: QuestionChargeScheduleValue[] = [];

  constructor(private _changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    const chargeSchedulesControl: AbstractControl = this.parentForm.get(this.question.name);

    const valueChangesSubscription: Subscription = chargeSchedulesControl.valueChanges.subscribe(
      (value: QuestionChargeScheduleValue[]) => {
        this.chargeSchedules = value;
        this._changeDetector.markForCheck();
      }
    );

    this._subscription.add(valueChangesSubscription);

    this.chargeSchedules = chargeSchedulesControl.value;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  trackByValue(_: number, chargeSchedule: QuestionChargeScheduleValue): string {
    return chargeSchedule.value;
  }
}
