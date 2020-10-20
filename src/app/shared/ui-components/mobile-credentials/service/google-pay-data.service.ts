import { Injectable } from '@angular/core/src/di/injectable';
import { MobileCredentialSharedDataService } from '../model/shared/mobile-credential-shared-data.service';
import { PartnerPaymentApiService } from '@core/service/payments-api/partner-payment-api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { HttpClient } from '@angular/common/http';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';


const major_version = 1, minor_version = 0;

const resourseUrls = {

}

@Injectable({
    providedIn: 'root',
  })

export class GooglePayDataService extends MobileCredentialSharedDataService {
    constructor(
        protected partnerPaymentApi: PartnerPaymentApiService,
        protected readonly storageStateService: StorageStateService,
        protected readonly authFacadeService: AuthFacadeService,
        protected readonly institutionFacadeService: InstitutionFacadeService,
        protected readonly httpClient: HttpClient,
        protected readonly settingsFacadeService: SettingsFacadeService,
        protected readonly contentStringFacade: ContentStringsFacadeService
      ) {
        super(partnerPaymentApi, storageStateService, authFacadeService, institutionFacadeService, httpClient);
      }
}