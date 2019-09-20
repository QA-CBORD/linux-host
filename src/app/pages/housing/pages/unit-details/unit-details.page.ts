import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitslistService } from '../../services/unitslist.service';
import { UnitsList } from '../../Models/units-list';

@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
})
export class UnitDetailsPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private ucs: UnitslistService) { }

  facilityId: number;
  unitsList: UnitsList[];

  ngOnInit() {
    this.facilityId = parseInt(this.activatedRoute.snapshot.paramMap.get('facilityId'), 10);
    this.unitsList = this.ucs.GetUnitsListForFacility(this.facilityId);
  }

}
