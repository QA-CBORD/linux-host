import { map, take, concatMap, reduce } from 'rxjs/operators';
import { UserInfo } from '@core/model/user';
import {
  SettingsServices,
  SettingItemConfig,
  HTMLContentString,
  DomainContentString,
} from '../models/setting-items-config.model';
import { Settings } from 'src/app/app.global';
import { from, concat, zip } from 'rxjs';
import { SETTINGS_ID } from '../models/settings-id.enum';
import { PinAction } from '@shared/ui-components/pin/pin.page';

export function getCardStatus(services: SettingsServices): Promise<boolean> {
  return services.userService
    .getUserData$()
    .pipe(map((userInfo: UserInfo) => userInfo.hasCashlessCard && userInfo.cashlessMediaStatus === 2))
    .toPromise();
}

export async function setBiometricStatus(services: SettingsServices): Promise<void> {
  const setting: SettingItemConfig = this;
  setting.checked = await services.identity.cachedBiometricsEnabledUserPreference$;
}

export async function setReportCardLabel(services: SettingsServices): Promise<void> {
  const setting: SettingItemConfig = this;
  setting.label = await services.userService
    .getUserState$()
    .pipe(map(user => (user.cashlessMediaStatus === 2 ? setting.toggleLabel.checked : setting.toggleLabel.unchecked)));
}

export function toggleBiometricStatus(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = function() {
    return services.identity
      .setBiometricsEnabled(!setting.checked)
      .then(async () => await setting.setToggleStatus(services));
  };
}

export function handlePinAccess(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function() {
    const biometricsEnabled = await services.identity.cachedBiometricsEnabledUserPreference$;
    services.globalNav.hideNavBar();
    return services.identity
      .pinLoginSetup(biometricsEnabled, false, {
        showDismiss: true,
        pinAction: biometricsEnabled ? PinAction.CHANGE_PIN_BIOMETRIC : PinAction.CHANGE_PIN_ONLY,
      })
      .finally(() => services.globalNav.showNavBar());
  };
}

export function handleOpenHTMLModal(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function() {
    const content = setting.modalContent as HTMLContentString;
    content.appendStrings = content.appendStrings || [];
    const htmlContent = concat(
      from(content.contentStrings).pipe(
        concatMap((contenString: DomainContentString) => {
          const { domain, category, name } = contenString;
          return services.contentString.fetchContentString$(domain, category, name).pipe(
            map(st => st.value),
            take(1)
          );
        })
      ),
      from(content.appendStrings)
    )
      .pipe(
        take(content.contentStrings.length + content.appendStrings.length),
        reduce((htmlString, content) => htmlString + content)
      )
      .toPromise();

    const componentProps = {
      htmlContent,
      title: setting.label,
      onClose: () => {
        services.globalNav.showNavBar();
        services.modalController.dismiss();
      },
    };
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

    const link = await linkPromise;
    setting.callback = async function() {
      services.appBrowser.create(link, '_system');
    };
  }
  if (resource.type === 'link') {
    /// TODO this will be re-written after MVP.. I'm sorry... it's nasty
    setting.callback = async function() {
      const target: string =
        setting.id === SETTINGS_ID.mealPlan
          ? 'change_meal_plan'
          : setting.id === SETTINGS_ID.mealPurchase
          ? 'purchase_meal_plan'
          : 'not used';
      linkPromise = zip(services.institution.cachedInstitutionInfo$, services.authService.getAuthenticationToken$())
        .pipe(
          map(([inst, token]) => {
            const urlEnd =
              setting.id === SETTINGS_ID.password
                ? `full/${resource.value}`
                : `full/link_in.php?session_token=${token}&target=${target}&sa=1`;
            return `${services.environment.getSitesURL()}/${inst.shortName}/${urlEnd}`;
          }),
          take(1)
        )
        .toPromise();
      const link = await linkPromise;
      services.appBrowser.create(link, '_system');
    };
  }
}
