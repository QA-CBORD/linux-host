import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from '@core/service/modals/modals.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { map, switchMap, take } from 'rxjs/operators';
import { UserInfo, UserNotificationInfo } from '@core/model/user';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { Observable, of } from 'rxjs';
import { EMAIL_REGEXP, INT_REGEXP } from '@core/utils/regexp-patterns';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-phone-email',
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEmailComponent implements OnInit {
  phoneEmailForm: FormGroup;
  user: UserInfo;
  isLoading: boolean;
  title = '';
  private readonly titleUpdateContact: string = 'Email & Phone Number';
  private readonly titleStaleProfile: string = 'Update Contact Information';

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

  ionViewWillEnter() {
    this.title = this.staleProfile ? this.titleStaleProfile : this.titleUpdateContact;
    this.cdRef.detectChanges();
  }

  async saveChanges() {
    this.isLoading = true;
    const user = await this.userFacadeService
      .getUser$()
      .pipe(
        switchMap(userInfoSet => of(this.updatedUserModel(userInfoSet))),
        take(1)
      )
      .toPromise();
    this.userFacadeService.saveUser$(user).subscribe(
      () => {
        this.isLoading = false;
        this.presentToast();
        if (this.staleProfile) {
          this.close();
        }
      },
      () => {
        this.isLoading = false;
        this.onErrorRetrieve('Something went wrong, please try again...');
        this.cdRef.detectChanges();
      },
      () => this.cdRef.detectChanges()
    );
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

  private async initForm() {
    this.phoneEmailForm = this.fb.group({
      [this.controlsNames.email]: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      [this.controlsNames.phone]: [
        '',
        [Validators.required, Validators.pattern(INT_REGEXP), Validators.minLength(10), Validators.maxLength(22)],
      ],
    });
    const user = await this.userFacadeService.getUser$().pipe(take(1)).toPromise();
    this.user = { ...user };
    this.checkFieldValue(this.email, this.user.email);
    this.checkFieldValue(this.phone, this.user.phone);
    this.cdRef.detectChanges();
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
    await this.toastService.showToast({
      message,
      toastButtons: [
        {
          text: 'Retry',
          handler: () => {
            this.saveChanges();
          },
        },
        {
          text: 'Dismiss',
        },
      ],
    });
  }

  private async presentToast(): Promise<void> {
    const message = `Updated successfully.`;
    await this.toastService.showToast({ message, toastButtons: [{ text: 'Dismiss' }] });
  }

  private checkFieldValue(field: AbstractControl, value: string) {
    if (value) {
      field.setValue(value);
      field.markAsDirty();
    }
  }
}

export enum PHONE_EMAIL_CONTROL_NAMES {
  phone = 'phone',
  email = 'email',
}

const DEFAULT_NOTIFICATION_STATUS = 3;

const NOTIFICATION_TYPES = {
  EMAIL: 1,
  PHONE: 2,
};
