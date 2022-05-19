import { generateQuestions } from '../questions/questions.mock';
import { generatePatronAttributes } from '../applications/applications.mock';
import { generateChargeSchedules } from '@sections/housing/charge-schedules/charge-schedules.mock';

import { ContractListDetails, ContractDetails, ContractInfo } from './contracts.model';
import { PatronAttribute } from '../applications/applications.model';
import { ChargeSchedule } from '@sections/housing/charge-schedules/charge-schedules.model';
import { FacilityAttribute } from '@sections/housing/facility-attributes/facility-attributes.model';

export function generateContractListDetails(_: any, index: number): ContractListDetails {
  const nowISO: string = new Date().toISOString();
  const id: number = index;
  const contractElementId: number = index + 100;
  const state = `Contract Status ${index}`;
  const applicationDescription = `Description ${index}`;
  const applicationFormJson: string = JSON.stringify(generateQuestions());
  const applicationTitle = `Contract Title ${index}`;
  const applicationTypeId: number = index + 200;
  const applicationAvailableEndDateTime: string = nowISO;
  const applicationAvailableStartDateTime: string = nowISO;
  const cancellationDateTime: string = nowISO;
  const expirationDateTime: string = nowISO;
  const expireWhenAssigned = 1;
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

export function generateContractsList(amount = 3): ContractListDetails[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateContractListDetails);
}

export function generateFacilityAttribute(_: any, index: number): FacilityAttribute {
  const nowISO: string = new Date().toISOString();
  const facilityAttributeKey: number = index;
  const facilityKey: number = index + 100;
  const attributeConsumerKey: number = index + 200;
  const value = `Facility Attribute Value ${index}`;
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

export function generateFacilityAttributes(amount = 3): FacilityAttribute[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateFacilityAttribute);
}

export function generateContractInfo(index: number): ContractInfo {
  const nowISO: string = new Date().toISOString();
  const id: number = index;
  const contractName = `Contract ${id}`;
  const term = 1;
  const expectedStartDate: string = nowISO;
  const expectedEndDate: string = nowISO;
  const status = `Contract status ${id}`;
  const facilityId = 100;
  const chargedThroughDate: string = nowISO;
  const expirationDate: string = nowISO;
  const actualStartDate: string = nowISO;
  const actualEndDate: string = nowISO;
  const depositRequired = 1;
  const depositPaid = 0;
  const gracePeriodBeforeStart = 200;
  const gracePeriodBeforeEnd = 200;
  const contractNumber = `Contract number ${id + 100}`;
  const checkInDateTime: string = nowISO;
  const checkOutDateTime: string = nowISO;
  const linkToSpace = `Link to Space ${id}`;
  const changeRoomIn = 0;
  const changeRoomOut = 1;
  const note = `Note ${id}`;
  const assetTypeName = `Asset Type Name ${id}`;
  const assetTypeId = 0;
  const dateTimeAccepted: string = nowISO;
  const buyOut = false;
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
