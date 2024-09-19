import { ForgotPasswordCsModel } from './forgot-password-content-strings.model';
import { defaultForgotPasswordCs } from '@shared/model/content-strings/default-strings';

describe('ForgotPasswordCsModel', () => {
  let model: ForgotPasswordCsModel;

  beforeEach(() => {
    const nullableContent = {
      getConfig: () => ({
        ...defaultForgotPasswordCs,
      }),
    } as any;

    model = new ForgotPasswordCsModel(nullableContent);
  });

  it('should return the correct resendEmail', () => {
    expect(model.resendEmail).toBe(defaultForgotPasswordCs.resend_email);
  });

  it('should return the correct back2Previous', () => {
    expect(model.back2Previous).toBe(defaultForgotPasswordCs.back_to_login);
  });

  it('should return the correct enterEmail', () => {
    expect(model.enterEmail).toBe(defaultForgotPasswordCs.enter_email);
  });

  it('should return the correct emailLabel', () => {
    expect(model.emailLabel).toBe(defaultForgotPasswordCs.email_label);
  });

  it('should return the correct submitBtntxt', () => {
    expect(model.submitBtntxt).toBe(defaultForgotPasswordCs.submit_btn);
  });

  it('should return the correct messageSent', () => {
    expect(model.messageSent).toBe(defaultForgotPasswordCs.message_sent);
  });
});
