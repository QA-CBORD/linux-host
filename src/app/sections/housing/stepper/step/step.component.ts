import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-step',
  templateUrl: './step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements OnInit, OnDestroy {
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

  @Input() stepControl: FormGroup;

  @Input() label: string;

  @Output() stepChanged = new EventEmitter<Event>();

  private sub: Subscription;

  interacted = false;

  ngOnInit(): void {
    this.sub = this.stepControl.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.stepChanged.emit();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get completed(): boolean {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
}
