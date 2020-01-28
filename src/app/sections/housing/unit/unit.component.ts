import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Unit } from './unit.model';

@Component({
  selector: 'st-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitComponent {
  @Input() unit: Unit;
}
