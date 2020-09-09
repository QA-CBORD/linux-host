import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { map, switchMap, take } from 'rxjs/operators';
import { UserInfoSet } from '@sections/settings/models/setting-items-config.model';
import { UserNotificationInfo } from '@core/model/user';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../../content-strings';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { Observable, of } from 'rxjs';
import { EMAIL_REGEXP, INT_REGEXP } from '@core/utils/regexp-patterns';

@Component({
  selector: 'st-phone-email',
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEmailComponent implements OnInit {
  phoneEmailForm: FormGroup;
  user: UserInfoSet;
  isLoading: boolean;
  title: string = '';
  private readonly titleUpdateContact: string = 'Email & Phone Number';
  private readonly titleStaleProfile: string = 'Update Contact Information';

  htmlContent$: Observable<string>;

  @Input() staleProfile = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly contentStringFacadeService: ContentStringsFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly modalController: ModalController,
    private readonly toastController: ToastController,
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
    const user: UserInfoSet = await this.userFacadeService
      .getUser$()
      .pipe(
        switchMap( userInfoSet => of(this.updatedUserModel(<UserInfoSet>userInfoSet))),
        take(1))
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
      .fetchContentString$(CONTENT_STINGS_DOMAINS.get_web_gui, CONTENT_STINGS_CATEGORIES.termsScreen, 'terms')
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
        [Validators.required, Validators.pattern(INT_REGEXP), Validators.minLength(10), Validators.maxLength(10)],
      ],
    });
    const user: any = await this.userFacadeService
      .getUserData$()
      .pipe(take(1))
      .toPromise();
    this.user = { ...user };
    this.checkFieldValue(this.email, this.user.email);
    this.checkFieldValue(this.phone, this.user.phone);
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

  updatedUserModel(user: UserInfoSet): UserInfoSet {
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

  private setUpdateNotification(type: number, value: string, groupedNotifications: any, notifications: any[]) {
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
    const toast = await this.toastController.create({
      message,
      position: 'top',
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            this.saveChanges();
          },
        },
        {
          text: 'Dismiss',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }

  private async presentToast(): Promise<void> {
    const message = `Updated successfully.`;
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      closeButtonText: 'Dismiss',
      showCloseButton: true,
    });
    await toast.present();
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
