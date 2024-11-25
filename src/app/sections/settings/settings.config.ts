/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SettingItemConfig,
  SettingItemValidation,
  SettingsSectionConfig,
  SettingsServices,
  SETTINGS_VALIDATIONS,
  StatusSettingValidation,
} from './models/setting-items-config.model';
import { PaymentSystemType, Settings } from 'src/app/app.global';
import {
  handleOpenHTMLModal,
  openSiteURL,
  openModal,
  toggleBiometricStatus,
  setBiometricStatus,
  handlePinAccess,
  setReportCardLabel,
  getCardStatusValidation,
  contentStringsByCategory,
  openPopover,
} from './helpers/setting-item.helper';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_MESSAGES } from 'src/app/content-strings';
import { HTMLRendererComponent } from '@shared/ui-components/html-renderer/html-renderer.component';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { EditHomePageModalComponent } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.component';
import { SETTINGS_ID } from './models/settings-id.enum';
import { ReportCardStatusSetting } from './models/report-card-status.config';
import { ReportCardComponent } from './pages/report-card/report-card.component';
import { MobileCredentialMetadata } from './pages/credential-metadata/mobile-credential-metadata.page';
import { PasswordChangeComponent } from '@shared/ui-components/change-password/password-change.component';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { LoginState } from '@core/facades/identity/identity.facade.service';
import { configureBiometricsConfig } from '@core/utils/general-helpers';
import { APP_PROFILES } from '@sections/dashboard/models';
import { CreditCardMgmtComponent } from './creditCards/credit-card-mgmt/credit-card-mgmt.component';
import { CreditCardAccount, UserAccount } from '@core/model/account/account.model';
import { CREDITCARD_ICONS, CREDITCARD_TYPE } from '@sections/accounts/accounts.config';
import { reduceToObject } from '@shared/model/content-strings/content-string-utils';
import { defaultCreditCardMgmtCs } from '@shared/model/content-strings/default-strings';
import { firstValueFrom, merge, of } from 'rxjs';
import { CreditPaymentMethods } from '@core/model/account/credit-payment-methods.model';
import { MobileCredentialsUnlinkService } from '@shared/ui-components/mobile-credentials/service/mobile-credentials-unlink.service';
import { UnlinkCredentialsComponent } from './pages/unlink-credentials/unlink-credentials.component';
import { EditNavigationComponent } from './pages/edit-navigation/edit-navigation/edit-navigation.component';

export enum LOCAL_ROUTING {
  photoUpload = 'photo-upload',
}
export enum SETTINGS_NAVIGATE {
  personalData = 'email-pwd',
  updatePhoto = 'photo-upload',
  lostCard = 'lost-card',
  password = 'pwd-change',
  faceId = 'face-id',
  pin = 'pin-change',
  devices = 'report-lost',
  address = 'my-addresses',
  paymentMethods = 'payment-methods',
  deposits = 'auto-deposits',
  mealPlan = 'meal-plan-change',
  mealPurchase = 'meal-plan-purchase',
  theme = 'theme-change',
  home = 'home-edit',
  navigate = 'nav-edit',
  feedback = 'feedback-sending',
  help = 'help',
  support = 'email-support',
  terms = 'terms-privacy',
}

export const PHOTO_UPLOAD_MESSAGE = 'The Update Photo option is currently turned off.';

const isGuestUser = async function (services: SettingsServices): Promise<boolean> {
  const authService = services.authService;
  return firstValueFrom(authService.isGuestUser());
};

const determineIsGuest = async (
  services: SettingsServices,
  self: SettingItemConfig,
  inner: () => Promise<boolean>
): Promise<boolean> => {
  return isGuestUser(services).then(async isGuest => {
    if (isGuest && self.studentsOnly) return false;
    return await inner();
  });
};

