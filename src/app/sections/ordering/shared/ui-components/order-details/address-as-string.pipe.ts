import { Pipe, PipeTransform } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';

@Pipe({
  name: 'addressAsString',
})
export class AddressAsStringPipe implements PipeTransform {

  transform(value: AddressInfo, type: ORDER_TYPE): string {
    return type === ORDER_TYPE.DELIVERY
      ? this.getDeliveryAddressAsString(value)
      : this.getPickupAddressAsString(value);
  }

  private getPickupAddressAsString({ address1, address2, city }: AddressInfo): string {
    address1 = address1 ? address1 : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';
    return `${address1} ${address2} ${city}`.trim();
  }

  private getDeliveryAddressAsString(addressInfo: AddressInfo = {} as AddressInfo): string {
    if (!Object.keys(addressInfo).length) return '';
    let { onCampus, address1, address2, city, room, building, state } = addressInfo;
    room = room ? `Room ${room}` : '';
    building = building ? building : '';
    address1 = address1 ? address1 : '';
    state = state ? state : '';
    address2 = address2 ? address2 : '';
    city = city ? city : '';

    return Boolean(Number(onCampus))
      ? `${room}, ${building}`.trim()
      : `${address1} ${address2}, ${city}, ${state}`.trim();
  }
}
