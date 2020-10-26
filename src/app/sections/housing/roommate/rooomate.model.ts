import { Attribute } from '@sections/housing/attributes/attributes.model';

export class FacilityOccupantDetails {

  constructor(
    public patronKey: number,
    public name: string,
    public attributes: Attribute[] = null
              ) {}
}
