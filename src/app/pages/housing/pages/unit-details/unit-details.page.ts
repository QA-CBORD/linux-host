import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitslistService } from '../../services/unitslist.service';
import { UnitsList } from '../../Models/units-list';

@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute, private ucs: UnitslistService) {}

  facilityId: number;

  unitsList: UnitsList[];

  ngOnInit() {
    this.facilityId = parseInt(this._route.snapshot.paramMap.get('facilityId'), 10);
    this.unitsList = this.ucs.GetUnitsListForFacility(this.facilityId);
  }
}
