export class PatronApplication {
  constructor(
    public applicationDefinitionId: number,
    public createdDateTime: string,
    public submittedDateTime: string,
    public acceptedDateTime: string,
    public cancelledDateTime: string,
    public modifiedDate: string,
    public patronId: number,
    public isApplicationSubmitted: boolean,
    public isApplicationAccepted: boolean,
    public isApplicationCanceled: boolean,
    public applicationTitle: string,
    public applicationTerm: number
  ) {}
}

export class ApplicationAttribute {
  constructor(
    public applicationAttributeId: number,
    public applicationAttributeValue: string,
    public applicationDefinitionId: number,
    public consumerAttributeId: number,
    public isDeleted: boolean,
    public isNew: boolean,
    public isUpdated: boolean
  ) {}
}

export class Application {
  constructor(
    public applicationAttributes: ApplicationAttribute[],
    public applicationAvailableEndDateTime: string,
    public applicationAvailableStartDateTime: string,
    public applicationDescription: string,
    public applicationFormJson: string,
    public applicationTitle: string,
    public applicationTypeId: string,
    public cancellationDateTime: string,
    public expirationDateTime: string,
    public id: number,
    public numberOfDaysToExpire: number,
    public termId: number
  ) {}
}

export enum ApplicationStatus {
  Accepted = 'Accepted',
  Submitted = 'Submitted',
  Canceled = 'Canceled',
  New = 'New',
  Pending = 'Pending',
}
