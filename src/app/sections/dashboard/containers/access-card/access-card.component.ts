import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Observable, Subject, firstValueFrom, lastValueFrom, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { AccessCardService } from './services/access-card.service';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION, Settings, User } from 'src/app/app.global';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { AppleWalletInfo } from '@core/provider/native-provider/native.provider';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TOAST_DURATION } from '@shared/model/generic-constants';
import { TranslateService } from '@ngx-translate/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_MESSAGES } from 'src/app/content-strings';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PronounsPipe } from '@shared/pipes/pronouns-pipe/pronouns.pipe';
import { SilentEventCategory, SilentEventStatus, SilentNotificationService } from '@sections/notifications/services/silent-notification.service';
import { PhotoUploadInfo } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
  imports: [IonicModule, CommonModule, PronounsPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessCardComponent implements OnInit, AfterViewInit {
  userLocalProfileSignal = this.accessCardService.getUserLocalProfileSignal();
  private readonly _userPhotoSubject = new Subject<string>();
  userPhoto$: Observable<string> = this._userPhotoSubject.asObservable();
  institutionName$: Observable<string>;
  institutionColor$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  isMobileAccessButtonEnabled$: Observable<boolean>;
  appleWalletEnabled = false;
  appleWalletInfo: AppleWalletInfo;
  cardStatusMessage: string;
  appleWalletMessageImage: string;
  appleWalletButtonHidden = true;
  photoAvailable = false;
  mobileCredentialAvailable = false;
  housingOnlyEnabled: boolean;

  constructor(
    private readonly accessCardService: AccessCardService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly changeRef: ChangeDetectorRef,
    public readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly profileService: ProfileServiceFacade,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly toastSerice: ToastService,
    private readonly traslateService: TranslateService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService
  ) { }

  private readonly loadingService = inject(LoadingService);
  private readonly silentNotificationService = inject(SilentNotificationService);

  ngOnInit() {
    this.setHousingOnlyEnabled();
    this.setInstitutionData();
    this.getFeaturesEnabled();
    this.initContentString();
  }

  ionViewWillLeave() {
    this.silentNotificationService.removeLastListener();
  }

  async initContentString() {
    await lastValueFrom(
      this.contentStringsFacadeService.fetchContentString$(
        CONTENT_STRINGS_DOMAINS.get_mobile,
        CONTENT_STRINGS_CATEGORIES.photoUpload,
        CONTENT_STRINGS_MESSAGES.requiredMessage
      )
    );
  }

  ngAfterViewInit(): void {
    this.mobileCredentialFacade.setCredentialStateChangeListener(this);
    this.loadScanCardInputs();
  }

  onCredentialStateChanged(): void {
    this.changeRef.detectChanges();
  }

  ionViewWillEnter() {
    this.mobileCredentialFacade.refreshCredentials();
    this.getUserData();
    this.updateProfilePhoto();
  }

  private getUserData() {
    this.accessCardService
      .getUserPhoto()
      .pipe(
        tap(photo => {
          this.photoAvailable = !!photo;
          this._userPhotoSubject.next(photo);
          this.changeRef.detectChanges();
        }),
        catchError(() => of(null))
      )
      .subscribe();
  }

  async loadScanCardInputs() {
    await Promise.all([
      firstValueFrom(this.barcodeFacadeService.fetchUserSetting(User.Settings.CASHLESS_KEY)),
      firstValueFrom(this.barcodeFacadeService.fetchSetting(Settings.Setting.SOA_KEY)),
      firstValueFrom(this.barcodeFacadeService.fetchSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE)),
    ]);
  }

  private setInstitutionData() {
    this.institutionColor$ = this.accessCardService
      .getInstitutionColor()
      .pipe(map(v => '#' + (JSON.parse(v) ? JSON.parse(v)['native-header-bg'] : '')));
    this.institutionName$ = this.accessCardService.getInstitutionName();
    this.institutionPhoto$ = this.accessCardService
      .getInstitutionImage()
      .pipe(map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)));
    this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
  }

  private getFeaturesEnabled() {
    this.getMyCardEnabled$ = this.accessCardService.isGETMyCardEnabled();
    this.isMobileAccessButtonEnabled$ = this.accessCardService.isMobileAccessEnable();
  }

  async onMobileAccessClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([PATRON_NAVIGATION.mobileAccess], { queryParams: { color } });
  }

  async onScanCardClick(): Promise<void> {
    const color = await this.institutionColor$.pipe(first()).toPromise();
    await this.router.navigate([PATRON_NAVIGATION.dashboard, DASHBOARD_NAVIGATE.scanCard], {
      queryParams: { color },
    });
  }

  private async setHousingOnlyEnabled() {
    this.housingOnlyEnabled = await this.profileService.housingOnlyEnabled();
  }

  onWalletClicked() {
    if (this.photoAvailable) {
      this.mobileCredentialFacade.onImageClick();
      return;
    }

    this.toastSerice.showError(
      { message: this.traslateService.instant('get_mobile.photo_upload.required_message'),
      duration: TOAST_DURATION,
      position: 'bottom' }
    );
  }

  private updateProfilePhoto() {
    this.silentNotificationService.addListener(SilentEventCategory.PHOTO_UPLOAD_UPDATE, (event: PhotoUploadInfo) => {

      const isCurrentUser = this.silentNotificationService.isSentToCurrentUser(event?.userId);
      const isEventStatusAccepted = event?.status === SilentEventStatus.ACCEPTED;
      if (!isCurrentUser || !isEventStatusAccepted) return;

      this.loadingService.showSpinner();
      this.getUserData();
      this.loadingService.closeSpinner();
    });
  }
}
