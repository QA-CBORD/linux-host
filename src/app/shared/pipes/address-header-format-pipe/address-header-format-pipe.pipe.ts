import { Pipe, PipeTransform } from '@angular/core';
import { AddressInfo, getAddressHeader } from '@core/model/address/address-info';

@Pipe({
  name: 'addressHeaderFormat'
})
export class AddressHeaderFormatPipe implements PipeTransform {

  transform(address: AddressInfo): string {
    if(!address) return 'Address misconfigured =(';
    return getAddressHeader(address);
  }

}
