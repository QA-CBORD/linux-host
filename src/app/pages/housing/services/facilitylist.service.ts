import { Injectable } from '@angular/core';
import { FacilitiesList } from '../Models/facilities-list';

@Injectable({
  providedIn: 'root'
})
export class FacilitylistService {

  constructor() { }

  GetFacilityListForApplication(applicationId: number) {
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
    return this.ConvertJSONStringToModelObjects(json);
  }

  private ConvertJSONStringToModelObjects(jsonString: string): FacilitiesList[] {
    const facilitiesList: FacilitiesList[] = [];
    const obj = JSON.parse(jsonString);
    obj.map (fac => {
      facilitiesList.push(
        new FacilitiesList(fac.facilityName,
                           fac.facilityId,
                           fac.bedCount,
                           fac.bathCount,
                           fac.floors,
                           fac.builtYear,
                           fac.campus,
                           fac.parking,
                           fac.availableUnits));
    });
    return facilitiesList;
  }
}
