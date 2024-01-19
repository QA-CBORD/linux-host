import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, firstValueFrom } from 'rxjs';
import { first, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { EnvironmentInfo, ENVIRONMENTS_MAP, EnvironmentType } from '@core/model/environment';
import { AuthFacadeService } from '../auth/auth.facade.service';
export { EnvironmentType } from '@core/model/environment';
@Injectable({
  providedIn: 'root',
})
export class EnvironmentFacadeService extends ServiceStateFacade {
  private currentEnvironmentKey = 'current_environment';
  private overridedEnvironmentKey = 'overrided_environment';
  private currentEnvironment: EnvironmentInfo = null;
  private overridedEnvironment: EnvironmentInfo = null;

  constructor(
    private readonly storageStateService: StorageStateService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly alertController: AlertController
  ) {
    super();
    this.initialization();
  }

  async initialization() {
    this.currentEnvironment = await this.getSavedEnvironmentInfo$()
      .pipe(take(1))
      .toPromise();
  }

  async changeEnvironment() {
    await this.presentChangeEnvironmentModal();
  }

  getSavedEnvironmentInfo$(): Observable<EnvironmentInfo> {
    return this.currentEnvironment !== null
      ? of(this.currentEnvironment)
      : this.storageStateService.getStateEntityByKey$<EnvironmentType>(this.currentEnvironmentKey).pipe(
          withLatestFrom(this.storageStateService.getStateEntityByKey$<EnvironmentType>(this.overridedEnvironmentKey)),
          mergeMap(([currentEnvironment, overridedEnvironment]) => {
            /// if no current environment is saved, default to production
            return of(ENVIRONMENTS_MAP[EnvironmentType.feature1]);
            if (currentEnvironment === null) {
              this.setSavedEnvironmentInfo(EnvironmentType.production);
              return of(ENVIRONMENTS_MAP[EnvironmentType.production]);
            }

            /// return saved environment data
            this.currentEnvironment = this.getEnvironmentObjectFromType(currentEnvironment.value);
            this.currentEnvironment.partner_services_url =
              this.currentEnvironment.partner_services_url || this.getURLbasedOnPlatform();

            if (overridedEnvironment !== null) {
              this.overridedEnvironment = this.getEnvironmentObjectFromType(overridedEnvironment.value);
              this.overridedEnvironment.partner_services_url =
                this.overridedEnvironment.partner_services_url || this.getURLbasedOnPlatform();
            }

            return of(this.currentEnvironment);
          })
        );
  }

  private setSavedEnvironmentInfo(type: EnvironmentType) {
    this.currentEnvironment = this.getEnvironmentObjectFromType(type);
    this.storageStateService.updateStateEntity(this.currentEnvironmentKey, type, {
      highPriorityKey: true,
      keepOnLogout: true,
    });
  }

  getPartnerServicesURL(): string {
    return this.currentEnvironment?.partner_services_url;
  }

  getEnvironmentObject(): EnvironmentInfo {
    return this.currentEnvironment;
  }

  getServicesURL(): string {
    return this.currentEnvironment?.services_url;
  }

  getSitesURL(): string {
    return this.currentEnvironment.site_url;
  }

  getSecureMessagingAPIURL(): string {
    return this.currentEnvironment.secmsg_api;
  }
  public getHousingAPIURL(): string {
    return this.currentEnvironment.housing_aws_url;
  }
  getImageURL(): string {
    return this.currentEnvironment.image_url;
  }

  overrideEnvironment(environmentName: string) {
    // Remembering previous overrided environment
    this.storageStateService.updateStateEntity(this.overridedEnvironmentKey, this.currentEnvironment.environment, {
      highPriorityKey: true,
      keepOnLogout: true,
    });

    this.overridedEnvironment = this.currentEnvironment;
    this.setSavedEnvironmentInfo(environmentName as EnvironmentType);
  }

  resetEnvironmentAndCreateSession(createSession = false) {
    createSession = createSession || !!this.overridedEnvironment;
    if (this.overridedEnvironment) {
      this.setSavedEnvironmentInfo(this.overridedEnvironment.environment);
      this.overridedEnvironment = null;
      this.storageStateService.deleteStateEntityByKey(this.overridedEnvironmentKey);
    }
    if (createSession) {
      return firstValueFrom(this.authFacadeService.authenticateSystem$().pipe(first()));
    }
    return Promise.resolve();
  }

  private async presentChangeEnvironmentModal() {
    const currentEnv = this.currentEnvironment.environment;

    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Change Environment',
      inputs: [
        {
          name: 'development',
          type: 'radio',
          label: 'Development',
          value: EnvironmentType.develop,
          checked: currentEnv === EnvironmentType.develop,
        },
        {
          name: 'feature1',
          type: 'radio',
          label: 'Feature1',
          value: EnvironmentType.feature1,
          checked: currentEnv === EnvironmentType.feature1,
        },
        {
          name: 'qa',
          type: 'radio',
          label: 'QA',
          value: EnvironmentType.qa,
          checked: currentEnv === EnvironmentType.qa,
        },
        {
          name: 'demo',
          type: 'radio',
          label: 'Demo',
          value: EnvironmentType.demo,
          checked: currentEnv === EnvironmentType.demo,
        },
        {
          name: 'pat',
          type: 'radio',
          label: 'PAT',
          value: EnvironmentType.pat,
          checked: currentEnv === EnvironmentType.pat,
        },
        {
          name: 'production',
          type: 'radio',
          label: 'Production',
          value: EnvironmentType.production,
          checked: currentEnv === EnvironmentType.production,
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.setSavedEnvironmentInfo(data);
          },
        },
      ],
    });

    await alert.present();
    return await alert.onDidDismiss();
  }

  private getEnvironmentObjectFromType(environment: EnvironmentType) {
    return ENVIRONMENTS_MAP[environment];
  }

  private getURLbasedOnPlatform(): string {
    if (Capacitor.getPlatform() === PLATFORM.android) {
      return 'https://ft45xg91ch.execute-api.us-east-1.amazonaws.com/dev';
    } else {
      return 'https://api.payments.demo.cbord.com';
    }
  }
}
