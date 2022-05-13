import { Injectable } from '@angular/core';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PreloginCsModel } from '../../pre-login/models/prelogin-content-strings.model';
import { GuestRegistration } from '../models/guest-registration';
import { PatronRegistration } from '../models/patron-registration';
import { RegistrationCsModel } from '../models/registration-content-strings.model';
import { FormFieldList, RegistrationData, UserRegistrationManager } from '../models/registration-utils';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private data: RegistrationData = {} as any;

  private _registration: UserRegistrationManager;
  constructor(private readonly registrationService: RegistrationService) {}

  async registrationConfig(isGuestSignup: boolean): Promise<void> {
    const serviceComponent = this.registrationService;
    const registration =
      (isGuestSignup && new GuestRegistration(serviceComponent)) || new PatronRegistration(serviceComponent);
    this.data = await registration.getData();
    this._registration = registration;
  }

  preloginContents(acuteCare): Observable<PreloginCsModel> {
    return this.getPreloginContents(acuteCare).pipe(take(1));
  }

  getData(): Promise<RegistrationData> {
    return Promise.resolve(this.data);
  }

  private getPreloginContents(acuteCare): Observable<PreloginCsModel> {
    return this.registrationService.getStringModel$(ContentStringCategory.preLogin, { data: { acuteCare } });
  }

  submit(data): Observable<any> {
    return this._registration.register(data);
  }
}
