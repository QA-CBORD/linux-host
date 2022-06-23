import { isDefined } from '../utils';

import { PatronAttribute } from '../applications/applications.model';
import { ChargeSchedule } from '@sections/housing/charge-schedules/charge-schedules.model';
import { FacilityAttribute } from '@sections/housing/facility-attributes/facility-attributes.model';
import { PatronAddress } from '@sections/housing/addresses/address.model';

export enum ContractStatus {
  Preliminary = 1,
  Active = 2,
  Completed = 4,
  Expired = 5,
  Terminated = 6,
  Canceled = 7,
  Suspended = 8, // changed for bitwise math

}

export enum ContractFormStatus {
  New = ContractStatus.Preliminary | ContractStatus.Active,
  Submitted =  ContractStatus.Completed,
  Expired = ContractStatus.Expired,
  Suspended = ContractStatus.Suspended,
  Canceled = ContractStatus.Terminated | ContractStatus.Canceled,
}

export enum CONTRACT_DETAIL_KEYS {
  ACTUAL_START = 'ACTUAL_START',
  ACTUAL_END = 'ACTUAL_END',
  EXPECTED_START = 'EXPECTED_START',
  EXPECTED_END = 'EXPECTED_END',
  ASSET_TYPE = 'ASSET_TYPE',
  CONTRACT_NUMBER = 'CONTRACT_NUMBER',
  CONTRACT_STATE = 'CONTRACT_STATE',
  CONTRACT_ID = 'CONTRACT_ID',
  COST = 'COST',
  DATE_SIGNED = 'DATE_SIGNED',
  EXPIRATION_DATE = 'EXPIRATION_DATE',
  SCHEDULE_COST = 'SCHEDULE_COST',
}

export enum CONTRACT_DETAIL_FIELDS {
  ACTUAL_START = 'actualStartDate',
  ACTUAL_END = 'actualEndDate',
  EXPECTED_START = 'expectedStartDate',
  EXPECTED_END = 'expectedEndDate',
  ASSET_TYPE = 'assetTypeName',
  CONTRACT_NUMBER = 'contractNumber',
  CONTRACT_STATE = 'status',
  CONTRACT_ID = 'id',
  COST = 'contractCost',
  DATE_SIGNED = 'dateSigned',
  EXPIRATION_DATE = 'expirationDate',
  SCHEDULE_COST = 'scheduleCost',
}

export interface ContractListDetailsOptions {
  id: number;
  contractElementId: number;
  state: string;
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

export class ContractListDetails implements ContractListDetailsOptions {
  id: number;
  contractElementId: number;
  state: string;
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

  constructor(options: ContractListDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ContractListDetailsOptions;
    }

    this.id = Number(options.id);
    this.contractElementId = Number(options.contractElementId);
    this.state = String(options.state);
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

    if (isDefined(options.acceptedDate)) {
      this.acceptedDate = String(options.acceptedDate);
    }
  }

  static toContractListDetails(contracts: any): ContractListDetails[] {
    return Array.isArray(contracts) ? contracts.map((contract: any) => new ContractListDetails(contract)) : [];
  }
}

export interface ContractInfoOptions {
  id: number;
  contractName: string;
  term: number;
  expectedStartDate: string;
  expectedEndDate: string;
  status: string;
  facilityId: number;
  chargedThroughDate: string;
  expirationDate: string;
  actualStartDate: string;
  actualEndDate: string;
  depositRequired: number;
  depositPaid: number;
  gracePeriodBeforeStart: number;
  gracePeriodBeforeEnd: number;
  contractNumber: string;
  checkInDateTime: string;
  checkOutDateTime: string;
  linkToSpace: string;
  changeRoomIn: number;
  changeRoomOut: number;
  note: string;
  assetTypeName: string;
  assetTypeId: number;
  dateTimeAccepted: string;
  buyOut: boolean;
  accessStartDate: string;
  accessEndDate: string;
  dateTimeSigned?: string;
}

