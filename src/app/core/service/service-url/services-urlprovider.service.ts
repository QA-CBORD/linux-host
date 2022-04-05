import { Injectable } from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesURLProviderService {
  private _serviceURL: string;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService
  ) {
    this._serviceURL = this.environmentFacadeService.getServicesURL();
    this.institutionFacadeService.cachedInstitutionInfo$.subscribe(institution => {
      this._serviceURL = institution.servicesUrl || this.environmentFacadeService.getServicesURL();
    });
  }

  set servicesURL(url: string) {
    this._serviceURL = url;
  }

  get servicesURL() {
    return this._serviceURL;
  }
}
