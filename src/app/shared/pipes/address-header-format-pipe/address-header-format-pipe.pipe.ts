import { Pipe, PipeTransform } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { getAddressHeader } from '@core/utils/address-helper';

@Pipe({
  name: 'addressHeaderFormat',
})
export class AddressHeaderFormatPipe implements PipeTransform {

  transform(address: AddressInfo): string {
    const emptyAddressMessage = 'No address provided, contact merchant for address';
    let res;
    return !address || !(res = getAddressHeader(address)).length ? emptyAddressMessage : res;
  }
}
