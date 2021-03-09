import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ForgotPasswordCsModel } from 'src/app/non-authorized/pages/forgot-password/models/forgot-password-content-strings.model';
import { PreloginCsModel } from 'src/app/non-authorized/pages/pre-login/models/prelogin-content-strings.model';
import { RegistrationCsModel } from 'src/app/non-authorized/pages/registration/models/registration-content-strings.model';
import { ApiContract, NullableContent } from './content-string-models';

export const ContentStringApi: ApiContract = {
  forgotPassword: (content: ContentStringInfo[] = []): ForgotPasswordCsModel => {
    return new ForgotPasswordCsModel(NullableContent.build(content));
  },

  preLogin: (content: ContentStringInfo[] = [], args?: any): PreloginCsModel => {
    return new PreloginCsModel(NullableContent.build(content), args);
  },

  registration: (content: ContentStringInfo[] = []): RegistrationCsModel => {
    return new RegistrationCsModel(NullableContent.build(content));
  }
};
