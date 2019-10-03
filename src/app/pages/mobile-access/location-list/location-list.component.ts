import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MMobileLocationInfo } from '../model';
import { MobileAccessService } from '../service';
import { CONTENT_STRINGS } from '../mobile-acces.config';

@Component({
  selector: 'st-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent implements OnInit {
  @Input('locations') locations: MMobileLocationInfo[];
  @Output('favouriteTrigger') favouriteTrigger: EventEmitter<string> = new EventEmitter<string>();
  contentString: { [key: string]: string };

  constructor(private mobileAccessService: MobileAccessService) {}

  ngOnInit() {
    this.setContentStrings();
  }

  trackByLocationId(index: number, { locationId }: MMobileLocationInfo): string {
    return locationId;
  }

  favouriteHandler(event: string) {
    this.favouriteTrigger.emit(event);
  }

  private setContentStrings() {
    const noLocationsFound = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.noLocationsFound);

    this.contentString = { noLocationsFound };
  }
}
