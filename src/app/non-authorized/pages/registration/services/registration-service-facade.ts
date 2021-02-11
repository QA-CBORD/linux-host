import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormFieldList,
  GuestRegistrationManager,
  PatronRegistrationManager,
  RegistrationContent,
  UserRegistrationManager,
  UserRegistrationManagerBase,
} from '../models/registration.shared.model';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private _registrationManager: UserRegistrationManager;
  constructor(private readonly registrationService: RegistrationService) {}

  async configure(isGuest: boolean): Promise<void> {
    const serviceComponent = this.registrationService;
    const registrationController =
      (isGuest && new GuestRegistrationManager(serviceComponent)) || new PatronRegistrationManager(serviceComponent);
    await registrationController.getFormFields().toPromise();
    this._registrationManager = registrationController;
  }

  async registrationContent(): Promise<RegistrationContent> {
    const serviceComponent = this.registrationService;
    const registrationController = new UserRegistrationManagerBase(serviceComponent);
    return await registrationController.contents.toPromise();
  }

  async getFormFields(): Promise<FormFieldList> {
    return await this._registrationManager.getFormFields().toPromise();
  }

  register(data): Observable<any> {
    return this._registrationManager.register(data);
  }
}
