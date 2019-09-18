import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitsList } from '../Models/units-list';
import { UnitslistService } from '../services/unitslist.service';


@Component({
  selector: 'app-units-view',
  templateUrl: './units-view.page.html',
  styleUrls: ['./units-view.page.scss'],
})
export class UnitsViewPage implements OnInit {

  facilityId: number;
  unitsList: UnitsList[];
  constructor(private activatedRoute: ActivatedRoute,
              private ucs: UnitslistService) { }

  ngOnInit() {
    this.facilityId = parseInt(this.activatedRoute.snapshot.paramMap.get('facilityId'), 10);
    this.unitsList = this.ucs.GetUnitsListForFacility(this.facilityId);
  }

}
