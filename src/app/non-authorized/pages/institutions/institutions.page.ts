import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { ROLES, Settings } from 'src/app/app.global';
import { zip } from 'rxjs';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { StGlobalPopoverComponent } from '@shared/ui-components';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import {Plugins, Capacitor } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
const { Keyboard, IOSDevice, Device } = Plugins;

@Component({
  selector: 'st-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstitutionsPage implements OnInit {
  private sessionId: string = null;
  searchString: string = '';

  isLoading: boolean = true;
  institutions: any[];
  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly nativeStartupFacadeService: NativeStartupFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly popoverCtrl: PopoverController,
    private readonly nav: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastController: ToastController,
    private readonly route: Router
  ) {}

  async ngOnInit() {
    this.getInstitutions();
    this.setNativeEnvironment();
  }

  onEnterKeyClicked() {
    Keyboard.hide();
  }

  onSearchedValue({ target: { value } }: any) {
    this.searchString = value;
  } 

  async getInstitutions() {
    this.authFacadeService
    .getAuthSessionToken$()
    .pipe(
      tap(sessionId => (this.sessionId = sessionId)),
      switchMap(sessionId => this.institutionFacadeService.retrieveLookupList$(sessionId)),
      take(1)
    )
    .subscribe(institutions => {
      this.institutions = institutions;
      this.isLoading = false;
      this.cdRef.markForCheck();
    }, 
    () => {
      this.isLoading = false;
      this.onErrorRetrieve('Something went wrong, please try again...');
    });
  }

  async selectInstitution(id: string) {
    await this.loadingService.showSpinner();
    this.settingsFacadeService.cleanCache();
    await zip(
      this.settingsFacadeService.fetchSettingList(Settings.SettingList.FEATURES, this.sessionId, id),
      this.settingsFacadeService.getSettings(
        [Settings.Setting.MOBILE_HEADER_COLOR, Settings.Setting.FEEDBACK_EMAIL],
        this.sessionId,
        id
      ),
      this.settingsFacadeService.getSetting(Settings.Setting.PIN_ENABLED, this.sessionId, id),
      this.institutionFacadeService.getInstitutionDataById$(id, this.sessionId, true),
    )
      .pipe(
        switchMap(() => this.sessionFacadeService.determineInstitutionSelectionLoginState()),
        switchMap(
          (loginState): any => {
            return this.nativeStartupFacadeService.fetchNativeStartupInfo(id, this.sessionId, false).pipe(
              map(startupInfoConfig => ({
                loginState,
                startupInfoConfig,
              }))
            );
          }
        ),
        tap(data => {
          if (data && data['startupInfoConfig']) {
            const { title, message, arrOfBtns } = data['startupInfoConfig'];
            this.initModal(title, message, arrOfBtns, this.redirectToTheStore.bind(this));
          }
          this.loadingService.closeSpinner();
          switch (data['loginState']) {
            case LoginState.HOSTED:
              this.nav.navigate([ROLES.guest, GUEST_ROUTES.login]);
              break;
            case LoginState.EXTERNAL:
              this.nav.navigate([ROLES.guest, GUEST_ROUTES.external]);
              break;
          }
        }),
        take(1)
      )
      .toPromise();
  }

  private async initModal(title, message, buttons, onSuccessCb): Promise<void> {
    const modal = await this.popoverCtrl.create({
      component: StGlobalPopoverComponent,
      componentProps: {
        data: {
          title,
          message,
          buttons,
        },
      },
      animated: false,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then(({ role }) => {
      role === BUTTON_TYPE.OKAY && onSuccessCb();
    });

    await modal.present();
  }

  private redirectToTheStore() {
    Device.getInfo()
      .then(deviceInfo => {
        if (deviceInfo.platform === 'ios') {
          window.open('itms-apps://itunes.apple.com/app/id844091049');
        } else if (deviceInfo.platform === 'android') {
          window.open('https://play.google.com/store/apps/details?id=com.cbord.get');
        }
      })
      .catch(reason => {
      });
  }

  private async onErrorRetrieve(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      buttons: [ 
        {
          text: 'Retry',
          handler: () => {
            this.getInstitutions();
          }
        },
        {
          text: 'Back',
          handler: () => {
            this.route.navigate([ROLES.guest, GUEST_ROUTES.entry]);
          }
        }
      ]
    });
    toast.present();
  }

  async setNativeEnvironment() {
    if (Capacitor.platform === 'ios') {
      await IOSDevice.setEnvironment({ env: this.environmentFacadeService.getEnvironmentObject() });
    }
  }
}
