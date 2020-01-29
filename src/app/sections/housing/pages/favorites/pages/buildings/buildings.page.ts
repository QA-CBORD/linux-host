import { Component, ChangeDetectionStrategy } from '@angular/core';

import { generateBuildings } from '@sections/housing/building/building.mock';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings = [];
}
