import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DepositCsModel } from '../deposit-page.content.string';

@Component({
  selector: 'st-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAmountComponent {
  @Input() contentString: DepositCsModel;
  @Input() control: AbstractControl = new FormControl();
  @Output() onInput: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onKeyDown: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

  focusLine: boolean;

  ionInputEvent(event: Event) {
    this.onInput.emit(event);
  }

  keydownEvent(event: Event) {
    this.onKeyDown.emit(event);
  }

  onBlurEvent(event: Event) {
    this.onBlur.emit(event);
  }
}
