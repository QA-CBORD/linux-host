import { PatronAttribute } from "@sections/housing/applications/applications.model";
import { ChargeSchedule } from "@sections/housing/charge-schedules/charge-schedules.model";

import { isDefined } from "../utils";

export enum NON_ASSIGNMENT_DETAIL_KEYS {

}

export enum NON_ASSIGNMENT_DETAIL_FIELDS {

}

export interface NonAssignmentListDetailsOptions {
    id: number;
    // contractElementId: number;
    // state: string;
    applicationDescription: string;
    applicationFormJson: any;
    applicationTitle: string;
    applicationTypeId: number;
    applicationAvailableEndDateTime: string;
    applicationAvailableStartDateTime: string;
    cancellationDateTime: string;
    expirationDateTime: string;
    expireWhenAssigned: number;
    numberOfDaysToExpire: number;
    termId: number;
    acceptedDate?: string;
}

export class NonAssignmentListDetails implements NonAssignmentListDetailsOptions {
    id: number;
    applicationDescription: string;
    applicationFormJson: any;
    applicationTitle: string;
    applicationTypeId: number;
    applicationAvailableEndDateTime: string;
    applicationAvailableStartDateTime: string;
    cancellationDateTime: string;
    expirationDateTime: string;
    expireWhenAssigned: number;
    numberOfDaysToExpire: number;
    termId: number;
    // acceptedDate?: string;

    constructor(options: NonAssignmentListDetailsOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as NonAssignmentListDetailsOptions;
        }

        this.id = Number(options.id);
        this.applicationDescription = String(options.applicationDescription);
        this.applicationFormJson = options.applicationFormJson;
        this.applicationTitle = String(options.applicationTitle);
        this.applicationTypeId = Number(options.applicationTypeId);
        this.applicationAvailableEndDateTime = String(options.applicationAvailableEndDateTime);
        this.applicationAvailableStartDateTime = String(options.applicationAvailableStartDateTime);
        this.cancellationDateTime = String(options.cancellationDateTime);
        this.expirationDateTime = String(options.expirationDateTime);
        this.expireWhenAssigned = Number(options.expireWhenAssigned);
        this.numberOfDaysToExpire = Number(options.numberOfDaysToExpire);
        this.termId = Number(options.termId);

        // if (isDefined(options.acceptedDate)) {
        //     this.acceptedDate = String(options.acceptedDate);
        // }
    }

    static toNonAssignmentListDetails(nonAssignments: any): NonAssignmentListDetails[] {
        return Array.isArray(nonAssignments) 
            ? nonAssignments.map((nonAssignment: any) => new NonAssignmentListDetails(nonAssignment))
            : [];
    }
}

export interface NonAssignmentInfoOptions {

}

export class NonAssignmentInfo implements NonAssignmentInfoOptions
{

    constructor(options: NonAssignmentInfoOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as NonAssignmentInfoOptions;
        }
    }
}

export interface NonAssignmentDetailsOptions {
    nonAssignmentInfo: NonAssignmentInfo;
    formJson: any;
    chargeSchedules: ChargeSchedule[];
    patronAttributes: PatronAttribute[];
    assetRequirements:any[];
}

export class NonAssignmentDetails implements NonAssignmentDetailsOptions {
    nonAssignmentInfo: NonAssignmentInfo;
    formJson: any;
    chargeSchedules: ChargeSchedule[];
    patronAttributes: PatronAttribute[];
    assetRequirements: any[];

    constructor(options: NonAssignmentDetailsOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as NonAssignmentDetailsOptions;
        }

        this.nonAssignmentInfo = new NonAssignmentInfo(options.nonAssignmentInfo);
        this.formJson = options.formJson;

        this.chargeSchedules = Array.isArray(options.chargeSchedules)
            ? options.chargeSchedules.map((schedule: any) => new ChargeSchedule(schedule))
            : [];

        this.patronAttributes = Array.isArray(options.patronAttributes)
            ? options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute))
            : [];

        this.assetRequirements = Array.isArray(options.assetRequirements)
            ? options.assetRequirements.map((asset: any) => null) // new AssetRequirement(asset)
            : [];
        
    }
}