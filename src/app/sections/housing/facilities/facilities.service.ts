import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { generateFacilities } from './facilities.mock';

import { Facility } from './facilities.model';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  facilities: Facility[] = generateFacilities(4);

  getFacilities(applicationId: number): Observable<Facility[]> {
    return of(this.facilities).pipe(map((facilities: Facility[]) => facilities.map(this._toModel)));
  }

  private _toModel(facility: Facility): Facility {
    return new Facility(
      facility.facilityName,
      facility.facilityId,
      facility.bedCount,
      facility.bathCount,
      facility.floors,
      facility.builtYear,
      facility.campus,
      facility.parking,
      facility.availableUnits
    );
  }
}
