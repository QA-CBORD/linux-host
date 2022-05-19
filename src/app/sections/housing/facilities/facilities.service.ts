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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFacilities(applicationKey: number): Observable<Facility[]> {
    return of(this.facilities).pipe(map((facilities: Facility[]) => facilities.map(FacilitiesService._toModel)));
  }

  private static _toModel(facility: Facility): Facility {
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
