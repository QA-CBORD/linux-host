import { AddressInfo } from "@core/model/address/address-info";

export interface OrderDetailsOptions {
    address: AddressInfo,
    dueTime: Date,
    orderType: number,
    isASAP: boolean,
  }
