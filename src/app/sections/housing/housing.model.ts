import { ApplicationDetails } from './applications/applications.model';
import { ContractDetails, ContractListDetails } from './contracts/contracts.model';
import { RoomSelect } from './rooms/rooms.model';
import { FacilityDetails } from './facilities/facilities.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roomate.model';
import { NonAssignmentDetails, NonAssignmentListDetails } from './non-assignments/non-assignments.model';

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

export enum AddressTypes {
  ADDRESS_NAME = "Address Name",
  ADDRESS_LINE_1 = "Address Line 1",
  ADDRESS_LINE_2 = "Address Line 2",
  CITY = "City",
  STATE = "State/Province",
  COUNTRY = "Country",
  ZIP_CODE = "Zip Code",
  PHONE_NUMBER = "Phone Number",
  EMAIL = "Email"
}

export interface ResponseStatusDetails {
  code: string;
  member: string;
  value: any;
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
  data?: any;
  status: ResponseStatus;
}

export interface DefinitionsResponseOptions {
  applicationDefinitions: ApplicationDetails[];
  contractDetails: ContractListDetails[];
  nonAssignmentDetails: NonAssignmentListDetails[];
}

export class DefinitionsResponse {
  applicationDefinitions: ApplicationDetails[];
  contractDetails: ContractListDetails[];
  nonAssignmentDetails: NonAssignmentListDetails[];

  constructor(options: DefinitionsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as DefinitionsResponseOptions;
    }

    this.applicationDefinitions = Array.isArray(options.applicationDefinitions)
      ? options.applicationDefinitions.map((detail: any) => new ApplicationDetails(detail))
      : [];

    this.contractDetails = Array.isArray(options.contractDetails)
      ? options.contractDetails.map((detail: any) => new ContractListDetails(detail))
      : [];

    this.nonAssignmentDetails = Array.isArray(options.nonAssignmentDetails)
      ? options.nonAssignmentDetails.map((detail: any) => new NonAssignmentListDetails(detail))
      : [];
  }
}

export interface DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;
  nonAssignmentDetails: NonAssignmentDetails;
}

export class DetailsResponse implements DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;
  nonAssignmentDetails: NonAssignmentDetails;

  constructor(options: DetailsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as DetailsResponseOptions;
    }

    this.applicationDetails = new ApplicationDetails(options.applicationDetails);
    this.contractDetails = new ContractDetails(options.contractDetails);
    this.nonAssignmentDetails = new NonAssignmentDetails(options.nonAssignmentDetails)
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
      ? options.map((detail: any) => new RoomSelect(detail))
      : [];
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
  constructor(options: any) {
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

  constructor(options: any) {
    if(options ==null || !Array.isArray(options)) {
      options = [] as OccupantDetailsResponseOptions[];
    }
    this.occupants = Array.isArray(options)? options.map(x => {
      return   new FacilityOccupantDetails(x)
    }): options as FacilityOccupantDetails[];
  }
}

export interface PatronAddressOptions {
  addressKey: number;
  patronId: number;
  addrTypeKey: number;
  addrName: string;
  addrLn1: string;
  addrLn2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  addrPhone: string;
  email: string;
}

export class PatronAddress implements PatronAddressOptions {
  addressKey: number;
  patronId: number;
  addrTypeKey: number;
  addrName: string;
  addrLn1: string;
  addrLn2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  addrPhone: string;
  email: string;

  constructor(options: PatronAddressOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as PatronAddressOptions;
    }

    this.addressKey = Number(options.addressKey);
    this.patronId = Number(options.patronId);
    this.addrTypeKey = Number(options.addrTypeKey);
    this.addrName = String(options.addrName);
    this.addrLn1 = String(options.addrLn1);
    this.addrLn2 = String(options.addrLn2);
    this.city = String(options.city);
    this.state = String(options.state);
    this.zip = String(options.zip);
    this.country = String(options.country);
    this.addrPhone = String(options.addrPhone);
    this.email = String(options.email);
  }
}
