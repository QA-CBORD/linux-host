import { isDefined } from '@sections/housing/utils';

export class AttributeOptions {
  attributeConsumerKey: number;
  value: string;
  effectiveDate?: string;
  endDate?: string;
}

export class Attribute implements AttributeOptions {
  attributeConsumerKey: number;
  value: string;
  effectiveDate: string;
  endDate: string;

  constructor(options: AttributeOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as AttributeOptions;
    }

    this.attributeConsumerKey = Number(options.attributeConsumerKey);
    this.value = String(options.value);

    if (isDefined(options.effectiveDate)) {
      this.effectiveDate = String(options.effectiveDate);
    }

    if (isDefined(options.endDate)) {
      this.endDate = String(options.endDate);
    }
  }
}
