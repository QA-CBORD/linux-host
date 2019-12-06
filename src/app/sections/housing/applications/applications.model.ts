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
    if (typeof options !== 'object') {
      throw new Error('ApplicationDefinition - options should be an object');
    }

    this.key = Number(options.key);
    this.termKey = Number(options.termKey);
    this.applicationTitle = String(options.applicationTitle);

    if (options.applicationFormJson != null) {
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
    if (typeof options !== 'object') {
      throw new Error('PatronApplication - options is not an object');
    }

    this.applicationDefinitionKey = Number(options.applicationDefinitionKey);
    this.status = options.status;

    if (options.key != null) {
      this.key = Number(options.key);
    }

    if (options.patronKey != null) {
      this.patronKey = Number(options.patronKey);
    }

    if (options.createdDateTime != null) {
      this.createdDateTime = String(options.createdDateTime);
    }

    if (options.submittedDateTime != null) {
      this.submittedDateTime = String(options.submittedDateTime);
    }

    if (options.acceptedDateTime != null) {
      this.acceptedDateTime = String(options.acceptedDateTime);
    }

    if (options.cancelledDateTime != null) {
      this.cancelledDateTime = String(options.cancelledDateTime);
    }

    if (options.cancelledDateTime != null) {
      this.cancelledDateTime = String(options.cancelledDateTime);
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
    if (typeof options !== 'object') {
      throw new Error('PatronAttribute - options should be an object');
    }

    this.attributeConsumerKey = Number(options.attributeConsumerKey);
    this.value = String(options.value);

    if (options.key != null) {
      this.key = Number(options.key);
    }

    if (options.patronKey != null) {
      this.patronKey = Number(options.patronKey);
    }

    if (options.effectiveDate != null) {
      this.effectiveDate = String(options.effectiveDate);
    }

    if (options.endDate != null) {
      this.endDate = String(options.endDate);
    }
  }
}

export class PatronPreference {
  key: number;
  preferenceKey: number;
  rank: number;
  facilityKey: number;

  constructor(options: any) {
    if (typeof options !== 'object') {
      throw new Error('PatronPreference - options is not an object');
    }

    this.key = Number(options.key);
    this.preferenceKey = Number(options.preferenceKey);
    this.rank = Number(options.rank);
    this.facilityKey = Number(options.facilityKey);
  }
}

export class ApplicationRequest {
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: any) {
    if (typeof options !== 'object') {
      throw new Error('ApplicationRequest - options is not an object');
    }

    this.patronApplication = new PatronApplication(options.patronApplication);

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.map((attribute: any) => new PatronAttribute(attribute));
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.map((preference: any) => new PatronPreference(preference));
    }
  }
}

export class ApplicationDetails {
  applicationDefinition: ApplicationDefinition;
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: any) {
    if (typeof options !== 'object') {
      throw new Error('ApplicationDetails - options is not an object');
    }

    this.applicationDefinition = new ApplicationDefinition(options.applicationDefinition);
    this.patronApplication = new PatronApplication(options.patronApplication);

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.map((attribute: any) => new PatronAttribute(attribute));
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.map((preference: any) => new PatronPreference(preference));
    }
  }
}
