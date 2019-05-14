import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MMobileLocationInfo } from '../model';

@Component({
  selector: 'st-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {
  @Input() locations: MMobileLocationInfo[];
  @Output() favouriteTrigger: EventEmitter<string> = new EventEmitter<string>();

  trackByLocationId(index: number, { locationId }: MMobileLocationInfo): string {
    return locationId;
  }

  favouriteHandler(event: string) {
    this.favouriteTrigger.emit(event);
  }
}
