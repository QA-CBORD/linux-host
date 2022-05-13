import { MerchantSettingInfo } from '@sections/ordering';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantOrderTypesInfo } from '@sections/ordering';

export interface MerchantInfo {
  id: string;
  campusId: string;
  externalId: string;
  parentMerchantId: string;
  name: string; // name of card
  shortName: string;
  description: string;
  storeAddress: AddressInfo;
  billingAddress: AddressInfo;
  billingTerminalId: string; // ugryd terminal ID  TODO: connect this to merchantInstitution in the query rather than merchant
  cashlessTerminalLocation: string;
  phoneCustomerService: string;
  emailCustomerService: string;
  reportingEmail: string;
  reportingFaxNumber: string;
  emailOrder: string;
  emailListAlerts: string;
  emailListOrderCc: string;
  faxNumber: string;
  website: string;
  installationDate: Date;
  hoursOfOperation: string;
  paymentNotes: string;
  openNow: boolean; // read-only, only returned when retrieving merchant
  deliveryRadius: number;
  distanceFromUser: number; // only filled in response to a geocode query
  orderTypes: MerchantOrderTypesInfo;
  taxRate: number;
  image: string;
  imageThumbnail: string;
  imageFull: string;
  hasMenu: boolean;
  serviceConsumerId: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  settings: { list: MerchantSettingInfo[]; map: Map<string, MerchantSettingInfo> | Object };
  faxNotificationActive: boolean;
  faxNotificationRequired: boolean;
  emailNotificationActive: boolean;
  onCampus: boolean;
  isFavorite?: boolean;
  isAbleToOrder?: boolean;
  timeZone?: string;
}
