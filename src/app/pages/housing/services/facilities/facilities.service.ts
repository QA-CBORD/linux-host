import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Facility } from '../../models/facilities.model';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  constructor() {}

  getFacilities(applicationId: number): Observable<Facility[]> {
    // make api service call to RC to get the facility list associated with this application ID.
    const json = `[
      {
        "facilityName":"Gryffindor",
        "facilityId":"1",
        "bedCount":"1-4",
        "bathCount":"Communal",
        "floors":"7",
        "builtYear":"1997",
        "campus":"North",
        "parking":"Whomping Willow",
        "availableUnits":"50"
      },
      {
        "facilityName":"Hufflepuff",
        "facilityId":"2",
        "bedCount":"1-8",
        "bathCount":"Communal",
        "floors":"2",
        "builtYear":"1997",
        "campus":"East",
        "parking":"East",
        "availableUnits":"40"
      },
      {
        "facilityName":"Ravenclaw",
        "facilityId":"3",
        "bedCount":"1-8",
        "bathCount":"Communal",
        "floors":"5",
        "builtYear":"1997",
        "campus":"West",
        "parking":"West",
        "availableUnits":"50"
      },
      {
        "facilityName":"Slytherin",
        "facilityId":"4",
        "bedCount":"1-2",
        "bathCount":"1-2",
        "floors":"1",
        "builtYear":"1997",
        "campus":"South",
        "parking":"Lakeside",
        "availableUnits":"30"
      }
    ]`;

    return of(this._toModel(json));
  }

  private _toModel(jsonString: string): Facility[] {
    return JSON.parse(jsonString).map(
      (facility: Facility) =>
        new Facility(
          facility.facilityName,
          facility.facilityId,
          null,
          null,
          facility.bedCount,
          facility.bathCount,
          facility.floors,
          facility.builtYear,
          facility.campus,
          facility.parking,
          facility.availableUnits
        )
    );
  }
}
