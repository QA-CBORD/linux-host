import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable, of } from 'rxjs';
import { CheckingContentCsModel } from '../contents-strings/checkin-content-string.model';
import { CoordsService } from '@core/service/coords/coords.service';
import { CheckingService } from './checkin-service';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckingServiceFacade {

  private barcodeScanResult: BarcodeScanResult;

  constructor(
    private readonly checkingService: CheckingService,
    private readonly coordsService: CoordsService,
    private readonly commonService: CommonService,
    private readonly barcode: BarcodeScanner
  ) {}

  /**
   * solo se llama al cargar el primer componente del flow de checking
   * @returns
   */
  loadAllContentString(): Observable<CheckingContentCsModel> {
    return this.commonService.loadContentString(ContentStringCategory.checkin);
  }

  /**
   * llamar desde cualquier component del flow de checking
   * @returns
   */
  getContent(): CheckingContentCsModel {
    return this.commonService.getString(ContentStringCategory.checkin);
  }

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

  locationPermissionDisabled(): Observable<boolean> {
    return this.coordsService.getCoords().pipe(
      first(),
      map(({ coords: { latitude, longitude } }) => !(latitude && longitude)),
      catchError(err => {
        console.log('GOT ERROR: ', err);
        return of(true);
      })
    );
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

  checkInOrderByBarcode(
    orderId: string,
    checkinBarcode: string,
    latitude: number = null,
    longitude: number = null
  ): Observable<boolean> {
    return this.checkingService.checkInOrder({
      orderId,
      latitude,
      longitude,
      checkinBarcode,
    });
  }
}
