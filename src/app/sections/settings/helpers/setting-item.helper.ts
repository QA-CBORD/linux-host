/* eslint-disable @typescript-eslint/no-this-alias */
import { map, take, concatMap, reduce, switchMap } from 'rxjs/operators';
import {
  SettingsServices,
  SettingItemConfig,
  HTMLContentString,
  DomainContentString,
  StatusSettingValidation,
} from '../models/setting-items-config.model';
import { Settings } from 'src/app/app.global';
import { from, concat, zip, Observable } from 'rxjs';
import { SETTINGS_ID } from '../models/settings-id.enum';
import { ReportCardStatus } from '../models/report-card-status.config';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { PinAction } from '@core/service/identity/model.identity';

export function getCardStatusValidation(services: SettingsServices): Observable<string> {
  const statusValidation = this as StatusSettingValidation;
  return services.userService
    .getUserData$()
    .pipe(map(({ cashlessMediaStatus }) => statusValidation.validation[cashlessMediaStatus]));
}

export async function setBiometricStatus(services: SettingsServices): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const setting: SettingItemConfig = this;
  setting.checked = await services.identity.biometricsEnabledAtPhoneSettings$;
}

export function setReportCardLabel(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.label = services.userService.getUserState$().pipe(
    switchMap(user => {
      const lcEnabled$ = services.settings.getSetting(Settings.Setting.REPORT_LOST_CARD_ENABLED);
      const fcEnabled$ = services.settings.getSetting(Settings.Setting.REPORT_FOUND_CARD_ENABLED);
      return zip(lcEnabled$, fcEnabled$).pipe(
        map(([{ value: lsEnabled }, { value: fcEnabled }]) => {
          let result = null;
          if (user.cashlessMediaStatus === ReportCardStatus.LOST) {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(+fcEnabled)) {
              result = setting.toggleLabel.checked;
            }
          // eslint-disable-next-line no-extra-boolean-cast
          } else if (Boolean(+lsEnabled)) {
            result = setting.toggleLabel.unchecked;
          }
          return result;
        })
      );
    })
  );
}

export function toggleBiometricStatus(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = function() {
    return services.identity
      .setBiometricsEnabled(!setting.checked)
      .then(() => setting.setToggleStatus(services));
  };
}

export function handlePinAccess(services: SettingsServices) {
  const setting: SettingItemConfig = this;
  setting.callback = async function () {
    const biometricsEnabled = await services.identity.biometricsEnabledAtPhoneSettings$;
    return services.identity
      .pinLoginSetup(biometricsEnabled, false, {
        navigateBackOnClose: true,
        showDismiss: true,
        pinAction: biometricsEnabled ? PinAction.CHANGE_PIN_BIOMETRIC : PinAction.CHANGE_PIN_ONLY,
      }).catch(error => console.info('pinLoginSetup response:', error));
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
        services.modalController.dismiss();
      },
    };
    const settingModal = await services.modalController.create({
      backdropDismiss: false,
      component: setting.modalContent.component,
      componentProps,
    });
    return settingModal.present();
  };
}

export async function openModal(services: SettingsServices) {
  const setting: SettingItemConfig = this;

  setting.callback = async function() {
    let componentData = {};
    if (setting.modalContent.fetchData) componentData = await setting.modalContent.fetchData(services);

    const settingModal = await services.modalController.create({
      backdropDismiss: false,
      component: setting.modalContent.component,
      componentProps: { ...componentData },
    });
    return settingModal.present();
  };
}

export async function openPopover(services: SettingsServices) {
  const setting: SettingItemConfig = this;

  setting.callback = async function() {
    let componentData = {};
    if (setting.modalContent.fetchData) componentData = await setting.modalContent.fetchData(services);

    const settingModal = await services.modalController.createAlert({
      backdropDismiss: false,
      component: setting.modalContent.component,
      componentProps: { ...componentData },
    });
    return settingModal.present();
  };
}

export async function contentStringsByCategory(
  services: SettingsServices,
  contentStrings: DomainContentString[]
): Promise<[ContentStringInfo[]]> {
  const contentStringList: [ContentStringInfo[]] = [[]];
  for (const content of contentStrings) {
    if (content.name === null) {
      const item = await services.contentString
        .fetchContentStrings$(content.domain, content.category)
        .pipe(take(1))
        .toPromise();
      contentStringList.push(item);
    }
  }
  return contentStringList;
}

export async function openSiteURL(services: SettingsServices): Promise<void> {
  const inAppBrowserTarget = '_blank'; // '_system'
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
      // We need for the device to handle the mailto intent.
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
      services.appBrowser.create(link, inAppBrowserTarget, { location: 'no' });
    };
  }
}
