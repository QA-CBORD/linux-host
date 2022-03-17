import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-step',
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

  @Input() stepControl: FormGroup;

  @Input() label: string;

  interacted = false;

  get completed(): boolean {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
}
