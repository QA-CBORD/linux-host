import { Pipe, PipeTransform } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { getAddressSubHeader } from '@core/utils/address-helper';

@Pipe({
  name: 'addressSubHeaderFormat'
})
export class AddressSubHeaderFormatPipe implements PipeTransform {

  transform(address: AddressInfo): string {
    return address ? getAddressSubHeader(address) : 'Address misconfigured =(';
  }

}
