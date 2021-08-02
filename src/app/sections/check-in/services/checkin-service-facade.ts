import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable } from 'rxjs';
import { CheckingContentCsModel } from '../contents-strings/checkin-content-string.model';

@Injectable({ providedIn: 'root' })
export class CheckingServiceFacade {
  private barcodeScanResult: BarcodeScanResult;
  constructor(private readonly commonService: CommonService, private readonly barcode: BarcodeScanner) {}

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

  async scanBarcode(format: string = 'QR_CODE') {
    try {
      const options: BarcodeScannerOptions = {
        orientation: 'portrait', // android only
        preferFrontCamera: false,
        prompt: 'Scan Reward',
        showFlipCameraButton: false,
        showTorchButton: true,
        torchOn: false,
        formats: format,
        resultDisplayDuration: 0,
      };
      this.barcodeScanResult = await this.barcode.scan(options);

      if (!this.barcodeScanResult.cancelled) {
        alert(`result: ${this.barcodeScanResult.text}`);
      } else {
        alert(`result cancelled`);
      }
    } catch (e) {
      alert(`error: ${e.message}`);
    }
  }
}
