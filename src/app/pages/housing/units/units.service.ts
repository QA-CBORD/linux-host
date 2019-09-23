import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { generateUnits } from './units.mock';

import { Unit } from './units.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  units: Unit[] = generateUnits(4);

  getUnits(facilityId: number): Observable<Unit[]> {
    return of(this.units).pipe(map((units: Unit[]) => units.map(this._toModel)));
  }

  private _toModel(unit: Unit): Unit {
    return new Unit(unit.id, unit.name, unit.rate, unit.beds, unit.baths);
  }
}
