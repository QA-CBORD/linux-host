import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { take } from 'rxjs/operators';
import { UserInfoSet } from '@sections/settings/models/setting-items-config.model';
import { UserNotificationInfo } from '@core/model/user';

@Component({
  selector: 'st-phone-email',
  templateUrl: './phone-email.component.html',
  styleUrls: ['./phone-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEmailComponent implements OnInit {
  phoneEmailForm: FormGroup;
  user: UserInfoSet;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userFacadeService: UserFacadeService,
    private readonly modalController: ModalController,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.initForm();
  }

  async saveChanges() {
    await this.userFacadeService.saveUser$(this.updatedUserModel).toPromise();
  }

  close() {
    this.modalController.dismiss();
  }

  private async initForm() {
    this.phoneEmailForm = this.fb.group({
      [this.controlsNames.email]: ['', Validators.required],
      [this.controlsNames.phone]: ['', Validators.required],
    });
    const user: any = await this.userFacadeService
      .getUserData$()
      .pipe(take(1))
      .toPromise();
    this.user = { ...user };
    this.email.setValue(this.user.email);
    this.phone.setValue(this.user.phone);
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

  get updatedUserModel(): UserInfoSet {
    const user: any = { ...this.user };
    user.phone = this.phone.value;
    user.email = this.email.value;

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

  private setUpdateNotification(type: number, value: string, groupedNotifications: any[], notifications: any[]) {
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
