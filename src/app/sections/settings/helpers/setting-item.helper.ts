import { map, take } from 'rxjs/operators';
import { UserInfo } from '@core/model/user';
import { SettingsServices, SettingItemConfig, HTMLContentString } from '../models/setting-items-config.model';
import { SETTINGS_ID } from '../settings.config';

export function getCardStatus(services: SettingsServices): Promise<boolean> {
  return services.userService
    .getUserData$()
    .pipe(map((userInfo: UserInfo) => userInfo.hasCashlessCard && userInfo.cashlessMediaStatus === 2))
    .toPromise();
}

export function handleLoginAccess(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = function() {
    return services.identityService.pinLoginSetup(setting.id === SETTINGS_ID.faceId, false);
  };
}

export function handleOpenHTMLModal(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function() {
    const { domain, category, name } = setting.modalContent as HTMLContentString;
    const htmlContent = await services.contentStringService
      .fetchContentString$(domain, category, name)
      .pipe(
        map(st => st.value),
        take(1)
      )
      .toPromise();
    const buttons = [
      {
        label: 'Close',
        callback: () => {
          services.globalNav.showNavBar();
          services.modalController.dismiss();
        },
      },
    ];
    const componentProps = { htmlContent, buttons };
    const settingModal = await services.modalController.create({
      backdropDismiss: false,
      component: setting.modalContent.component,
      componentProps,
    });
    services.globalNav.hideNavBar();
    return settingModal.present();
  };
}

export async function openModal(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function() {
    const settingModal = await services.modalController.create({
      backdropDismiss: false,
      component: setting.modalContent.component,
    });
    services.globalNav.hideNavBar();
    return settingModal.present();
  };
}
