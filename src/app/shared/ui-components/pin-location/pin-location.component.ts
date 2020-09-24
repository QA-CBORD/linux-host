import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'st-pin-location',
  templateUrl: './pin-location.component.html',
  styleUrls: ['./pin-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinLocationComponent {
  @Output() pinned: EventEmitter<void> = new EventEmitter<void>();

  pinLocation(): void {
    this.pinned.emit();
  }
}
