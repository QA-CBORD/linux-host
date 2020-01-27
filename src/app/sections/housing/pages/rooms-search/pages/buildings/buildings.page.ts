import { Component, ChangeDetectionStrategy } from '@angular/core';

import { generateBuildings } from './building/building.mock';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings = generateBuildings();
}
