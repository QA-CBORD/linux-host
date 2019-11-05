import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UnitsService } from '../../units/units.service';

import { Unit } from '../../units/units.model';

@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute, private _unitsService: UnitsService) {}

  units: Unit[];

  ngOnInit() {
    const facilityId = parseInt(this._route.snapshot.paramMap.get('facilityId'), 10);

    this._unitsService.getUnits(facilityId).subscribe((units: Unit[]) => (this.units = units));
  }
}
