export enum ADDRESS_LOCATION {
  onCampus = 1,
  offCampus = 0
}

export interface AddressInfo {
    id: string;
    objectRevision: number;
    department: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalcode: string;
    country: string; // Alpha-2 code
    latitude: number;
    longitude: number;
    notes: string;
    nickname: string;
    building: string;
    floor: string;
    room: string;
    crossStreet: string;
    accessCode: string;
    phone: string;
    phoneExt: string;
    onCampus: ADDRESS_LOCATION;
}


