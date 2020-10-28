import { Attribute, OccupantAttribute } from '@sections/housing/attributes/attributes.model';

interface FacilityOccupantDetailsOptions {
  patronKey: number;
  name: string;
  patronAttributes: OccupantAttribute[];
}


export class FacilityOccupantDetails {
  public patronKey: number;
  public name: string;
  public attributes: OccupantAttribute[] = null;

  constructor(options: any) {
    if(options == null || !(options instanceof Object)) {
      options = {} as FacilityOccupantDetailsOptions;
    }
    this.patronKey = options.patronKey;
    this.name = options.name;
    this.attributes = options.patronAttributes || [];
  }
}
