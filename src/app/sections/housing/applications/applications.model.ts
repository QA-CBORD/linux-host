import { define, isDefined } from '../utils';

export enum ApplicationStatus {
  New = 1,
  Pending = 2,
  Submitted = 3,
  Accepted = 4,
  Canceled = 5,
}

export class ApplicationDefinition {
  key: number;
  termKey: number;
  applicationTitle: string;
  applicationFormJson?: string;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.key = define(options.key, Number(options.key));
    this.termKey = define(options.termKey, Number(options.termKey));
    this.applicationTitle = define(options.applicationTitle, String(options.applicationTitle));

    if (isDefined(options.applicationFormJson)) {
      this.applicationFormJson = String(options.applicationFormJson);
    }
  }
}

export class PatronApplication {
  applicationDefinitionKey: number;
  status: ApplicationStatus;
  key?: number;
  patronKey?: number;
  createdDateTime?: string;
  submittedDateTime?: string;
  acceptedDateTime?: string;
  cancelledDateTime?: string;
  modifiedDate?: string;
  isApplicationSubmitted?: boolean;
  isApplicationAccepted?: boolean;
  isApplicationCanceled?: boolean;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.applicationDefinitionKey = define(options.applicationDefinitionKey, Number(options.applicationDefinitionKey));
    this.status = define(options.status);

    if (isDefined(options.key)) {
      this.key = Number(options.key);
    }

    if (isDefined(options.patronKey)) {
      this.patronKey = Number(options.patronKey);
    }

    if (isDefined(options.createdDateTime)) {
      this.createdDateTime = String(options.createdDateTime);
    }

    if (isDefined(options.submittedDateTime)) {
      this.submittedDateTime = String(options.submittedDateTime);
    }

    if (isDefined(options.acceptedDateTime)) {
      this.acceptedDateTime = String(options.acceptedDateTime);
    }

    if (isDefined(options.cancelledDateTime)) {
      this.cancelledDateTime = String(options.cancelledDateTime);
    }

    if (isDefined(options.modifiedDate)) {
      this.modifiedDate = String(options.modifiedDate);
    }

    if (isDefined(options.isApplicationSubmitted)) {
      this.isApplicationSubmitted = Boolean(options.isApplicationSubmitted);
    }

    if (isDefined(options.isApplicationAccepted)) {
      this.isApplicationAccepted = Boolean(options.isApplicationAccepted);
    }

    if (isDefined(options.isApplicationCanceled)) {
      this.isApplicationCanceled = Boolean(options.isApplicationCanceled);
    }
  }
}

export class PatronAttribute {
  attributeConsumerKey: number;
  value: string;
  key?: number;
  patronKey?: number;
  effectiveDate?: string;
  endDate?: string;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.attributeConsumerKey = define(options.attributeConsumerKey, Number(options.attributeConsumerKey));
    this.value = define(options.value, String(options.value));

    if (isDefined(options.key)) {
      this.key = Number(options.key);
    }

    if (isDefined(options.patronKey)) {
      this.patronKey = Number(options.patronKey);
    }

    if (isDefined(options.effectiveDate)) {
      this.effectiveDate = String(options.effectiveDate);
    }

    if (isDefined(options.endDate)) {
      this.endDate = String(options.endDate);
    }
  }
}

export class PatronPreference {
  rank: number;
  facilityKey: number;
  key?: number;
  preferenceKey?: number;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.rank = define(options.rank, Number(options.rank));
    this.facilityKey = define(options.facilityKey, Number(options.facilityKey));

    if (isDefined(options.key)) {
      this.key = Number(options.key);
    }

    if (isDefined(options.preferenceKey)) {
      this.preferenceKey = Number(options.preferenceKey);
    }
  }
}

export class ApplicationRequest {
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.patronApplication = define(options.patronApplication, new PatronApplication(options.patronApplication));

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.patronAttributes.map((attribute: any) =>
        define(attribute, new PatronAttribute(attribute))
      );
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.patronPreferences.map((preference: any) =>
        define(preference, new PatronPreference(preference))
      );
    }
  }
}

export class ApplicationDetails {
  applicationDefinition: ApplicationDefinition;
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.applicationDefinition = define(options.applicationDefinition, new ApplicationDefinition(
      options.applicationDefinition
    ));
    this.patronApplication = define(options.patronApplication, new PatronApplication(options.patronApplication));

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.patronAttributes.map((attribute: any) =>
        define(attribute, new PatronAttribute(attribute))
      );
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.patronPreferences.map((preference: any) =>
        define(preference, new PatronPreference(preference))
      );
    }
  }
}
