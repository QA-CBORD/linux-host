export enum AddressFields {
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