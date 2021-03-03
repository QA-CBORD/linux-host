import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-button',
  templateUrl: './st-button.component.html',
  styleUrls: ['./st-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StButtonComponent {
  @Input() buttonModifier: string = '';
  @Input() type: string = 'button';
  // TODO: Refactor areas that expect the button to emit even when disabled.
  @Input() isDisabled: boolean = false;
  @Input() disabled: boolean = false;
  @Input() expand: string = 'block';
  @Input() fill: string = 'solid';
  @Input() color: string = 'primary';
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }
}
