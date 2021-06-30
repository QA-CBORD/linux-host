import { Attribute, OccupantAttribute } from '@sections/housing/attributes/attributes.model';

interface FacilityOccupantDetailsOptions {
  patronKey: number;
  name: string;
  patronAttributes: OccupantAttribute[];
}


export class FacilityOccupantDetails {
  public patronKey: number;
  public attributes: OccupantAttribute[] = null;

  constructor(options: any) {
    if(options == null || !(options instanceof Object)) {
      options = {} as FacilityOccupantDetailsOptions;
    }
    this.patronKey = options.patronKey;
    this.attributes = options.patronAttributes || [];
  }

  public hasAttribute(name: string): boolean {
    return !!this.attributes.filter(x => x.name === name);
  }

  public getAttributeValue(name: string): string {
    if (this.hasAttribute(name)) {
      const attribute = this.attributes.find(x => x.name === name)
      return attribute? attribute.value: "";
    }
  }

}

export interface RoommateResponseOptions {
  patronKey: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  preferredName: string;
}

export class RoommateResponse implements RoommateResponseOptions {
  patronKey: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  preferredName: string;

  constructor(options: RoommateResponseOptions) {
    if(options == null || !(options instanceof Object)) {
      options = {} as RoommateResponseOptions;
    }

    this.patronKey = Number(options.patronKey);
    this.firstName = String(options.firstName);
    this.middleName = String(options.middleName);
    this.lastName = String(options.lastName);
    this.birthDate = new Date(options.birthDate);
    this.preferredName = String(options.preferredName);
  }
}
