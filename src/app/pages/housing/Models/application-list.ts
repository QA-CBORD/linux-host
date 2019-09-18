export class Applications {
    applicationDefinitionId: number;
    createdDateTime: string;
    submittedDateTime: string;
    acceptedDateTime: string;
    cancelledDateTime: string;
    modifiedDate: string;
    patronId: number;
    isApplicationSubmitted:	boolean;
    isApplicationAccepted:	boolean;
    isApplicationCanceled:	boolean;
    applicationTitle:	string;
    applicationTerm: number;

    constructor(applicationDefinitionId: number,
                createdDateTime: string,
                submittedDateTime: string,
                acceptedDateTime: string,
                cancelledDateTime: string,
                modifiedDate: string,
                patronId: number,
                isApplicationSubmitted:	boolean,
                isApplicationAccepted:	boolean,
                isApplicationCanceled:	boolean,
                applicationTitle:	string,
                applicationTerm: number) {
            this.applicationDefinitionId = applicationDefinitionId;
            this.createdDateTime = createdDateTime;
            this.submittedDateTime = submittedDateTime;
            this.acceptedDateTime = acceptedDateTime;
            this.cancelledDateTime = cancelledDateTime;
            this.modifiedDate = modifiedDate;
            this.patronId = patronId;
            this.isApplicationSubmitted = isApplicationSubmitted;
            this.isApplicationAccepted = isApplicationAccepted;
            this.isApplicationCanceled = isApplicationCanceled;
            this.applicationTitle = applicationTitle;
            this.applicationTerm = applicationTerm;
    }
}
