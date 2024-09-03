import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/settings/settings.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingItemConfig, SettingsSectionConfig } from './models/setting-items-config.model';
import { SettingsFactoryService } from './services/settings-factory.service';
import { map, take, switchMap, catchError, first } from 'rxjs/operators';
import { BehaviorSubject, firstValueFrom, from, Observable, of } from 'rxjs';
import { getUserFullName } from '@core/utils/general-helpers';
import { UserInfo } from '@core/model/user';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { App } from '@capacitor/app';
import { EnvironmentData } from '@environments/environment-data';
import { CartService } from '@sections/ordering';
import { PhotoUploadInfo } from './pages/photo-upload/photo-upload.component';
import { SilentEventCategory, SilentEventStatus, SilentNotificationService } from '@sections/notifications/services/silent-notification.service';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage implements OnInit {
  settingSections$: Promise<SettingsSectionConfig[]>;
  appVersion$: Observable<string>;
  userName$: Observable<string>;
  institutionName$: Observable<string>;

  isGuest: boolean;
  isHousingOnly: boolean;

  private photoSubject = new BehaviorSubject<string>(null);
  userPhoto$: Observable<string> = this.photoSubject.asObservable();

  constructor(
    private router: Router,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly authFacadeService: AuthFacadeService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly settingsFactory: SettingsFactoryService,
    private readonly route: ActivatedRoute,
    private readonly profileService: ProfileServiceFacade,
    private readonly cartService: CartService,
  ) { }

  private readonly loadingService = inject(LoadingService);
  private readonly silentNotificationService = inject(SilentNotificationService);
  private readonly cdRef = inject(ChangeDetectorRef);

  async ngOnInit() {
    this.settingSections$ = this.settingsFactory.getSettings();
    this.userName$ = this.getUserName$();
    this.institutionName$ = this.getInstitutionName$();
    this.appVersion$ = this.getAppVersion$();
    this.authFacadeService
      .isGuestUser()
      .toPromise()
      .then(isGuest => (this.isGuest = isGuest));
    this.isHousingOnly = await this.profileService.housingOnlyEnabled();
    this.updateProfilePhoto();
  }

  ionViewWillEnter() {
    this.onPhotoUploadEvent();
  }

  ionViewWillLeave() {
    this.silentNotificationService.removeLastListener();
  }

  //couldnt get photo upload route to work correctly, still trying to fix
  async navigateToPhotoUpload(): Promise<void> {
    const isPhotoVisible = await firstValueFrom(this.settingsFactory.photoUploadVisible$);
    const isPhotoUpdateEnabled = await firstValueFrom(this.settingsFactory.photoUploadEnabled$);

    if (!isPhotoVisible || !isPhotoUpdateEnabled || this.isHousingOnly) {
      return;
    }

    this.router.navigate([PATRON_NAVIGATION.settings, LOCAL_ROUTING.photoUpload]);
  }

  async settingTap(setting: SettingItemConfig) {
    setting.callback && (await setting.callback());
    setting.navigate && this.router.navigate(setting.navigate, { relativeTo: this.route });
  }

  logout() {
    this.sessionFacadeService.logoutUser();
    this.cartService.clearState();
  }

  getAppVersion$(): Observable<string> {
    return from(App.getInfo()).pipe(
      map(({ version }) => version),
      take(1),
      catchError(() => of(EnvironmentData.version.versionNumber))
    );
  }

  getUserName$(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)));
  }

  getUserPhoto$(): Observable<string> {
    return this.userFacadeService.getAcceptedPhoto$().pipe(catchError(() => of('../../../assets/images/no_photo.svg')));
  }

  getInstitutionName$(): Observable<string> {
    return this.userFacadeService.getUserData$().pipe(
      switchMap(({ institutionId }) => this.institutionFacadeService.getInstitutionInfo$(institutionId)),
      map(({ name }) => name)
    );
  }

  private onPhotoUploadEvent() {
    this.silentNotificationService.addListener(SilentEventCategory.PHOTO_UPLOAD_UPDATE, (event: PhotoUploadInfo) => {

      const isCurrentUser = this.silentNotificationService.isSentToCurrentUser(event?.userId);
      const isEventStatusAccepted = event?.status === SilentEventStatus.ACCEPTED;
      if (!isCurrentUser || !isEventStatusAccepted) return;

      this.loadingService.showSpinner();
      this.updateProfilePhoto();
      this.loadingService.closeSpinner();
    });
  }

  private updateProfilePhoto() {
    this.getUserPhoto$().pipe(first()).subscribe(photo => {
      this.photoSubject.next(photo);
      this.cdRef.detectChanges();
    });
  }
}
