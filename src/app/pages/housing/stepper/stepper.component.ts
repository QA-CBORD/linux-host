import { Component, ContentChildren, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { StepComponent } from './step/step.component';

export interface StepperSelectionEvent {
  selectedIndex: number;
  previouslySelectedIndex: number;
  selectedStep: StepComponent;
  previouslySelectedStep: StepComponent;
}

export const STEPS_LABELS = {
  1: 'Second',
  2: 'Third',
  3: 'Fourth',
  4: 'Fifth',
  5: 'Sixth',
  6: 'Seventh',
  7: 'Eighth',
  8: 'Ninth',
  9: 'Tenth'
};

@Component({
  selector: 'st-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

  @Input()
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    if (index < 0 || index > this.steps.length - 1) {
      throw Error('Cannot assign out-of-bounds value to `selectedIndex`.');
    }

    if (this._selectedIndex != index && !this._anyControlsInvalidOrPending(index)) {
      this._updateSelectedItemIndex(index);
    }
  }
  private _selectedIndex = 0;

  @Input()
  get selected(): StepComponent {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined!;
  }
  set selected(step: StepComponent) {
    this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
  }

  @Output() selectionChange: EventEmitter<StepperSelectionEvent> = new EventEmitter<StepperSelectionEvent>();

  constructor(private _changeDetector: ChangeDetectorRef) {}

  next(): void {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }

  back(): void {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  reset(): void {
    this._updateSelectedItemIndex(0);
    this.steps.forEach(step => step.reset());
    this._changeDetector.markForCheck();
  }

  getStepLabel(label: string, index: number): string {
    return label || STEPS_LABELS[index];
  }

  private _updateSelectedItemIndex(newIndex: number): void {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex],
    });

    this._selectedIndex = newIndex;
    this._changeDetector.markForCheck();
  }

  private _anyControlsInvalidOrPending(index: number): boolean {
    const steps = this.steps.toArray();

    steps[this._selectedIndex].interacted = true;

    return steps.slice(0, index).some(step => {
      const control = step.stepControl;

      return control ? control.invalid || control.pending || !step.interacted : !step.completed;
    });
  }
}
