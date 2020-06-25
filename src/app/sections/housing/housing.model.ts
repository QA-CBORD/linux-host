import { ApplicationDetails } from './applications/applications.model';
import { ContractDetails, ContractListDetails } from './contracts/contracts.model';
import { RoomSelect } from './rooms/rooms.model';
import { FacilityDetails } from './facilities/facilities.model';

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
}

export class DefinitionsResponse {
  applicationDefinitions: ApplicationDetails[];
  contractDetails: ContractListDetails[];

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
  }
}

export interface DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;
}

export class DetailsResponse implements DetailsResponseOptions {
  applicationDetails: ApplicationDetails;
  contractDetails: ContractDetails;

  constructor(options: DetailsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as DetailsResponseOptions;
    }

    this.applicationDetails = new ApplicationDetails(options.applicationDetails);
    this.contractDetails = new ContractDetails(options.contractDetails);
  }
}

export interface RoomSelectResponseOptions{
  roomSelects: RoomSelect[];
}

export class RoomSelectResponse implements RoomSelectResponseOptions{
  roomSelects: RoomSelect[];

  constructor(options: RoomSelectResponseOptions){
    if (options == null || typeof options !== 'object') {
      options = {} as RoomSelectResponseOptions;
    }
    this.roomSelects = Array.isArray(options)
      ? options.map((detail : any) => new RoomSelect(detail))
      : [];
  }
}

export class Label {
  constructor(public name: string) {}
}

export interface FacilityDetailsResponseOptions {
  facilityDetails: FacilityDetails[];
}
export class FacilityDetailsResponse implements FacilityDetailsResponseOptions {
  facilityDetails: FacilityDetails[];
  constructor(options: FacilityDetailsResponseOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as FacilityDetailsResponseOptions;
    }
  }
}