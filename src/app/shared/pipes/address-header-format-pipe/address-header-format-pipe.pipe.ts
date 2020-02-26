import { Pipe, PipeTransform } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { getAddressHeader } from '@core/utils/address-helper';

@Pipe({
  name: 'addressHeaderFormat'
})
export class AddressHeaderFormatPipe implements PipeTransform {

  transform(address: AddressInfo): string {
    return address ? getAddressHeader(address) : 'Address misconfigured =(';
  }

}