export class ContractInfo implements ContractInfoOptions {
  id: number;
  contractName: string;
  term: number;
  expectedStartDate: string;
  expectedEndDate: string;
  status: string;
  facilityId: number;
  chargedThroughDate: string;
  expirationDate: string;
  actualStartDate: string;
  actualEndDate: string;
  depositRequired: number;
  depositPaid: number;
  gracePeriodBeforeStart: number;
  gracePeriodBeforeEnd: number;
  contractNumber: string;
  checkInDateTime: string;
  checkOutDateTime: string;
  linkToSpace: string;
  changeRoomIn: number;
  changeRoomOut: number;
  note: string;
  assetTypeName: string;
  assetTypeId: number;
  dateTimeAccepted: string;
  buyOut: boolean;
  accessStartDate: string;
  accessEndDate: string;
  dateTimeSigned?: string;

  constructor(options: ContractInfoOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ContractInfoOptions;
    }

    this.id = Number(options.id);
    this.contractName = String(options.contractName);
    this.term = Number(options.term);
    this.expectedStartDate = String(options.expectedStartDate);
    this.expectedEndDate = String(options.expectedEndDate);
    this.status = String(options.status);
    this.facilityId = Number(options.facilityId);
    this.chargedThroughDate = String(options.chargedThroughDate);
    this.expirationDate = String(options.expirationDate);
    this.actualStartDate = String(options.actualStartDate);
    this.actualEndDate = String(options.actualEndDate);
    this.depositRequired = Number(options.depositRequired);
    this.depositPaid = Number(options.depositPaid);
    this.gracePeriodBeforeStart = Number(options.gracePeriodBeforeStart);
    this.gracePeriodBeforeEnd = Number(options.gracePeriodBeforeEnd);
    this.contractNumber = String(options.contractNumber);
    this.checkInDateTime = String(options.checkInDateTime);
    this.checkOutDateTime = String(options.checkOutDateTime);
    this.linkToSpace = String(options.linkToSpace);
    this.changeRoomIn = Number(options.changeRoomIn);
    this.changeRoomOut = Number(options.changeRoomOut);
    this.note = String(options.note);
    this.assetTypeName = String(options.assetTypeName);
    this.assetTypeId = Number(options.assetTypeId);
    this.dateTimeAccepted = String(options.dateTimeAccepted);
    this.buyOut = Boolean(options.buyOut);
    this.accessStartDate = String(options.accessStartDate);
    this.accessEndDate = String(options.accessEndDate);

    if (isDefined(options.dateTimeSigned)) {
      this.dateTimeSigned = String(options.dateTimeSigned);
    }
  }
}

export interface ContractDetailsOptions {
  contractInfo: ContractInfo;
  formJson: any;
  chargeSchedules: ChargeSchedule[];
  patronAttributes: PatronAttribute[];
  facilityAttributes: FacilityAttribute[];
  patronAddresses?: PatronAddress[];
}

export class ContractDetails implements ContractDetailsOptions {
  contractInfo: ContractInfo;
  formJson: any;
  accountCodeKey?: number;
  amount?: number;
  chargeSchedules: ChargeSchedule[];
  patronAttributes: PatronAttribute[];
  facilityAttributes: FacilityAttribute[];
  patronAddresses?: PatronAddress[];

  constructor(options: ContractDetailsOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ContractDetailsOptions;
    }

    this.contractInfo = new ContractInfo(options.contractInfo);
    this.formJson = options.formJson;

    this.chargeSchedules = Array.isArray(options.chargeSchedules)
      ? options.chargeSchedules.map((schedule: any) => new ChargeSchedule(schedule))
      : [];

    this.patronAttributes = Array.isArray(options.patronAttributes)
      ? options.patronAttributes.map((attribute: any) => new PatronAttribute(attribute))
      : [];

    this.facilityAttributes = Array.isArray(options.facilityAttributes)
      ? options.facilityAttributes.map((attribute: any) => new FacilityAttribute(attribute))
      : [];

    this.patronAddresses = Array.isArray(options.patronAddresses)
      ? options.patronAddresses.map((address: any) => new PatronAddress(address))
      : [];
  }
}

export interface ContractRequestOptions {
  contractElementKey: number;
  dateSigned: string;
}

export class ContractRequest {
  contractElementKey: number;
  dateSigned: string;

  constructor(options: ContractRequestOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as ContractRequestOptions;
    }

    this.contractElementKey = Number(options.contractElementKey);
    this.dateSigned = String(options.dateSigned);
  }
}
