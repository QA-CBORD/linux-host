import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FacilitiesService } from '../../services/facilities/facilities.service';

import { Facility } from '../../models/facilities.model';

@Component({
  selector: 'st-facility-details',
  templateUrl: './facility-details.page.html',
  styleUrls: ['./facility-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute, private _facilitiesService: FacilitiesService) {}

  applicationId: number;

  facilities: Facility[];

  ngOnInit() {
    this.applicationId = parseInt(this._route.snapshot.paramMap.get('applicationId'), 10);

    this._facilitiesService
      .getFacilities(this.applicationId)
      .subscribe((facilities: Facility[]) => (this.facilities = facilities));
  }

  toggle(facility: Facility) {
    facility.isExpanded = !facility.isExpanded;
    facility.iconName = facility.isExpanded ? 'arrow-up' : 'arrow-down';
  }

  trackById(_: number, facility: Facility): number {
    return facility.facilityId;
  }
}
