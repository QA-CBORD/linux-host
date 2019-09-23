import { Injectable } from '@angular/core';
import { UnitsList } from '../models/units-list';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor() { }

  GetUnitsListForFacility(facilityId: number) {
    // make api service call to RC to get the facility list associated with this application ID.
    const json = `[
      {
        "id":"1",
        "name":"unit 1",
        "rate":"640/mo",
        "beds":"1",
        "baths":"0"
      },
      {
        "id":"2",
        "name":"unit 2",
        "rate":"600/mo",
        "beds":"1",
        "baths":"0"
      },
      {
        "id":"3",
        "name":"unit 3",
        "rate":"900/mo",
        "beds":"3",
        "baths":"1"
      },
      {
        "id":"4",
        "name":"unit 4",
        "rate":"750/mo",
        "beds":"2",
        "baths":"1"
      }
    ]`;
    return this.ConvertJSONStringToModelObjects(json);
  }

  private ConvertJSONStringToModelObjects(jsonString: string): UnitsList[] {
    const unitsList: UnitsList[] = [];
    const obj = JSON.parse(jsonString);
    obj.map (unit => {
      unitsList.push(
        new UnitsList(unit.id,
                      unit.name,
                      unit.rate,
                      unit.beds,
                      unit.baths));
    });
    return unitsList;
  }
}
