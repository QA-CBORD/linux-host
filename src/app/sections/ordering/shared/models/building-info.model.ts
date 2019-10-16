import { AddressInfo } from '@core/model/address/address-info';

export interface BuildingInfo {
	id: string;
	objectRevision: number;
	active: boolean;
	institutionId: string;
	address: AddressInfo;
}
