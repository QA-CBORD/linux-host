import { Injectable } from '@angular/core';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { GuestRegistration } from '../models/guest-registration';
import { PatronRegistration } from '../models/patron-registration';
import {
  buildPreloginScreenData,
  FormFieldList,
  PreLoginStringModel,
  RegistrationFormData,
  UserRegistrationManager,
} from '../models/registration-utils';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private data: { fieldList?: FormFieldList; formData?: RegistrationFormData } = {};

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

  preloginContents(acuteCare): Observable<PreLoginStringModel> {
    return this.getPreloginContents(acuteCare).pipe(take(1));
  }

  getData(): Promise<{ fieldList?: FormFieldList; formData?: RegistrationFormData }> {
    return Promise.resolve(this.data);
  }

  private getPreloginContents(acuteCare): Observable<PreLoginStringModel> {
    return this.registrationService.getString$(CONTENT_STRINGS_CATEGORIES.pre_login).pipe(
      map(contents => buildPreloginScreenData(acuteCare, contents)),
      catchError(() => of(buildPreloginScreenData(acuteCare)))
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