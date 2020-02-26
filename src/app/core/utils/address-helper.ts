import { AddressInfo } from '@core/model/address/address-info';

export const getAddressHeader = ({ nickname, building, address1, address2 }: AddressInfo): string =>
  (nickname ? nickname : '') +
  (building ? (nickname ? '' : building) : '') +
  (address1 ? (nickname || building ? ', ' + address1 : address1) : '') +
  (address2 ? (address1 ? ' ' + address2 : address2) : '');

export const getAddressSubHeader = ({ city, state, postalcode }: AddressInfo): string =>
  (city ? city : '') + (state ? (city ? ', ' + state : state) : '') + (state && postalcode ? ' ' + postalcode : '');
