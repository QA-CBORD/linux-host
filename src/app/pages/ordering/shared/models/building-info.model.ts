import { AddressInfo } from '.';

export interface BuildingInfo {
	id: string;
	objectRevision: number;
	active: boolean;
	institutionId: string;
	address: AddressInfo;
}
