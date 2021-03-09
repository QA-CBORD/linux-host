import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultForgotPasswordCs } from '@shared/model/content-strings/default-strings';

export class ForgotPasswordCsModel extends ContentStringModel {
  constructor(nullable: NullableContent) {
    super(nullable, defaultForgotPasswordCs);
  }

  get resendEmail(): string {
    return this.content.resend_email;
  }

  get back2Previous(): string {
    return this.content.back_to_login;
  }

  get enterEmail(): string {
    return this.content.enter_email;
  }

  get emailLabel(): string {
    return this.content.email_label;
  }

  get submitBtntxt(): string {
    return this.content.submit_btn;
  }
  get messageSent(): string {
    return this.content.message_sent;
  }
}
