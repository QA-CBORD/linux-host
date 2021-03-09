import { Injectable } from '@angular/core';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { ContentStringApi } from '@shared/model/content-strings/content-strings-api';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { PreloginCsModel } from '../../pre-login/models/prelogin-content-strings.model';
import { GuestRegistration } from '../models/guest-registration';
import { PatronRegistration } from '../models/patron-registration';
import { RegistrationCsModel } from '../models/registration-content-strings.model';
import { FormFieldList, UserRegistrationManager } from '../models/registration-utils';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private data: { fieldList?: FormFieldList; formData?: RegistrationCsModel } = {};

  private _registration: UserRegistrationManager;
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly environmentFacadeService: EnvironmentFacadeService
  ) {}

  async registrationConfig(isGuestSignup: boolean): Promise<void> {
    const serviceComponent = this.registrationService;
    let registration =
      (isGuestSignup && new GuestRegistration(serviceComponent)) || new PatronRegistration(serviceComponent);
    this.data = await registration.getData();
    this._registration = registration;
  }

  preloginContents(acuteCare): Observable<PreloginCsModel> {
    return this.getPreloginContents(acuteCare).pipe(take(1));
  }

  getData(): Promise<{ fieldList?: FormFieldList; formData?: RegistrationCsModel }> {
    return Promise.resolve(this.data);
  }

  private getPreloginContents(acuteCare): Observable<PreloginCsModel> {
    return this.registrationService.getString$(CONTENT_STRINGS_CATEGORIES.pre_login).pipe(
      map(data => ContentStringApi.preLogin(data, { acuteCare })),
      catchError(() => of(ContentStringApi.preLogin(null, { acuteCare })))
    );
  }

  submit(data): Observable<any> {
    return this._registration.register(data);
  }

  get guestLoginSupportedInEnv(): boolean {
    const currentEnv = this.environmentFacadeService.getEnvironmentObject().environment;
    return currentEnv == EnvironmentType.develop || currentEnv == EnvironmentType.feature1;
  }
}
