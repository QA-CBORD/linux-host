export interface AddressInfo {
    objectRevision: number;
    department: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalcode: string;
    country: string;
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
    onCampus: number; // 0 = off campus, 1 = on campus
}

export interface AddressInfoList {
    addresses: AddressInfo[];
}