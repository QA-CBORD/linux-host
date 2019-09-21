import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FacilitylistService } from '../../services/facilitylist.service';

import { FacilitiesList } from '../../Models/facilities-list';

@Component({
  selector: 'st-facility-details',
  templateUrl: './facility-details.page.html',
  styleUrls: ['./facility-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityDetailsPage implements OnInit {
  applicationId: number;
  facilitiesList: FacilitiesList[];
  constructor(private activatedRoute: ActivatedRoute, private facilityListService: FacilitylistService) {}

  ngOnInit() {
    this.applicationId = parseInt(this.activatedRoute.snapshot.paramMap.get('applicationId'), 10);
    this.facilitiesList = this.facilityListService.GetFacilityListForApplication(this.applicationId);
  }

  OpenDetails(fac: FacilitiesList) {
    fac.isExpanded = !fac.isExpanded;
    fac.iconName = fac.isExpanded ? 'arrow-up' : 'arrow-down';
  }
}
