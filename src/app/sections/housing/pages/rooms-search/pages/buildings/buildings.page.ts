import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { generateBuildings } from '@sections/housing/building/building.mock';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings = generateBuildings();

  ngOnInit() {
    console.log('buildings loaded');
  }
}
