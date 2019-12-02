export enum ApplicationStatus {
  New = 1,
  Pending = 2,
  Submitted = 3,
  Accepted = 4,
  Canceled = 5,
}

export class Application {
  constructor(
    public key: number,
    public termKey: number,
    public patronApplicationKey: number,
    public applicationTitle: string,
    public status: ApplicationStatus,
    public createdDateTime: string,
    public submittedDateTime: string
  ) {}
}

export class ApplicationDefinition {
  constructor(
    public key: number,
    public termKey: number,
    public applicationTitle: string,
    public applicationFormJson?: string
  ) {}
}

export class PatronApplication {
  constructor(
    public applicationDefinitionKey: number,
    public status: ApplicationStatus,
    public key?: number,
    public patronKey?: number,
    public createdDateTime?: string,
    public submittedDateTime?: string,
    public acceptedDateTime?: string,
    public cancelledDateTime?: string,
    public modifiedDate?: string,
    public isApplicationSubmitted?: boolean,
    public isApplicationAccepted?: boolean,
    public isApplicationCanceled?: boolean
  ) {}
}

export class PatronAttribute {
  constructor(public attributeConsumerKey: number, public value: string, public key?: number) {}
}

export class PatronPreference {
  constructor(public key: number, public preferenceKey: number, public rank: number, public facilityKey: number) {}
}

export class ApplicationRequest {
  constructor(
    public patronApplication: PatronApplication,
    public patronAttributes?: PatronAttribute[],
    public patronPreferences?: PatronPreference[]
  ) {}
}

export class ApplicationDetails {
  constructor(
    public applicationDefinition: ApplicationDefinition,
    public patronApplication: PatronApplication,
    public patronAttributes?: PatronAttribute[],
    public patronPreferences?: PatronPreference[]
  ) {}
}
