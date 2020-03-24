import { isDefined } from '@sections/housing/utils';
import { Attribute, AttributeOptions } from '@sections/housing/attributes/attributes.model';

export interface FacilityAttributeOptions extends AttributeOptions {
  facilityAttributeKey?: number;
  facilityKey?: number;
}

export class FacilityAttribute extends Attribute implements FacilityAttributeOptions {
  facilityAttributeKey?: number;
  facilityKey?: number;

  constructor(options: FacilityAttributeOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as FacilityAttributeOptions;
    }

    super(options);

    if (isDefined(options.facilityAttributeKey)) {
      this.facilityAttributeKey = Number(options.facilityAttributeKey);
    }

    if (isDefined(options.facilityKey)) {
      this.facilityKey = Number(options.facilityKey);
    }
  }
}
