import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-units',
  templateUrl: './units.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsPage {
  units = [];
}
