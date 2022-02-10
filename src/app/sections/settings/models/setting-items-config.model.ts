import { Settings } from 'src/app/app.global';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { UserInfo, UserNotificationInfo } from '@core/model/user';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ModalController } from '@ionic/angular';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { APP_PROFILES } from '@sections/dashboard/models';
import { ProfileService } from '@shared/services/app.profile.services';

export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
  visible?: boolean;
}

export interface SettingItemConfig {
  id: string;
  label: string | Observable<string>;
  type: string;
  icon: string;
  navigate?: string[];
  navigateExternal?: SettingItemExternalResource;
  checked?: boolean;
  toggleLabel?: ToggleLabel;
  validations?: SettingItemValidation[];
  modalContent?: ModalContent | HTMLContentString;
  studentsOnly?: boolean;
  setToggleStatus?: (services: SettingsServices) => void;
  setCallback?: (services: SettingsServices | undefined) => void;
  callback?: () => Promise<any>;
  selfValidate: (args: SettingsServices) => Promise<boolean>,
  supportProfiles?: APP_PROFILES[],
}

export interface SettingItemValidation {
  type: SETTINGS_VALIDATIONS | string;
  value: Settings.Setting | string | StatusSettingValidation;
}
export interface SettingItemExternalResource {
  type: string;
  value: Settings.Setting | string;
}
export interface ToggleLabel {
  checked: string;
  unchecked: string;
}
export interface ModalContent {
  component?: any;
  biometric?: string;
  contentStrings?: DomainContentString[];
}
export interface HTMLContentString {
  contentStrings: DomainContentString[];
  appendStrings?: string[];
  component: any;
}
export interface DomainContentString {
  domain: CONTENT_STRINGS_DOMAINS;
  category: CONTENT_STRINGS_CATEGORIES;
  name: string | null;
}
export enum SETTINGS_VALIDATIONS {
  SettingEnable = 'setting-enable',
  Biometric = 'biometric',
  StatusSettingEnable = 'status-enable',
  MobileCredentialEnabled = 'mobile-credential',
  ChangePasswordEnabled = 'change-password'
}

export interface UserInfoSet extends UserInfo {
  userNotificationInfoList: UserNotificationInfo[];
}

export interface SettingsServices {
  authService: AuthFacadeService;
  identity: IdentityFacadeService;
  userService: UserFacadeService;
  globalNav: GlobalNavService;
  modalController: ModalController;
  contentString: ContentStringsFacadeService;
  settings: SettingsFacadeService;
  institution: InstitutionFacadeService;
  environment: EnvironmentFacadeService;
  appBrowser: InAppBrowser;
  mobileCredentialFacade: MobileCredentialFacade,
  sessionFacadeService: SessionFacadeService,
  profileService: ProfileService
}

export interface StatusSettingValidation {
  getStatusValidation: (services: SettingsServices) => Observable<string>;
  validation: { [key: number]: Settings.Setting | string };
}
