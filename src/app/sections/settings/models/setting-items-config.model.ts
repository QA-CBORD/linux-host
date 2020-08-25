import { Settings } from 'src/app/app.global';
import { CONTENT_STINGS_DOMAINS, CONTENT_STINGS_CATEGORIES } from 'src/app/content-strings';
import { UserInfo, UserNotificationInfo } from '@core/model/user';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ModalController } from '@ionic/angular';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';

export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
  visible?: boolean;
}

export interface SettingItemConfig {
  id: string;
  label: string;
  type: string;
  icon: string;
  navigate?: string;
  navigateExternal?: SettingItemExternalResource;
  checked?: boolean;
  toggleLabel?: ToggleLabel;
  validations?: SettingItemValidation[];
  modalContent?: ModalContent | HTMLContentString;
  getToggleStatus?: (services: SettingsServices) => Promise<boolean>;
  setCallback?: (services: SettingsServices | undefined) => void;
  callback?: () => Promise<any>;
}

export interface SettingItemValidation {
  type: SETTINGS_VALIDATIONS | string;
  value: Settings.Setting | string;
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
}
export interface HTMLContentString {
  domain: CONTENT_STINGS_DOMAINS;
  category: CONTENT_STINGS_CATEGORIES;
  name: string;
  component: any;
}
export enum SETTINGS_VALIDATIONS {
  SettingEnable = 'setting-enable',
  Biometric = 'biometric',
}

export interface UserInfoSet extends UserInfo {
  userNotificationInfoList: UserNotificationInfo[];
}

export interface SettingsServices {
  identity: IdentityFacadeService;
  userService: UserFacadeService;
  globalNav: GlobalNavService;
  modalController: ModalController;
  contentString: ContentStringsFacadeService;
  settings: SettingsFacadeService
  institution: InstitutionFacadeService;
  environment: EnvironmentFacadeService;
}
