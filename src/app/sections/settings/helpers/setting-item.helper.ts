import { map, take } from 'rxjs/operators';
import { UserInfo } from '@core/model/user';
import { SettingsServices, SettingItemConfig, HTMLContentString } from '../models/setting-items-config.model';
import { Settings } from 'src/app/app.global';
import { AuthTypes } from '@core/utils/auth-types.enum';

export function getCardStatus(services: SettingsServices): Promise<boolean> {
  return services.userService
    .getUserData$()
    .pipe(map((userInfo: UserInfo) => userInfo.hasCashlessCard && userInfo.cashlessMediaStatus === 2))
    .toPromise();
}

export function handleLoginAccess(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = function() {
    return services.identity.pinLoginSetup(
      setting.validations.some(validation => validation.value === AuthTypes.FACE),
      false
    );
  };
}

export function handleOpenHTMLModal(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function() {
    const { domain, category, name } = setting.modalContent as HTMLContentString;
    const htmlContent = await services.contentString
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
    settingModal.onDidDismiss().then(() => services.globalNav.showNavBar());
    return settingModal.present();
  };
}

export async function openSiteURL(services: SettingsServices): Promise<void> {
  const setting: SettingItemConfig = this;
  const resource = setting.navigateExternal;
  let linkPromise: Promise<string>;

  if (resource.type === 'email') {
    linkPromise = services.settings
      .getSetting(resource.value as Settings.Setting)
      .pipe(
        map(emailSetting => 'mailto:' + emailSetting.value),
        take(1)
      )
      .toPromise();
  }
  if (resource.type === 'link') {
    linkPromise = services.institution.cachedInstitutionInfo$
      .pipe(
        map(inst => `${services.environment.getSitesURL()}/${inst.shortName}/full/${resource.value}`),
        take(1)
      )
      .toPromise();
  }
  const link = await linkPromise;

  setting.callback = async function() {
    window.open(link, '_system');
  };
}
