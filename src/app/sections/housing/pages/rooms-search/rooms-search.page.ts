import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Unit } from '../../units-switch/units-switch.model';

@Component({
  selector: 'st-rooms-search',
  templateUrl: './rooms-search.page.html',
  styleUrls: ['./rooms-search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsSearchPage {
  units: Unit[] = [
    new Unit('/housing/rooms-search/buildings', 'Buildings'),
    new Unit('/housing/rooms-search/units', 'Units'),
  ];
}
