import { Component, ChangeDetectionStrategy } from '@angular/core';

import { generateUnits } from '@sections/housing/unit/unit.mock';

@Component({
  selector: 'st-units',
  templateUrl: './units.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsPage {
  units = generateUnits(1);
}
