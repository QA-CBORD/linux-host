import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultRegistrationCs } from '@shared/model/content-strings/default-strings';

export class RegistrationCsModel extends ContentStringModel {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(nullable: NullableContent, args?: any) {
    super(nullable.getConfig(), defaultRegistrationCs);
  }

  get title(): string {
    return this.content.screen_title;
  }
  get phone(): string {
    return this.content.phone;
  }

  get submitBtnTxt(): string {
    return this.content.submit_btn_text;
  }

  get firstName(): string {
    return this.content.first_name;
  }

  get lastName(): string {
    return this.content.last_name;
  }

  get userName(): string {
    return this.content.user_name;
  }

  get password(): string {
    return this.content.password;
  }

  get confirmPassword(): string {
    return this.content.confirm_password;
  }

  get dismissBtnText(): string {
    return this.content.success_dismiss_btn;
  }

  get resendEmail(): string {
    return this.content.success_resend_email;
  }

  get successTitle(): string {
    return this.content.success_screen_title;
  }

  get successMessage(): string {
    return this.content.success_screen_message;
  }

  get defaultFailureMessage(): string {
    return this.content.reg_failed_message;
  }

  // if null then return default generic message;
  fromCodeOrDefaultErrortext(errorCode: string): string {
    return this.textFromErrorCode(errorCode) || this.defaultFailureMessage;
  }

  // may return null;
  public textFromErrorCode(errorCode: string): string {
    return this.content[`error_code_${errorCode}`];
  }
}
