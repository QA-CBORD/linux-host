import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'st-step',
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  @ViewChild(TemplateRef) content: TemplateRef<any>;

  @Input() stepControl: AbstractControl;

  @Input() label: string;

  interacted = false;

  get completed(): boolean {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }

  reset(): void {
    if (this.stepControl) {
      this.stepControl.reset();
    }
  }
}
