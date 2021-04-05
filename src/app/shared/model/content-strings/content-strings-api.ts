import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { DepositSuccessCsModel } from '@sections/guest/deposit/model/success-page-cs.model';
import { GuestDashboardCsModel } from '@sections/guest/dashboard/model/guest-dashboard-cs.model';
import { PasswordChangeCsModel } from '@shared/ui-components/change-password/password-change-content-strings.model';
import { AndroidCredentialCsModel } from '@shared/ui-components/mobile-credentials/model/android/android-credential-content-strings.model';
import { ForgotPasswordCsModel } from 'src/app/non-authorized/pages/forgot-password/models/forgot-password-content-strings.model';
import { PreloginCsModel } from 'src/app/non-authorized/pages/pre-login/models/prelogin-content-strings.model';
import { RegistrationCsModel } from 'src/app/non-authorized/pages/registration/models/registration-content-strings.model';
import { ContentStringModel, NullableContent } from './content-string-models';
import { CONTENT_STRINGS_CATEGORIES as CATEGORIES } from 'src/app/content-strings';

export interface IContentStringApi {
  category: CATEGORIES;
  toModel: (rawContent?: ContentStringInfo[], extras?: any) => ContentStringModel;
}

export enum ContentStringCategory {
  forgotPassword = 'forgotPassword',
  preLogin = 'preLogin',
  registration = 'registration',
  changePassword = 'changePassword',
  mobileCredential = 'mobileCredential',
  guestDashboard = 'guestDashboard',
  depositConfirm = 'depositConfirm',
  depositSuccess = 'depositSuccess'
}

type ContentStringCategoryType = { -readonly [key in keyof typeof ContentStringCategory]: IContentStringApi };

export const ContentStringApi: ContentStringCategoryType = {
  [ContentStringCategory.forgotPassword]: {
    category: CATEGORIES.forgotPassword,
    toModel: (content: ContentStringInfo[] = []): ForgotPasswordCsModel => {
      return new ForgotPasswordCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.preLogin]: {
    category: CATEGORIES.preLogin,
    toModel: (content: ContentStringInfo[] = [], args?: any): PreloginCsModel => {
      return new PreloginCsModel(NullableContent.build(content), args);
    },
  },

  [ContentStringCategory.registration]: {
    category: CATEGORIES.registration,
    toModel: (content: ContentStringInfo[] = []): RegistrationCsModel => {
      return new RegistrationCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.changePassword]: {
    category: CATEGORIES.changePassword,
    toModel: (content: ContentStringInfo[] = []): PasswordChangeCsModel => {
      return new PasswordChangeCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.mobileCredential]: {
    category: CATEGORIES.mobileCredential,
    toModel: (content: ContentStringInfo[] = []): AndroidCredentialCsModel => {
      return new AndroidCredentialCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.guestDashboard]: {
    category: CATEGORIES.guestDashboard,
    toModel: (content: ContentStringInfo[] = []): GuestDashboardCsModel => {
      return new GuestDashboardCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.depositConfirm]: {
    category: CATEGORIES.guestDepositConfirm,
    toModel: (content: ContentStringInfo[] = []): DepositSuccessCsModel => {
      return new DepositSuccessCsModel(NullableContent.build(content));
    },
  },

  [ContentStringCategory.depositSuccess]: {
    category: CATEGORIES.guestDepositConfirm,
    toModel: (content: ContentStringInfo[] = []): DepositSuccessCsModel => {
      return new DepositSuccessCsModel(NullableContent.build(content));
    },
  },

};
