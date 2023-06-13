import { Pipe, PipeTransform } from '@angular/core';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Pipe({
  name: 'mapsUri',
})
export class MapsUriPipe implements PipeTransform {
  uriScheme: string;
  constructor(readonly nativeProvider: NativeProvider) {
    if (nativeProvider.isAndroid()) {
      this.uriScheme = 'geo:?q=';
    } else if (nativeProvider.isIos()) {
      this.uriScheme = 'maps://maps.apple.com/?q=';
    } else {
      this.uriScheme = 'https://www.google.com/maps/place/';
    }
  }
  transform = (address: string): string => `${this.uriScheme}${encodeURIComponent(address)}`;
}
