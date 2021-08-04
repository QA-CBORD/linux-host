import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { Observable, of } from 'rxjs';
import { CoordsService } from '@core/service/coords/coords.service';
import { CheckingService } from './checkin-service';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckingServiceFacade {
  private barcodeScanResult: BarcodeScanResult;

  constructor(
    private readonly checkingService: CheckingService,
    private readonly coordsService: CoordsService,
    private readonly barcode: BarcodeScanner
  ) {}

  async scanBarcode(orderId: string, format: string = 'QR_CODE'): Promise<boolean> {
    const options: BarcodeScannerOptions = {
      orientation: 'portrait',
      preferFrontCamera: false,
      prompt: 'Scan Code',
      showFlipCameraButton: false,
      showTorchButton: false,
      torchOn: false,
      formats: format,
      resultDisplayDuration: 0,
    };

    try {
      this.barcodeScanResult = await this.barcode.scan(options);
      if (!this.barcodeScanResult.cancelled) {
        ///alert(`result: ${this.barcodeScanResult.text}`);
        // return  await this.checkInOrderByBarcode(orderId, this.barcodeScanResult.text).pipe(take(1)).toPromise();
        return true;
      } else {
        alert(`result cancelled`);
        return false;
      }
    } catch (e) {
      alert(`error: ${e.message}`);
      return false;
    }
  }

  checkInOrder(orderId: string, checkinBarcode: string = null): Observable<any> {
    return this.coordsService.getCoords().pipe(
      first(),
      switchMap(({ coords: { latitude, longitude } }) => {
        return this.checkingService.checkInOrder({
          orderId,
          latitude,
          longitude,
          checkinBarcode,
        });
      })
    );
  }
}
