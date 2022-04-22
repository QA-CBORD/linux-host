import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { take } from 'rxjs/operators';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Settings } from '../../../../app.global';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';

@Injectable()
export class ScanCardResolverService implements Resolve<Observable<SettingInfo>>{

  constructor(private readonly barcodeFacadeService: BarcodeFacadeService) { }

  resolve(): Observable<SettingInfo> {
    return this.barcodeFacadeService.getSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE).pipe(take(1));
  }
}
