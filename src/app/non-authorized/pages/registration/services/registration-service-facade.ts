import { Injectable } from '@angular/core';
import { forkJoin, iif, Observable, of, zip } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import {
  formField,
  GuestRegistrationManager,
  LookupFieldInfo,
  PageSetting,
  PatronRegistrationManager,
  UserRegistrationManager,
} from '../models/registration.shared.model';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationServiceFacade {
  private registrationManager: UserRegistrationManager;

  constructor(private readonly registrationService: RegistrationService) {}

  private loadRegistrationFormDynamicFields(): Observable<LookupFieldInfo[]> {
    return this.registrationService.retrieveRegistrationFields().pipe(
      map(unSortedList => {
        unSortedList.sort((a, b) => +a.displayOrder - +b.displayOrder);
        return unSortedList;
      })
    );
  }

  private getPageSettings(): Observable<PageSetting> {
    return this.registrationService.getPageSettings();
  }

  onBeforePageLoad(isGuest: boolean): Promise<any> {
    const pageSettingsObs$ = this.getPageSettings().pipe(
      first(),
      map(data => ({
        ...data,
        isGuest,
      }))
    );
    const dynamicFormFields$ = this.loadRegistrationFormDynamicFields().pipe(first());
    const combine$ = zip(pageSettingsObs$, dynamicFormFields$)
      .pipe(
        map(([settings, dynamicFields]) => ({
          ...settings,
          dynamicFields,
        }))
      )
      .pipe(first());

    return iif(() => isGuest, pageSettingsObs$, combine$)
      .pipe(
        tap((setting: any) => {
          if (isGuest) {
            this.registrationManager = new GuestRegistrationManager(setting, this.registrationService);
          } else {
            this.registrationManager = new PatronRegistrationManager(
              setting,
              setting.dynamicFields,
              this.registrationService
            );
          }
        })
      )
      .toPromise();
  }

  getSetting(): PageSetting {
    return this.registrationManager.setting;
  }

  getFormFields(): formField[] {
    return this.registrationManager.formFields;
  }

  register(data): Observable<boolean> {
    return this.registrationManager.register(data);
  }
}
