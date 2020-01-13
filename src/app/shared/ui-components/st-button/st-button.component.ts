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
  @Input() isDisabled: boolean = false;
  @Input() expand: string = 'block';
  @Input() fill: string = 'solid';
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  onClickButton(event: Event) {
    this.isDisabled ? event.preventDefault() : this.onClick.emit(event);
  }
}
