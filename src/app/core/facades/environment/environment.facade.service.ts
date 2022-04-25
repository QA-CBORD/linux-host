import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';

export enum EnvironmentType {
  develop,
  feature1,
  pat,
  qa,
  demo,
  production,
}

export interface EnvironmentInfo {
  environment: EnvironmentType;
  services_url: string;
  site_url: string;
  secmsg_api: string;
  image_url: string;
  housing_aws_url: string;
  partner_services_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnvironmentFacadeService extends ServiceStateFacade {
  private readonly development: EnvironmentInfo = {
    environment: EnvironmentType.develop,
    services_url: 'https://services.get.dev.cbord.com/GETServices/services',
    site_url: 'https://get.dev.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    // image_url :  'https://object-store.api.dev.cbord.com/image/', once DNS entry is entered
    housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: this.getURLbasedOnPlatform(),
  };

  private readonly feature1: EnvironmentInfo = {
    environment: EnvironmentType.feature1,
    services_url: 'https://services.get.feature1.cbord.com/GETServices/services',
    site_url: 'https://get.feature1.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    // image_url: 'https://object-store.api.feature1.cbord.com/image/', once DNS entry is entered
    housing_aws_url: 'https://z6u8er70s9.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: this.getURLbasedOnPlatform(),
  };

  private readonly qa: EnvironmentInfo = {
    environment: EnvironmentType.qa,
    services_url: 'https://services.get.qa.cbord.com/GETServices/services',
    site_url: 'https://get.qa.cbord.com',
    secmsg_api: 'https://secmsg.api.qa.cbord.com',
    image_url: 'https://object-store.api.qa.cbord.com/image/',
    housing_aws_url: 'https://z4ffq7e1m9.execute-api.us-east-1.amazonaws.com/qa',
    partner_services_url: 'https://api.payments.qa.cbord.com',
  };

  private readonly pat: EnvironmentInfo = {
    environment: EnvironmentType.pat,
    services_url: 'https://services.get.pat.cbord.com/GETServices/services',
    site_url: 'https://get.pat.cbord.com',
    secmsg_api: 'https://secmsg.api.pat.cbord.com',
    image_url: 'https://object-store.api.pat.cbord.com/image/',
    housing_aws_url: 'https://z6u8er70s9.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://api.partnerpayments.pat.cbord.com',
  };

  private readonly demo: EnvironmentInfo = {
    environment: EnvironmentType.demo,
    services_url: 'https://services.get.demo.cbord.com/GETServices/services',
    site_url: 'https://get.demo.cbord.com',
    secmsg_api: 'https://secmsg.api.demo.cbord.com',
    image_url: 'https://object-store.api.demo.cbord.com/image/',
    housing_aws_url: 'https://z4ffq7e1m9.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://api.payments.demo.cbord.com',
  };

  private readonly production: EnvironmentInfo = {
    environment: EnvironmentType.production,
    services_url: 'https://services.get.cbord.com/GETServices/services',
    site_url: 'https://get.cbord.com',
    secmsg_api: 'https://secmsg.api.cbord.com',
    image_url: 'https://object-store.api.cbord.com/image/',
    housing_aws_url: 'https://api.housing.cbord.com',
    partner_services_url: 'https://api.partnerpayments.cbord.com',
  };

  private currentEnvironmentKey = 'current_environment';
  private currentEnvironment: EnvironmentInfo = null;

  constructor(
    private readonly storageStateService: StorageStateService,
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

  private getSavedEnvironmentInfo$(): Observable<EnvironmentInfo> {
    return this.currentEnvironment !== null
      ? of(this.currentEnvironment)
      : this.storageStateService.getStateEntityByKey$<EnvironmentType>(this.currentEnvironmentKey).pipe(
          switchMap(data => {
            /// if no current environment is saved, default to production
            if (data === null) {
              this.setSavedEnvironmentInfo(EnvironmentType.production);
              return of(this.production);
            }
            /// return saved environment data
            this.currentEnvironment = this.getEnvironmentObjectFromType(data.value);
            return of(this.currentEnvironment);
          }),
          take(1)
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
    switch (environment) {
      case EnvironmentType.demo:
        return this.demo;
      case EnvironmentType.develop:
        return this.development;
      case EnvironmentType.feature1:
        return this.feature1;
      case EnvironmentType.pat:
        return this.pat;
      case EnvironmentType.production:
        return this.production;
      case EnvironmentType.qa:
        return this.qa;
    }
  }

  private getURLbasedOnPlatform(): string {
    if (Capacitor.getPlatform() === PLATFORM.android) {
      return 'https://ft45xg91ch.execute-api.us-east-1.amazonaws.com/dev';
    } else {
      return 'https://api.payments.demo.cbord.com';
    }
  }
}
