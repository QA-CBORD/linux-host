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
    onCampus: number;
}

export const getAddressHeader = (address: AddressInfo): string => {
  const { nickname, building, address1, address2 } = address;
  return (
    (nickname ? nickname : '') +
    (building ? (nickname ? '' : building) : '') +
    (address1 ? (nickname || building ? ', ' + address1 : address1) : '') +
    (address2 ? (address1 ? ' ' + address2 : address2) : '')
  );
};

export const getAddressSubHeader = (address: AddressInfo): string => {
  const { city, state, postalcode } = address;
  return (
    (city ? city : '') + (state ? (city ? ', ' + state : state) : '') + (state && postalcode ? ' ' + postalcode : '')
  );
};

