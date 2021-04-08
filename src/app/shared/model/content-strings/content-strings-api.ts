import { GuestDepositCsModel } from '@sections/guest/deposit/model/guest-deposit-cs.model';
import { GuestDashboardCsModel } from '@sections/guest/dashboard/model/guest-dashboard-cs.model';
import { PasswordChangeCsModel } from '@shared/ui-components/change-password/password-change-content-strings.model';
import { AndroidCredentialCsModel } from '@shared/ui-components/mobile-credentials/model/android/android-credential-content-strings.model';
import { ForgotPasswordCsModel } from 'src/app/non-authorized/pages/forgot-password/models/forgot-password-content-strings.model';
import { PreloginCsModel } from 'src/app/non-authorized/pages/pre-login/models/prelogin-content-strings.model';
import { RegistrationCsModel } from 'src/app/non-authorized/pages/registration/models/registration-content-strings.model';
import { ContentStringBuilder, ContentStringBuilderConfig, NullableContent } from './content-string-models';
import { CONTENT_STRINGS_CATEGORIES as CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { DepositCsModel } from '@sections/accounts/pages/deposit-page/deposit-page.content.string';


export enum ContentStringCategory {
  forgotPassword = 'forgotPassword',
  preLogin = 'preLogin',
  registration = 'registration',
  changePassword = 'changePassword',
  mobileCredential = 'mobileCredential',
  guestDashboard = 'guestDashboard',
  deposit = 'deposit',
  guestDeposit = 'guestDeposit',
  passwordValidation = 'passwordValidation'
}

export interface ExtraContent{
  domain: CONTENT_STRINGS_DOMAINS,
  category: CATEGORIES,
  name: string
}

type ContentStringCategoryType = { -readonly [key in keyof typeof ContentStringCategory]: ContentStringBuilder };

export const ContentStringApi: ContentStringCategoryType = {
  [ContentStringCategory.forgotPassword]: {
    category: CATEGORIES.forgotPassword,
    build: (config: ContentStringBuilderConfig): ForgotPasswordCsModel => {
      return new ForgotPasswordCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.passwordValidation]: {
    category: CATEGORIES.passwordValidation,
    build: (config: ContentStringBuilderConfig): ForgotPasswordCsModel => {
      return new ForgotPasswordCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.preLogin]: {
    category: CATEGORIES.preLogin,
    build: (config: ContentStringBuilderConfig): PreloginCsModel => {
      return new PreloginCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.registration]: {
    category: CATEGORIES.registration,
    build: (config: ContentStringBuilderConfig): RegistrationCsModel => {
      return new RegistrationCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.changePassword]: {
    category: CATEGORIES.changePassword,
    build: (config: ContentStringBuilderConfig): PasswordChangeCsModel => {
      return new PasswordChangeCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.mobileCredential]: {
    category: CATEGORIES.mobileCredential,
    build: (config: ContentStringBuilderConfig): AndroidCredentialCsModel => {
      return new AndroidCredentialCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.guestDashboard]: {
    category: CATEGORIES.guestDashboard,
    build: (config: ContentStringBuilderConfig): GuestDashboardCsModel => {
      return new GuestDashboardCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.deposit]: {
    category: CATEGORIES.deposit,
    build: (config: ContentStringBuilderConfig): DepositCsModel => {
      return new DepositCsModel(NullableContent.build(config));
    },
  },

  [ContentStringCategory.guestDeposit]: {
    category: CATEGORIES.guestDeposit,
    build: (config: ContentStringBuilderConfig): GuestDepositCsModel => {
      return new GuestDepositCsModel(NullableContent.build(config));
    },
  },
};
