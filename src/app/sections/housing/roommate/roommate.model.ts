import { OccupantAttribute } from '@sections/housing/attributes/attributes.model';

interface FacilityOccupantDetailsOptions {
  patronKey: number;
  name: string;
  patronAttributes: OccupantAttribute[];
}


export class FacilityOccupantDetails {
  public patronKey: number;
  public attributes: OccupantAttribute[] = null;

  constructor(options) {
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
  roommates: RoommateDetails[];
}

export class RoommateResponse implements RoommateResponseOptions {
  roommates: RoommateDetails[];

  constructor(options) {
    if(options == null || !Array.isArray(options)) {
      options = [] as RoommateResponseOptions[];
    }
    this.roommates = Array.isArray(options)
      ? options.map(x => new RoommateDetails(x))
      : [];
  }
}

export interface RoommateDetailsOptions {
  patronKey: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  preferredName: string;
}

export class RoommateDetails implements RoommateDetailsOptions {
  patronKey: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  preferredName: string;

  constructor(options: RoommateDetailsOptions) {
    if(options == null || !(options instanceof Object)) {
      options = {} as RoommateDetailsOptions;
    }

    this.patronKey = Number(options.patronKey);
    this.firstName = String(options.firstName);
    this.middleName = String(options.middleName);
    this.lastName = String(options.lastName);
    this.birthDate = options.birthDate && new Date(options.birthDate);
    this.preferredName = String(options.preferredName);
  }
}
