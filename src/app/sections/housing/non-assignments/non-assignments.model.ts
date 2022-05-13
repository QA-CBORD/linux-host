import { PatronAttribute } from "@sections/housing/applications/applications.model";
import { ChargeSchedule } from "@sections/housing/charge-schedules/charge-schedules.model";
import { PatronAddress } from "@sections/housing/addresses/address.model";

import { isDefined } from "../utils";

export enum NonAssignmentStatus {
    Preliminary = 1,
    Active = 2,
    Completed = 4,
    Expired = 5,
    Terminated = 6,
    Canceled = 7,
    Suspended = 8,
}

export enum NonAssignmentFormStatus {
    New = NonAssignmentStatus.Preliminary | NonAssignmentStatus.Active,
    Submitted =  NonAssignmentStatus.Completed,
    Expired = NonAssignmentStatus.Expired,
    Suspended = NonAssignmentStatus.Suspended,
    Canceled = NonAssignmentStatus.Terminated | NonAssignmentStatus.Canceled,
}

export interface NonAssignmentListDetailsOptions {
    id: number;
    // contractElementId: number;
    status?: string;
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
    status?: string;
    acceptedDate?: string;

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export interface AssetTypeOptions {
    assetTypeKey: number;
    elementSpecificationKey: number;
    name: string;
    active: boolean;
    facilityTypeName: string;
    canAppearOnContract: number;
    assetGroupKey: number;
    numberOfUnits: number;
    cost: number;
    diningDollars: number;
}

export class AssetType implements AssetTypeOptions {
    assetTypeKey: number;
    elementSpecificationKey: number;
    name: string;
    active: boolean;
    facilityTypeName: string;
    canAppearOnContract: number;
    assetGroupKey: number;
    numberOfUnits: number;
    cost: number;
    diningDollars: number;

    constructor(options: AssetTypeOptions) {
        if (isDefined(options)) {
            this.assetTypeKey = Number(options.assetTypeKey);
            this.elementSpecificationKey = Number(options.elementSpecificationKey);
            this.name = String(options.name);
            this.active = Boolean(options.active);
            this.facilityTypeName = String(options.facilityTypeName);
            this.assetGroupKey = Number(options.assetGroupKey);
            this.canAppearOnContract = Number(options.canAppearOnContract);
            this.numberOfUnits = Number(options.numberOfUnits);
            this.cost = Number(options.cost);
            this.diningDollars = Number(options.diningDollars);
        }
    }
}

export interface NonAssignmentDetailsOptions {
    nonAssignmentInfo: NonAssignmentInfo;
    formJson: any;
    chargeSchedules: ChargeSchedule[];
    patronAttributes: PatronAttribute[];
    assetTypes: AssetType[];
    patronAddresses: PatronAddress[];
}

export class NonAssignmentDetails implements NonAssignmentDetailsOptions {
    nonAssignmentInfo: NonAssignmentInfo;
    formJson: any;
    chargeSchedules: ChargeSchedule[];
    patronAttributes: PatronAttribute[];
    assetTypes: AssetType[];
    patronAddresses: PatronAddress[];

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

        this.assetTypes = Array.isArray(options.assetTypes)
            ? options.assetTypes.map((asset: any) => new AssetType(asset))
            : [];

        this.patronAddresses = Array.isArray(options.patronAddresses)
            ? options.patronAddresses.map((address: any) => new PatronAddress(address))
            : [];
    }
}

export interface AssetTypeDetailValueOptions {
    assetTypeKey: number;
    label: string;
    value: string;
    selected?: boolean;
    isCurrency?: boolean;
}

export class AssetTypeDetailValue implements AssetTypeDetailValueOptions {
    assetTypeKey: number;
    label: string;
    value: string;
    selected?: boolean;
    isCurrency?: boolean;

    constructor(options: AssetTypeDetailValueOptions) {
        if (!isDefined(options) || typeof options !== 'object') {
            options = {} as AssetTypeDetailValueOptions;
        }

        this.assetTypeKey = Number(options.assetTypeKey);
        this.label = String(options.label);
        this.value = isDefined(options.value) ? String(options.value) : null;
        this.selected = Boolean(options.selected);
        this.isCurrency = Boolean(options.isCurrency);
    }
}

export interface ContractRequestOptions {
    assetKey: number;
    isFacility?: boolean;
    isAsset?: boolean;
    termKey: number;
    startDate?: string;
    endDate?: string;
}

export class ContractRequest {
    assetKey: number;
    isFacility?: boolean;
    isAsset?: boolean;
    termKey: number;

    constructor(options: ContractRequestOptions) {
        if (options == null || typeof options !== 'object') {
            options = {} as ContractRequestOptions;
        }

        this.assetKey = Number(options.assetKey);
        this.isAsset = isDefined(options.isAsset)
            ? options.isAsset : true;
        this.isFacility = isDefined(options.isFacility)
            ? options.isFacility : false;
        this.termKey = Number(options.termKey);
    }
}

export interface NonAssignmentContractRequestOptions {
    nonAssignmentKey: number;
    patronContract: ContractRequest;
    patronAttributes?: PatronAttribute[];
    patronAddresses?: PatronAddress[];
}

export class NonAssignmentContractRequest implements NonAssignmentContractRequestOptions {
    nonAssignmentKey: number;
    patronContract: ContractRequest;
    patronAttributes?: PatronAttribute[];
    patronAddresses?: PatronAddress[];

    constructor(options: NonAssignmentContractRequestOptions) {
        if (options == null || typeof options !== 'object') {
            options = {} as NonAssignmentContractRequestOptions;
        }

        this.nonAssignmentKey = Number(options.nonAssignmentKey);

        this.patronContract = new ContractRequest(options.patronContract);

        if (Array.isArray(options.patronAttributes)) {
        this.patronAttributes = options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute));
        }

        if (Array.isArray(options.patronAddresses)) {
        this.patronAddresses = options.patronAddresses.map((address: any) => new PatronAddress(address));
        }
    }
}