import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GUEST_ROUTES } from '../../non-authorized.config';
import { ROLES, Settings } from 'src/app/app.global';
import { Observable, of, zip } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { Plugins, Capacitor } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { RegistrationServiceFacade } from '../registration/services/registration-service-facade';
import { InstitutionLookupListItem } from '@core/model/institution';
const { Keyboard, IOSDevice } = Plugins;

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
  institutions: InstitutionLookupListItem[];
  guestRegistrationEnabled: boolean = false;
  expandedItem: any;
  asGuestBtnText$: Observable<string>;
  asPatronBtnText$: Observable<string>;

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly loadingService: LoadingService,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly nav: Router,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly route: Router,
    private readonly registrationServiceFacade: RegistrationServiceFacade
  ) {}

  async ngOnInit() {
    this.getInstitutions();
    this.setNativeEnvironment();
    const data = await this.registrationServiceFacade.registrationContent();
    this.asGuestBtnText$ = of(data.as_guest_btn_text);
    this.asPatronBtnText$ = of(data.as_patron_btn_text);
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
      .subscribe(
        institutions => {
          this.institutions = institutions;
          this.isLoading = false;
          this.cdRef.markForCheck();
        },
        () => {
          this.isLoading = false;
          this.onErrorRetrieve('Something went wrong, please try again...');
        }
      );
  }

  private toggleContextMenuPanel(item): void {
    if (this.expandedItem) {
      if (item.id != this.expandedItem.id) {
        item.show = true;
        this.expandedItem.show = false;
        this.expandedItem = item;
      } else {
        item.show = false;
        this.expandedItem = null;
      }
    } else {
      item.show = true;
      this.expandedItem = item;
    }
  }

  onInstitutionSelected(institution): void {
    if (institution.guestAllowed) {
      this.toggleContextMenuPanel(institution);
      this.cdRef.detectChanges();
    } else {
      this.navigate(institution);
    }
  }

  private async navigate({ id }, navigateAsGuest = false) {
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
      this.institutionFacadeService.getInstitutionDataById$(id, this.sessionId, true)
    )
      .pipe(
        switchMap(() => this.sessionFacadeService.determineInstitutionSelectionLoginState()),
        tap(loginType => {
          this.loadingService.closeSpinner();
          this.navigateToLogin(loginType, navigateAsGuest);
        }),
        take(1)
      )
      .toPromise();
  }

  onContextMenuButton(item, navigateAsGuest): void {
    this.navigate(item, navigateAsGuest);
    item.show = false;
  }

  private navigateToLogin(loginState: number, asGuest: boolean = false) {
    switch (loginState) {
      case LoginState.HOSTED:
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.login], { state: { asGuest } });
        break;
      case LoginState.EXTERNAL:
        this.nav.navigate([ROLES.guest, GUEST_ROUTES.external]);
        break;
    }
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showToast({
      message,
      toastButtons: [
        {
          text: 'Retry',
          handler: () => {
            this.getInstitutions();
          },
        },
        {
          text: 'Back',
          handler: () => {
            this.route.navigate([ROLES.guest, GUEST_ROUTES.entry]);
          },
        },
      ],
    });
  }

  async setNativeEnvironment() {
    if (Capacitor.platform === 'ios') {
      await IOSDevice.setEnvironment({ env: this.environmentFacadeService.getEnvironmentObject() });
    }
  }

  async expandAccordion(id): Promise<boolean> {
    return await this.institutionFacadeService.guestRegistrationEnabled(id);
  }
}
