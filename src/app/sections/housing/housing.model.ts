import { ApplicationDetails } from './applications/applications.model';
import { ContractDetails, ContractListDetails } from './contracts/contracts.model';
import { RoomSelect } from './rooms/rooms.model';
import { FacilityDetails } from './facilities/facilities.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';
import { NonAssignmentDetails, NonAssignmentListDetails } from './non-assignments/non-assignments.model';
import { ContractSummary } from './contract-list/contractSummary.model'
import { CheckInOut, CheckInOutSlot } from './check-in-out/check-in-out.model'
import { WaitingListDetails, WaitingList } from './waiting-lists/waiting-lists.model';
import { WorkOrder, WorkOrderDetails } from './work-orders/work-orders.model';

export enum FormTypes {
  APPLICATIONS = 1,
  CONTRACTS = 2,
  WORK_ORDERS = 3,
  INSPECTIONS = 4,
  FAMILIY_MEMBERS = 5,
  ROOM_SWAPS = 6,
  STUDENT_REQUESTS = 7,
  ATTACHMENTS = 8,
  WAITING_LISTS = 9,
  NON_ASSIGNMENTS = 10
}

export interface ResponseStatusDetails {
  code: string;
  member: string;
  value: object;
  message: string;
}

export interface ResponseStatus {
  statusCode: number;
  status: string;
  message: string;
  traceId: string;
  details: ResponseStatusDetails;
}

export interface Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?;
  status: ResponseStatus;
}

export interface DefinitionsResponseOptions {
  applicationDefinitions: ApplicationDetails[];
  contractDetails: ContractListDetails[];
  nonAssignmentDetails: NonAssignmentListDetails[];
  waitingLists: WaitingList[];
  workOrders: WorkOrder;
}

export class DefinitionsResponse {
  applicationDefinitions: ApplicationDetails[];
  contractDetails: ContractListDetails[];
  nonAssignmentDetails: NonAssignmentListDetails[];
  waitingLists: WaitingList[];
  workOrders: WorkOrder;

  constructor(options: DefinitionsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as DefinitionsResponseOptions;
    }

    this.applicationDefinitions = Array.isArray(options.applicationDefinitions)
      ? options.applicationDefinitions.map((detail) => new ApplicationDetails(detail))
      : [];

    this.contractDetails = Array.isArray(options.contractDetails)
      ? options.contractDetails.map((detail) => new ContractListDetails(detail))
      : [];

    this.nonAssignmentDetails = Array.isArray(options.nonAssignmentDetails)
      ? options.nonAssignmentDetails.map((detail) => new NonAssignmentListDetails(detail))
      : [];

    this.waitingLists = Array.isArray(options.waitingLists)
      ? options.waitingLists.map((detail) => new WaitingList(detail))
      : [];

    this.workOrders = new WorkOrder(options.workOrders)
  }
}

export interface DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;
  nonAssignmentDetails: NonAssignmentDetails;
  waitingListDetails: WaitingListDetails;
  workOrdersDetails: WorkOrderDetails;
}

export class DetailsResponse implements DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;
  nonAssignmentDetails: NonAssignmentDetails;
  waitingListDetails: WaitingListDetails;
  workOrdersDetails: WorkOrderDetails;

  constructor(options: DetailsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as DetailsResponseOptions;
    }

    this.applicationDetails = new ApplicationDetails(options.applicationDetails);
    this.contractDetails = new ContractDetails(options.contractDetails);
    this.nonAssignmentDetails = new NonAssignmentDetails(options.nonAssignmentDetails);
    this.waitingListDetails = new WaitingListDetails(options.waitingListDetails);
    this.workOrdersDetails = new WorkOrderDetails(options.workOrdersDetails)
  }
}

export interface RoomSelectResponseOptions {
  roomSelects: RoomSelect[];
}

export class RoomSelectResponse implements RoomSelectResponseOptions {
  roomSelects: RoomSelect[];

  constructor(options: RoomSelectResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as RoomSelectResponseOptions;
    }
    this.roomSelects = Array.isArray(options)
      ? options.map((detail) => new RoomSelect(detail))
      : [];
  }
}
export interface ContractListResponseOptions{
  contractSummaries: ContractSummary[];
}

export class ContractListResponse implements ContractListResponseOptions{
  contractSummaries: ContractSummary[];

  constructor(options: ContractListResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as ContractListResponseOptions;
    }
    this.contractSummaries = Array.isArray(options)
      ? options.map((detail) => new ContractSummary(detail))
      : [];
  }
}

export interface CheckInOutResponseOptions{
  checkInOuts: CheckInOut[];
}

export class CheckInOutResponse implements CheckInOutResponseOptions{
  checkInOuts: CheckInOut[];

  constructor(options: CheckInOutResponseOptions){
    if (options == null || typeof options !== 'object') {
      options = {} as CheckInOutResponseOptions;
  }
  this.checkInOuts = Array.isArray(options)
      ? options.map((detail) => new CheckInOut(detail))
      : [];
  }
}

export interface CheckInOutSlotsResponseOptions {
  slots: CheckInOutSlot[];
}

export class CheckInOutSlotResponse implements CheckInOutSlotsResponseOptions {
  slots: CheckInOutSlot[];

  constructor(options: CheckInOutSlotsResponseOptions){
    if (options == null || typeof options !== 'object') {
      options = {} as CheckInOutSlotsResponseOptions;
  }

  this.slots = Array.isArray(options)
      ? options.map((detail) => new CheckInOutSlot(detail))
      : [];
  this.slots.sort((a,b)=> (a.slotDateTime > b.slotDateTime) ? 1: -1);
  }
}


export class Label {
  constructor(public name: string) {
  }
}

export interface FacilityDetailsResponseOptions {
  facilityDetails: FacilityDetails[];
}

export class FacilityDetailsResponse implements FacilityDetailsResponseOptions {
  facilityDetails: FacilityDetails[];
  constructor(options) {
    if (options == null || typeof options !== 'object') {
      options = {} as FacilityDetailsResponseOptions;
    }
    this.facilityDetails = options.map(x => {
      return new FacilityDetails(x);
    });
  }
}

export interface OccupantDetailsResponseOptions {
  occupants: FacilityOccupantDetails[]
}

export class OccupantDetailsResponse implements OccupantDetailsResponseOptions {
  occupants: FacilityOccupantDetails[];

  constructor(options) {
    if (options ==null || !Array.isArray(options)) {
      options = [] as OccupantDetailsResponseOptions[];
    }
    this.occupants = Array.isArray(options)? options.map(x => {
      return   new FacilityOccupantDetails(x)
    }): options as FacilityOccupantDetails[];
  }
}
