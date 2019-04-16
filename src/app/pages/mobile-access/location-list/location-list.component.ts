import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MMobileLocationInfo } from '../model/mobile-access.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {
  @Input('locations') locations: MMobileLocationInfo[];
  @Output('favouriteTrigger') favouriteTrigger: EventEmitter<string> = new EventEmitter<string>();

  locationId(index: number, { locationId }: MMobileLocationInfo): string {
    return locationId;
  }

  favouriteHandler(event: string) {
    this.favouriteTrigger.emit(event);
  }
}
