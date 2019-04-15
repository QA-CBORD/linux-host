import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { MMobileLocationInfo } from '../model/mobile-access.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent implements OnInit {
  @Input('locations') locations: MMobileLocationInfo[];

  constructor() {}

  ngOnInit() {}

  favTrigger($event: string) {}

  locationId(location) {
    console.log(location);
  }
}