const asyncCheckEvery = async function (
  validations: SettingItemValidation[],
  services: SettingsServices
): Promise<boolean[]> {
  const checks: boolean[] = [];
  for (const validation of validations) {
    const statusValidation = validation.value as StatusSettingValidation;
    checks.push(
      await firstValueFrom(
        statusValidation.getStatusValidation(services).pipe(
          switchMap(setting =>
            services.settings
              .getSetting(setting as Settings.Setting)
              .pipe(map(({ value }): boolean => parseInt(value) === 1))
          ),
          take(1)
        )
      )
    );
  }
  return checks;
};

const asyncCheckEverySetting = async function (validations: SettingItemValidation[], services: SettingsServices) {
  const checks: boolean[] = [];
  for (const validation of validations) {
    checks.push(
      await firstValueFrom(
        services.settings.getSetting(validation.value as Settings.Setting).pipe(
          map(({ value }): boolean => parseInt(value) === 1),
          catchError(() => of(false))
        )
      )
    );
  }
  return checks;
};

const validateSettingEnabled = async function (services: SettingsServices): Promise<boolean> {
  if ((await isSupportedInCurrentProfile(services))(this)) {
    return await determineIsGuest(services, this, async () =>
      (await asyncCheckEverySetting(this.validations, services)).every(checkTrue => checkTrue)
    );
  }
  return false;
};

const isSupportedInCurrentProfile = async function (services: SettingsServices) {
  const currentProfile = await firstValueFrom(services.profileService.determineCurrentProfile$());
  return function (settingItem: SettingItemConfig) {
    if (!currentProfile) return true;
    if (settingItem.supportProfiles && settingItem.supportProfiles.length) {
      return settingItem.supportProfiles.includes(currentProfile);
    }
    return true;
  };
};

