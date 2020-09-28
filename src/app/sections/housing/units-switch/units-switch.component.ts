import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Unit } from './units-switch.model';

@Component({
  selector: 'st-units-switch',
  templateUrl: './units-switch.component.html',
  styleUrls: ['./units-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsSwitchComponent {
  @Input() units: Unit[];
}
