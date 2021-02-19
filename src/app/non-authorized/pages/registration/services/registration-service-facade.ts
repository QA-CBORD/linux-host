import { Injectable } from '@angular/core';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { InstitutionLookupListItem } from '@core/model/institution';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import {
  FormFieldList,
  PreLoginStringKeys,
  PreLoginStringModel,
  UserRegistrationManager,
} from '../models/registration.shared.model';
import { GuestRegistrationManager, PatronRegistrationManager } from './registration-manager';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private _registrationManager: UserRegistrationManager;
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
  ) {}

  async registrationConfig(isGuestSignup: boolean): Promise<void> {
    const serviceComponent = this.registrationService;
    let registrationController;
    if (isGuestSignup) registrationController = new GuestRegistrationManager(serviceComponent);
    else registrationController = new PatronRegistrationManager(serviceComponent);
    await registrationController.getFormFields().toPromise();
    this._registrationManager = registrationController;
  }

  async pageContentStrings(){
    return await this._registrationManager.getFormStrings().toPromise();
  }

  preloginContents(): Observable<PreLoginStringModel> {
    const cachedInstitution = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    return cachedInstitution.pipe(
      switchMap(cachedInstitution => this.getPreloginContents(cachedInstitution))
    );
  }

  private getPreloginContents(institution): Observable<PreLoginStringModel>{
    return this.registrationService
      .getContentStringByCategory$(CONTENT_STRINGS_CATEGORIES.pre_login)
      .pipe(
        map(contents => {
          const preLoginContentString: any = {};
          contents.forEach(({ name: ContentStringKey, value }) => {
            if (ContentStringKey == PreLoginStringKeys.continueAsNonGuest) {
              const [first, second] = value.split('|');
              value = first.trim();
              if (institution.acuteCare) {
                value = second.trim();
              }
            }
            preLoginContentString[ContentStringKey] = value;
          });
          return preLoginContentString;
        })
      );
  }

  async getFormFields(): Promise<FormFieldList> {
    return await this._registrationManager.getFormFields().toPromise();
  }

  register(data): Observable<any> {
    return this._registrationManager.register(data);
  }

  get guestLoginSupportedInEnv(): boolean {
    const currentEnv = this.environmentFacadeService.getEnvironmentObject().environment;
    return currentEnv == EnvironmentType.develop || currentEnv == EnvironmentType.feature1;
  }
}
