export class Application {
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
