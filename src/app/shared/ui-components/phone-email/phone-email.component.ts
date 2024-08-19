import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalsService } from '@core/service/modals/modals.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { debounceTime, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { UserInfo, UserNotificationInfo } from '@core/model/user';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { EMAIL_REGEXP, NON_DIGITS_REGEXP, PHONE_REGEXP } from '@core/utils/regexp-patterns';
import { ToastService } from '@core/service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FocusNextModule } from '@shared/directives/focus-next/focus-next.module';
import { StButtonModule, StHeaderModule, StAlertBannerComponent } from '@shared/ui-components';
import { StInputFloatingLabelModule } from '../st-input-floating-label/st-input-floating-label.module';
import { getUserFullName } from '@core/utils/general-helpers';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserLocalProfileService } from '@shared/services/user-local-profile/user-local-profile.service';
import { PersonalInfoPronounsComponent } from './components/personal-info-pronouns/personal-info-pronouns.component';

@Component({
  selector: 'st-phone-email',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    StButtonModule,
    StInputFloatingLabelModule,
    StHeaderModule,
    StAlertBannerComponent,
    PersonalInfoPronounsComponent,
    FocusNextModule,
    TranslateModule,
  ],
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEmailComponent implements OnInit, OnDestroy {
  private readonly _userLocalProfileService = inject(UserLocalProfileService);
  private readonly _translateService = inject(TranslateService);
  private onDestroy$ = new Subject();

  phoneEmailForm: FormGroup;
  user: UserInfo;
  userFullName = '';
  isLoading: boolean;
  title = '';

  htmlContent$: Observable<string>;
  @Input() staleProfile = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly modalController: ModalsService,
    private readonly toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ionViewWillEnter() {
    this.title = `patron-ui.update_personal_info.${
      this.staleProfile ? 'header_stale_profile' : 'header_update_profile'
    }`;
    this.cdRef.detectChanges();
  }

  async saveChanges() {
    this.isLoading = true;
    this.userFacadeService
      .getUser$()
      .pipe(switchMap(userInfoSet => this.userFacadeService.saveUser$(this.updatedUserModel(userInfoSet))))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.presentToast();
          this._userLocalProfileService.updatePronouns(this.pronouns.value);
          if (this.staleProfile) {
            this.close();
          }
        },
        error: () => {
          this.isLoading = false;
          this.onErrorRetrieve(this._translateService.instant('get_mobile.error.general'));
          this.cdRef.detectChanges();
        },
        complete: () => this.cdRef.detectChanges(),
      });
  }

  async showTOS() {
    if (this.htmlContent$) {
      return;
    }

    this.htmlContent$ = this.contentStringFacadeService
      .fetchContentString$(CONTENT_STRINGS_DOMAINS.get_web_gui, CONTENT_STRINGS_CATEGORIES.termsScreen, 'terms')
      .pipe(
        map(contentString => contentString.value),
        take(1)
      );
  }

  close() {
    this.modalController.dismiss();
  }

  get controlsNames() {
    return PHONE_EMAIL_CONTROL_NAMES;
  }

  get email(): AbstractControl {
    return this.phoneEmailForm.get(this.controlsNames.email);
  }

  get phone(): AbstractControl {
    return this.phoneEmailForm.get(this.controlsNames.phone);
  }

  get pronouns(): AbstractControl {
    return this.phoneEmailForm.get(this.controlsNames.pronouns);
  }

  updatedUserModel(user: UserInfo): UserInfo {
    user.phone = this.phone.value;
    user.email = this.email.value;
    user.staleProfile = false;
    user.lastUpdatedProfile = new Date();

    const notifications = user.userNotificationInfoList.reduce((r, a: UserNotificationInfo, i) => {
      r[a.type] = [...(r[a.type] || []), i];
      return r;
    }, {});
    this.setUpdateNotification(
      NOTIFICATION_TYPES.EMAIL,
      this.email.value,
      notifications,
      user.userNotificationInfoList
    );
    this.setUpdateNotification(
      NOTIFICATION_TYPES.PHONE,
      this.phone.value,
      notifications,
      user.userNotificationInfoList
    );

    return user;
  }

  private setUpdateNotification(type: number, value: string, groupedNotifications: object, notifications: object[]) {
    const notif = groupedNotifications[type];
    if (notif) {
      notif.value = value;
      notif.status = DEFAULT_NOTIFICATION_STATUS;
    } else {
      notifications.push(this.createNotification(type, value));
    }
  }

  private createNotification(type: number, value: string): UserNotificationInfo {
    const notif: UserNotificationInfo = { type, value, status: DEFAULT_NOTIFICATION_STATUS, provider: null };
    return notif;
  }

  private async onErrorRetrieve(message: string) {
    await this.toastService.showError(
      message,
      {
        toastButtons:[
          {
            text: 'Retry',
            handler: () => {
              this.saveChanges();
            },
          },
          {
            text: 'Dismiss',
          },
        ]
      }
    );
  }

  private async presentToast(): Promise<void> {
    await this.toastService.showSuccessToast({
      message: this._translateService.instant('patron-ui.message.save_success'),
      position: 'bottom',
      toastButtons: [
        {
          icon: '/assets/icon/close-x.svg',
        },
      ],
    });
  }

  private checkFieldValue(field: AbstractControl, value: string) {
    if (value) {
      field.setValue(value);
      field.markAsDirty();
    }
  }

  private async initForm() {
    this.phoneEmailForm = this.fb.group({
      [this.controlsNames.email]: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      [this.controlsNames.phone]: [
        '',
        [Validators.required, Validators.pattern(PHONE_REGEXP), Validators.minLength(10), Validators.maxLength(22)],
      ],
      [this.controlsNames.pronouns]: [this._userLocalProfileService.userLocalProfileSignal().pronouns],
    });
    const user = await lastValueFrom(this.userFacadeService.getUser$());
    this.user = { ...user };
    this.userFullName = getUserFullName(user);
    this.onPhoneValueChanges();
    this.checkFieldValue(this.email, this.user.email);
    this.checkFieldValue(this.phone, this.user.phone);
    this.cdRef.detectChanges();
  }

  private onPhoneValueChanges() {
    this.phoneEmailForm
      .get(this.controlsNames.phone)
      .valueChanges.pipe(
        debounceTime(500),
        map(value => value.replace(NON_DIGITS_REGEXP, '')),
        takeUntil(this.onDestroy$)
      )
      .subscribe(cleanedValue => {
        this.updatePhoneNumber(cleanedValue);
      });
  }

  private updatePhoneNumber(cleanedValue: string) {
    const phoneControl = this.phoneEmailForm.get(this.controlsNames.phone);
    phoneControl.patchValue(cleanedValue, { emitEvent: false });
    this.cdRef.detectChanges();
  }
}

export enum PHONE_EMAIL_CONTROL_NAMES {
  phone = 'phone',
  email = 'email',
  pronouns = 'pronouns',
}

const DEFAULT_NOTIFICATION_STATUS = 3;

const NOTIFICATION_TYPES = {
  EMAIL: 1,
  PHONE: 2,
};
