import { generateQuestions } from '../questions/questions.mock';

import {
  ContractListDetails,
  ChargeSchedule,
  FacilityAttribute,
  ContractDetails,
  ContractInfo,
} from './contracts.model';
import { generatePatronAttributes } from '../applications/applications.mock';
import { PatronAttribute } from '../applications/applications.model';

export function generateContractListDetails(_: any, index: number): ContractListDetails {
  const nowISO: string = new Date().toISOString();
  const id: number = index;
  const contractElementId: number = index + 100;
  const state: string = `Contract Status ${index}`;
  const applicationDescription: string = `Description ${index}`;
  const applicationFormJson: string = JSON.stringify(generateQuestions());
  const applicationTitle: string = `Contract Title ${index}`;
  const applicationTypeId: number = index + 200;
  const applicationAvailableEndDateTime: string = nowISO;
  const applicationAvailableStartDateTime: string = nowISO;
  const cancellationDateTime: string = nowISO;
  const expirationDateTime: string = nowISO;
  const expireWhenAssigned: number = 1;
  const numberOfDaysToExpire: number = index + 300;
  const termId: number = index + 400;
  // const acceptedDate: string = nowISO;

  return new ContractListDetails({
    id,
    contractElementId,
    state,
    applicationDescription,
    applicationFormJson,
    applicationTitle,
    applicationTypeId,
    applicationAvailableEndDateTime,
    applicationAvailableStartDateTime,
    cancellationDateTime,
    expirationDateTime,
    expireWhenAssigned,
    numberOfDaysToExpire,
    termId,
    // acceptedDate,
  });
}

export function generateContractsList(amount: number = 3): ContractListDetails[] {
  return Array.apply(null, Array(amount)).map(generateContractListDetails);
}

export function generateChargeSchedule(_: any, index: number): ChargeSchedule {
  const nowISO: string = new Date().toISOString();
  const chargeScheduleName: string = `Charge Schedule ${index}`;
  const linkedChargeScheduleStartDate: string = nowISO;
  const linkedChargeScheduleEndDate: string = nowISO;
  const active: boolean = index % 2 === 0;
  const fullChargeEstimate: number = index + 100;
  const remainingChargeEstimate: number = index + 200;
  const estimateReason: string = `Estimated ${index}`;
  const scheduleType: string = `Schedule ${index}`;
  const chargeAmount: number = index + 300;

  return new ChargeSchedule({
    chargeScheduleName,
    linkedChargeScheduleStartDate,
    linkedChargeScheduleEndDate,
    active,
    fullChargeEstimate,
    remainingChargeEstimate,
    estimateReason,
    scheduleType,
    chargeAmount,
  });
}

export function generateChargeSchedules(amount: number = 3): ChargeSchedule[] {
  return Array.apply(null, Array(amount)).map(generateChargeSchedule);
}

export function generateFacilityAttribute(_: any, index: number): FacilityAttribute {
  const nowISO: string = new Date().toISOString();
  const facilityAttributeKey: number = index;
  const facilityKey: number = index + 100;
  const attributeConsumerKey: number = index + 200;
  const value: string = `Facility Attribute Value ${index}`;
  const effectiveDate: string = nowISO;
  const endDate: string = nowISO;

  return new FacilityAttribute({
    facilityAttributeKey,
    facilityKey,
    attributeConsumerKey,
    value,
    effectiveDate,
    endDate,
  });
}

export function generateFacilityAttributes(amount: number = 3): FacilityAttribute[] {
  return Array.apply(null, Array(amount)).map(generateFacilityAttribute);
}

export function generateContractInfo(index: number): ContractInfo {
  const nowISO: string = new Date().toISOString();
  const id: number = index;
  const contractName: string = `Contract ${id}`;
  const term: number = 1;
  const expectedStartDate: string = nowISO;
  const expectedEndDate: string = nowISO;
  const status: string = `Contract status ${id}`;
  const facilityId: number = 100;
  const chargedThroughDate: string = nowISO;
  const expirationDate: string = nowISO;
  const actualStartDate: string = nowISO;
  const actualEndDate: string = nowISO;
  const depositRequired: number = 1;
  const depositPaid: number = 0;
  const gracePeriodBeforeStart: number = 200;
  const gracePeriodBeforeEnd: number = 200;
  const contractNumber: string = `Contract number ${id + 100}`;
  const checkInDateTime: string = nowISO;
  const checkOutDateTime: string = nowISO;
  const linkToSpace: string = `Link to Space ${id}`;
  const changeRoomIn: number = 0;
  const changeRoomOut: number = 1;
  const note: string = `Note ${id}`;
  const assetTypeName: string = `Asset Type Name ${id}`;
  const assetTypeId: number = 0;
  const dateTimeAccepted: string = nowISO;
  const buyOut: boolean = false;
  const accessStartDate: string = nowISO;
  const accessEndDate: string = nowISO;
  // const dateTimeSigned: string = nowISO;

  return new ContractInfo({
    id,
    contractName,
    term,
    expectedStartDate,
    expectedEndDate,
    status,
    facilityId,
    chargedThroughDate,
    expirationDate,
    actualStartDate,
    actualEndDate,
    depositRequired,
    depositPaid,
    gracePeriodBeforeStart,
    gracePeriodBeforeEnd,
    contractNumber,
    checkInDateTime,
    checkOutDateTime,
    linkToSpace,
    changeRoomIn,
    changeRoomOut,
    note,
    assetTypeName,
    assetTypeId,
    dateTimeAccepted,
    buyOut,
    accessStartDate,
    accessEndDate,
    // dateTimeSigned,
  });
}

export function generateContractDetails(index: number): ContractDetails {
  const contractInfo: ContractInfo = generateContractInfo(index);
  const formJson: string = JSON.stringify(generateQuestions());
  const chargeSchedules: ChargeSchedule[] = generateChargeSchedules();
  const patronAttributes: PatronAttribute[] = generatePatronAttributes();
  const facilityAttributes: FacilityAttribute[] = generateFacilityAttributes();

  return new ContractDetails({
    contractInfo,
    formJson,
    chargeSchedules,
    patronAttributes,
    facilityAttributes,
  });
}
