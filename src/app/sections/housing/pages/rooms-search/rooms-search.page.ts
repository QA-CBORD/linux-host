import { Component, ChangeDetectionStrategy } from '@angular/core';

import { generateBuildings } from '../../building/building.mock';

@Component({
  selector: 'st-rooms-search',
  templateUrl: './rooms-search.page.html',
  styleUrls: ['./rooms-search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsSearchPage {
  buildings = generateBuildings();
}
