import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { QuestionReorder, QuestionReorderValue } from '../types/question-reorder';

@Component({
  selector: 'st-facility-picker',
  templateUrl: './facility-picker.component.html',
})
export class FacilityPickerComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input() question: QuestionReorder;

  @Input() parentForm: FormGroup;

  @Input() isDisabled = false;

  @Input() isRequired: boolean;

  facilities: QuestionReorderValue[];

  get subscription(){
    return this._subscription
  }

  ngOnInit(): void {
    const facilitiesControl: AbstractControl = this.parentForm.get(this.question.name);

    const valueChangesSubscription: Subscription = facilitiesControl.valueChanges.subscribe(
      (value: QuestionReorderValue[]) => {
        this.facilities = value;
      }
    );

    this._subscription.add(valueChangesSubscription);

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