export const SETTINGS_CONFIG: SettingsSectionConfig[] = [
  {
    label: 'Your card',
    items: [
      {
        id: SETTINGS_ID.updatePhoto,
        icon: 'update-photo',
        label: 'Update photo',
        type: 'button',
        studentsOnly: true,
        navigate: [SETTINGS_NAVIGATE.updatePhoto],
        supportProfiles: [APP_PROFILES.patron, APP_PROFILES.guest],
        checkIsVisible: async function (services: SettingsServices) {
          if ((await isGuestUser(services)) || !(await isSupportedInCurrentProfile(services))(this)) return false;

          const isDisabledSetting = await firstValueFrom(
            services.settings.getSetting(Settings.Setting.PHOTO_UPLOAD_GRAYEDOUT)
          );
          const messageString = await firstValueFrom(
            services.contentString.fetchContentString$(
              CONTENT_STRINGS_DOMAINS.get_mobile,
              CONTENT_STRINGS_CATEGORIES.photoUpload,
              CONTENT_STRINGS_MESSAGES.PHOTO_UPLOAD_MESSAGE
            )
          );

          this.checkIsDisabled = isDisabledSetting && Number(isDisabledSetting?.value) === 0;
          this.message = messageString && messageString?.value ? messageString.value : PHOTO_UPLOAD_MESSAGE;

          const isPhotoVisible = await firstValueFrom(
            services.settings.getSetting(Settings.Setting.PHOTO_UPLOAD_ENABLED)
          );

          return isPhotoVisible && isPhotoVisible?.value && Number(isPhotoVisible?.value) != 0;
        },
      },
      {
        id: SETTINGS_ID.lostCard,
        label: '',
        icon: 'card-lost',
        toggleLabel: { checked: 'Report card as found', unchecked: 'Report card as lost' },
        type: 'button',
        studentsOnly: true,
        setToggleStatus: setReportCardLabel,
        setCallback: openModal,
        modalContent: {
          component: ReportCardComponent,
        },
        validations: [
          {
            type: SETTINGS_VALIDATIONS.StatusSettingEnable,
            value: { getStatusValidation: getCardStatusValidation, validation: ReportCardStatusSetting },
          },
        ],
        supportProfiles: [APP_PROFILES.patron, APP_PROFILES.guest],
        checkIsVisible: async function (services: SettingsServices) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const self: SettingItemConfig = this;
          // if is guest user return false.
          if ((await isGuestUser(services)) || !(await isSupportedInCurrentProfile(services))(self)) return false;
          return (await asyncCheckEvery(self.validations, services)).every(checkTrue => checkTrue);
        },
      },
      {
        id: SETTINGS_ID.unlinkCredentials,
        label: '',
        icon: 'unlink',
        type: 'button',
        studentsOnly: true,
        setCallback: openPopover,
        setToggleStatus: function (services: SettingsServices) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const setting: SettingItemConfig = this;
          const mobileCredentialsUnlinkService = services.injector.get(MobileCredentialsUnlinkService);
          const defaultLabel = 'Unlink Mobile Wallet ID';
          setting.label = merge(
            of(defaultLabel),
            mobileCredentialsUnlinkService.unlinkCredentialsRequested$.pipe(
              first(),
              map(unlinked => (unlinked ? '' : defaultLabel))
            )
          );
        },
        modalContent: {
          component: UnlinkCredentialsComponent,
        },
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.CREDENTIALS_UNLINK_ENABLED }],
        supportProfiles: [APP_PROFILES.patron],
        checkIsVisible: async function (services: SettingsServices) {
          const mobileCredentialsUnlinkService = services.injector.get(MobileCredentialsUnlinkService);
          const checks = await Promise.all([
            validateSettingEnabled.bind(this)(services),
            firstValueFrom(mobileCredentialsUnlinkService.displayUnlinkButton$),
          ]);
          return checks.reduce((isEnabled, currentCheck) => isEnabled && currentCheck, true);
        },
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        id: SETTINGS_ID.personalData,
        icon: 'account-profile',
        label: 'patron-ui.update_personal_info.header_update_profile',
        type: 'button',
        setCallback: openModal,
        modalContent: {
          component: PhoneEmailComponent,
        },
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.password,
        icon: 'key',
        label: 'Change password',
        type: 'button',
        setCallback: openModal,
        validations: [{ type: SETTINGS_VALIDATIONS.ChangePasswordEnabled, value: 'change-password' }],
        checkIsVisible: async function (services: SettingsServices) {
          const sessionFacade = services.sessionFacadeService;
          const loginState = await sessionFacade.determineInstitutionSelectionLoginState();
          return loginState == LoginState.HOSTED || (await isGuestUser(services));
        },
        modalContent: {
          fetchData: async (services: SettingsServices): Promise<any> => {
            const contentStrings = await contentStringsByCategory(services, [
              {
                domain: CONTENT_STRINGS_DOMAINS.patronUi,
                category: CONTENT_STRINGS_CATEGORIES.passwordValidation,
                name: null,
              },
              {
                domain: CONTENT_STRINGS_DOMAINS.patronUi,
                category: CONTENT_STRINGS_CATEGORIES.changePassword,
              },
            ]);
            return { contentStrings };
          },
          component: PasswordChangeComponent,
        },
      },
      {
        id: SETTINGS_ID.biometrics,
        icon: '',
        label: '',
        type: 'toggle',
        setCallback: toggleBiometricStatus,
        setToggleStatus: setBiometricStatus,
        validations: [
          { type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.PIN_ENABLED },
          { type: SETTINGS_VALIDATIONS.Biometric, value: 'biometric' },
        ],
        checkIsVisible: async function (services: SettingsServices) {
          const biometricsEnabled = await services.identity.isBiometricAvailable();
          if (biometricsEnabled) {
            const biometrics = await services.identity.getAvailableBiometricHardware();
            const biometric = configureBiometricsConfig(biometrics);
            this.label = biometric.name;
            this.icon = biometric.icon;
          }

          return biometricsEnabled;
        },
      },
      {
        id: SETTINGS_ID.pin,
        icon: 'pin-pad',
        label: 'Change PIN',
        type: 'button',
        setCallback: handlePinAccess,
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.PIN_ENABLED }],
        checkIsVisible: validateSettingEnabled,
      },
      {
        id: SETTINGS_ID.address,
        icon: 'map-marker',
        label: 'Saved Addresses',
        type: 'button',
        navigate: [SETTINGS_NAVIGATE.address],
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.creditCard,
        icon: 'credit-card',
        label: 'Payment Methods',
        type: 'button',
        setCallback: openModal,
        modalContent: {
          component: CreditCardMgmtComponent,
          fetchData: async (services: SettingsServices): Promise<any> => {
            await services.loadingService.showSpinner();

            const parseAccountData = (account: UserAccount): CreditCardAccount => {
              const { accountTender, lastFour } = account;
              const creditCardTypeNumber = parseInt(accountTender) - 1;
              const display = `${CREDITCARD_TYPE[creditCardTypeNumber]} ending in ${lastFour}`;
              const iconSrc = CREDITCARD_ICONS[creditCardTypeNumber];
              return { display, account, iconSrc };
            };

            const parseCreditCards = (card: CreditPaymentMethods): CreditPaymentMethods => {
              const { accountTender } = card;
              const creditCardTypeNumber = parseInt(accountTender) - 1;
              const icon = CREDITCARD_ICONS[creditCardTypeNumber];

              return { ...card, icon };
            };

            let userAccounts = [];
            let allowedPaymentsMethods = [];

            const contentStringsData = await contentStringsByCategory(services, [
              {
                domain: CONTENT_STRINGS_DOMAINS.patronUi,
                category: CONTENT_STRINGS_CATEGORIES.creditCardMgmt,
                name: null,
              },
            ])
              .then(data => data.pop())
              .catch(() => []);

            try {
              userAccounts = await firstValueFrom(
                services.accountService.getUserAccounts([PaymentSystemType.MONETRA, PaymentSystemType.USAEPAY])
              ).then(accounts => accounts.map(acc => parseAccountData(acc)));

              const [first] = userAccounts;
              allowedPaymentsMethods = await firstValueFrom(
                services.accountService.getAllowedPaymentsMethods(first?.account?.paymentSystemId)
              ).then(creditCards => creditCards.map(cards => cards.active && parseCreditCards(cards)));
            } catch (ignored) {
              // fallback on empty userAccounts array
            } finally {
              await services.loadingService.closeSpinner();
            }

            return {
              contentStrings: reduceToObject(contentStringsData, defaultCreditCardMgmtCs),
              userAccounts,
              allowedPaymentsMethods: allowedPaymentsMethods.filter(Boolean),
            };
          },
        },
        checkIsVisible: async (services: SettingsServices) => {
          const setting = await firstValueFrom(
            services.settings.getSetting(Settings.Setting.ENABLE_CREDIT_CARD_PAYMENT)
          );
          return setting && Number(setting.value) == 1;
        },
      },
      {
        id: SETTINGS_ID.mcredential,
        icon: 'mobile_credential',
        label: 'Mobile Credential Status',
        type: 'button',
        studentsOnly: true,
        setCallback: openModal,
        modalContent: {
          component: MobileCredentialMetadata,
        },
        validations: [
          {
            type: SETTINGS_VALIDATIONS.MobileCredentialEnabled,
            value: Settings.Setting.ANDROID_MOBILE_CREDENTIAL_ENABLED,
          },
        ],
        checkIsVisible: async function (services: SettingsServices) {
          const mobileCredentialFacade = services.mobileCredentialFacade;
          return (
            !(await isGuestUser(services)) && (await firstValueFrom(mobileCredentialFacade.showCredentialMetadata()))
          );
        },
      },
    ],
  },
  {
    label: 'Meal Plans',
    items: [
      {
        id: SETTINGS_ID.mealPlan,
        icon: 'meal-change',
        label: 'Change meal plan',
        type: 'button',
        studentsOnly: true,
        setCallback: openSiteURL,
        navigateExternal: { type: 'link', value: 'change_meal_plan.php' },
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.MEAL_CHANGE_PLAN_ENABLED }],
        checkIsVisible: validateSettingEnabled,
      },
      {
        id: SETTINGS_ID.mealPurchase,
        icon: 'meal-purchase',
        label: 'Purchase meal plan',
        type: 'button',
        studentsOnly: true,
        setCallback: openSiteURL,
        navigateExternal: { type: 'link', value: 'purchase_meal_plan.php' },
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.MEAL_PURCHASE_PLAN_ENABLED }],
        checkIsVisible: validateSettingEnabled,
      },
    ],
  },
  {
    label: 'Preferences',
    items: [
      // {
      //   id: SETTINGS_ID.theme,
      //   icon: 'theme-dark-light-mode',
      //   label: 'Theme',
      //   type: 'button',
      //   navigate: SETTINGS_NAVIGATE.theme,
      // },
      {
        id: SETTINGS_ID.home,
        icon: 'home-edit',
        label: 'Edit Home',
        type: 'button',
        studentsOnly: true,
        setCallback: openModal,
        modalContent: {
          component: EditHomePageModalComponent,
        },
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.navigate,
        icon: 'more-menu',
        label: 'Edit Navigation',
        type: 'button',
        studentsOnly: true,
        setCallback: openModal,
        modalContent: {
          component: EditNavigationComponent,
        },
        checkIsVisible: async () => true,
      },
    ],
  },
  {
    label: 'Feedback & Support',
    items: [
      {
        id: SETTINGS_ID.help,
        icon: 'help',
        label: 'Help',
        type: 'button',
        modalContent: {
          contentStrings: [
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'about_getfunds',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'contact_info',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.termsScreen,
              name: 'terms',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'patent',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'org',
            },
          ],
          appendStrings: [
            '<br><br>Address geocoding and reverse geocoding is &copy; OpenStreetMap contributors. <a href="http://www.openstreetmap.org/copyright">Copyright and License</a>',
            '<br><br>Copyright © 2012 - ' + new Date().getFullYear() + ' The CBORD Group, Inc.\r\n',
          ],
          component: HTMLRendererComponent,
        },
        setCallback: handleOpenHTMLModal,
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.support,
        icon: 'mail',
        label: 'Email Support',
        type: 'button',
        setCallback: openSiteURL,
        navigateExternal: { type: 'email', value: Settings.Setting.SUPPORT_EMAIL },
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.terms,
        icon: 'none',
        label: 'Terms of Use & Privacy Policy',
        type: 'button',
        modalContent: {
          contentStrings: [
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.termsScreen,
              name: 'terms',
            },
          ],
          component: HTMLRendererComponent,
        },
        setCallback: handleOpenHTMLModal,
        checkIsVisible: async () => true,
      },
      {
        id: SETTINGS_ID.hotLineHelp,
        icon: 'heart',
        label: 'Help is available',
        type: '',
        navigate: [],
        checkIsVisible: async function (services: SettingsServices) {
          const label = await firstValueFrom(
            services.contentString.fetchContentString$(
              CONTENT_STRINGS_DOMAINS.get_mobile,
              CONTENT_STRINGS_CATEGORIES.settingsScreen,
              CONTENT_STRINGS_MESSAGES.hotlineHelpTitle
            )
          );
          const message = await firstValueFrom(
            services.contentString.fetchContentString$(
              CONTENT_STRINGS_DOMAINS.get_mobile,
              CONTENT_STRINGS_CATEGORIES.settingsScreen,
              CONTENT_STRINGS_MESSAGES.hotlineInfo
            )
          );

          try {
            this.customMessage = message.value ? JSON.parse(message.value) : '';
          } catch (error) {
            this.customMessage = null;
          }

          this.label = label.value;
          this.checkIsDisabled = false;

          return true;
        },
      },
    ],
  },
];
