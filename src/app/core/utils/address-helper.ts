import { AddressInfo } from '@core/model/address/address-info';

export const getAddressHeader = (address: AddressInfo): string =>
  (address.nickname ? address.nickname : '') +
  (address.building ? (address.nickname ? '' : address.building) : '') +
  (address.address1 ? (address.nickname || address.building ? ', ' + address.address1 : address.address1) : '') +
  (address.address2 ? (address.address1 ? ', ' + address.address2 : address.address2) : '') +
  (getAddressSubHeader(address) ? ', ' + getAddressSubHeader(address) : '');

export const getAddressSubHeader = ({ city, state, postalcode }: AddressInfo): string =>
  (city ? city : '') + (state ? (city ? ', ' + state : state) : '') + (state && postalcode ? ' ' + postalcode : '');
