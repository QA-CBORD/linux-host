import { AddressInfo } from "@core/model/address/address-info";

export interface AddressInfoExpanded {
  onCampus: number;
  id: string;
  item: AddressInfo;
  checked: boolean;
  displayHeader: string;
  displaySubheader: string;
}
