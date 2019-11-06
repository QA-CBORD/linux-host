import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionReorder, QuestionReorderValue } from '../types/question-reorder';

@Component({
  selector: 'st-facility-picker',
  templateUrl: './facility-picker.component.html',
})
export class FacilityPickerComponent implements OnInit, OnDestroy {
  @Input() question: QuestionReorder;

  @Input() parentForm: FormGroup;

  facilities: QuestionReorderValue[];

  private _subscription: Subscription;

  ngOnInit(): void {
    const facilitiesControl: AbstractControl = this.parentForm.get(this.question.name);

    this._subscription = facilitiesControl.valueChanges.subscribe((value: QuestionReorderValue[]) => {
      this.facilities = value;
    });

    this.facilities = facilitiesControl.value;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  doReorder(reorderEvent: CustomEvent): void {
    this.facilities = reorderEvent.detail.complete(this.facilities);
    this.parentForm.get(this.question.name).patchValue(this.facilities);
  }

  trackByValue(_: number, facility: QuestionReorderValue): string {
    return facility.value;
  }
}
