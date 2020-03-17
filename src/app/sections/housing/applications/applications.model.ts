import { isDefined } from '../utils';

export enum ApplicationStatus {
  New = 1,
  Pending = 2,
  Submitted = 3,
  Accepted = 4,
  Canceled = 5,
}

export interface ApplicationDefinitionOptions {
  key: number;
  termKey: number;
  applicationTitle: string;
  applicationFormJson?: string;
}

export class ApplicationDefinition implements ApplicationDefinitionOptions {
  key: number;
  termKey: number;
  applicationTitle: string;
  applicationFormJson?: string;

  constructor(options: ApplicationDefinitionOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as ApplicationDefinitionOptions;
    }

    this.key = Number(options.key);
    this.termKey = Number(options.termKey);
    this.applicationTitle = String(options.applicationTitle);

    if (isDefined(options.applicationFormJson)) {
      this.applicationFormJson = String(options.applicationFormJson);
    }
  }
}

export interface PatronApplicationOptions {
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
}

export class PatronApplication implements PatronApplicationOptions {
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

  constructor(options: PatronApplicationOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as PatronApplicationOptions;
    }

    this.applicationDefinitionKey = Number(options.applicationDefinitionKey);
    this.status = options.status || ApplicationStatus.New;

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

export interface PatronAttributeOptions {
  attributeConsumerKey: number;
  value: string;
  key?: number;
  patronKey?: number;
  effectiveDate?: string;
  endDate?: string;
}

export class PatronAttribute {
  attributeConsumerKey: number;
  value: string;
  key?: number;
  patronKey?: number;
  effectiveDate?: string;
  endDate?: string;

  constructor(options: PatronAttributeOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as PatronAttributeOptions;
    }

    this.attributeConsumerKey = Number(options.attributeConsumerKey);
    this.value = String(options.value);

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

export interface PatronPreferenceOptions {
  rank: number;
  facilityKey: number;
  key?: number;
  preferenceKey?: number;
}

export class PatronPreference {
  rank: number;
  facilityKey: number;
  key?: number;
  preferenceKey?: number;

  constructor(options: PatronPreferenceOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as PatronPreferenceOptions;
    }

    this.rank = Number(options.rank);
    this.facilityKey = Number(options.facilityKey);

    if (isDefined(options.key)) {
      this.key = Number(options.key);
    }

    if (isDefined(options.preferenceKey)) {
      this.preferenceKey = Number(options.preferenceKey);
    }
  }
}

export interface ApplicationRequestOptions {
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];
}

export class ApplicationRequest {
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: ApplicationRequestOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as ApplicationRequestOptions;
    }

    this.patronApplication = new PatronApplication(options.patronApplication);

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute));
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.patronPreferences.map((preference: any) => new PatronPreference(preference));
    }
  }
}

export interface ApplicationDetailsOptions {
  applicationDefinition: ApplicationDefinition;
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];
}

export class ApplicationDetails implements ApplicationDetailsOptions {
  applicationDefinition: ApplicationDefinition;
  patronApplication: PatronApplication;
  patronAttributes?: PatronAttribute[];
  patronPreferences?: PatronPreference[];

  constructor(options: ApplicationDetailsOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as ApplicationDetailsOptions;
    }

    this.applicationDefinition = new ApplicationDefinition(options.applicationDefinition);

    if (isDefined(options.patronApplication)) {
      this.patronApplication = new PatronApplication(options.patronApplication);
    }

    if (Array.isArray(options.patronAttributes)) {
      this.patronAttributes = options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute));
    }

    if (Array.isArray(options.patronPreferences)) {
      this.patronPreferences = options.patronPreferences.map((preference: any) => new PatronPreference(preference));
    }
  }

  static toApplicationsDetails(applications: any): ApplicationDetails[] {
    return Array.isArray(applications)
      ? applications.map((application: any) => new ApplicationDetails(application))
      : [];
  }
}
