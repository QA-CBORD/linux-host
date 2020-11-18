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
