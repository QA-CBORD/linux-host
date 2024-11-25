import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-button',
  templateUrl: './st-button.component.html',
  styleUrls: ['./st-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StButtonComponent {
  @Input() buttonModifier = '';
  @Input() type = 'button';
  @Input() voiceOverText = '';
  // TODO: Refactor areas that expect the button to emit even when disabled.
  @Input() isDisabled = false;
  @Input() disabled = false;
  @Input() expand = 'block';
  @Input() fill = 'solid';
  @Input() color: string;
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClickButton(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

  get buttonColor(){
    return this.disabled ? "light" : this.color;
  }
}
