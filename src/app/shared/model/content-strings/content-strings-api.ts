import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { DepositSuccessCsModel } from '@sections/guest/deposit/model/success-page-cs.model';
import { GuestDashboardCsModel } from '@sections/guest/dashboard/model/guest-dashboard-cs.model';
import { PasswordChangeCsModel } from '@shared/ui-components/change-password/password-change-content-strings.model';
import { AndroidCredentialCsModel } from '@shared/ui-components/mobile-credentials/model/android/android-credential-content-strings.model';
import { ForgotPasswordCsModel } from 'src/app/non-authorized/pages/forgot-password/models/forgot-password-content-strings.model';
import { PreloginCsModel } from 'src/app/non-authorized/pages/pre-login/models/prelogin-content-strings.model';
import { RegistrationCsModel } from 'src/app/non-authorized/pages/registration/models/registration-content-strings.model';
import { NullableContent } from './content-string-models';


export const ContentStringApi = {
  forgotPassword: (content: ContentStringInfo[] = []): ForgotPasswordCsModel => {
    return new ForgotPasswordCsModel(NullableContent.build(content));
  },

  preLogin: (content: ContentStringInfo[] = [], args?: any): PreloginCsModel => {
    return new PreloginCsModel(NullableContent.build(content), args);
  },

  registration: (content: ContentStringInfo[] = []): RegistrationCsModel => {
    return new RegistrationCsModel(NullableContent.build(content));
  },

  changePassword: (content: ContentStringInfo[] = []): PasswordChangeCsModel => {
    return new PasswordChangeCsModel(NullableContent.build(content));
  },

  mobileCredential: (content: ContentStringInfo[] = []): AndroidCredentialCsModel => {
    return new AndroidCredentialCsModel(NullableContent.build(content));
  },

  guestDashboard: (content: ContentStringInfo[] = []): GuestDashboardCsModel => {
    return new GuestDashboardCsModel(NullableContent.build(content));
  },

  guestDepositConfirm: (content: ContentStringInfo[] = []): DepositSuccessCsModel =>{
   return new DepositSuccessCsModel(NullableContent.build(content));
  }
};
