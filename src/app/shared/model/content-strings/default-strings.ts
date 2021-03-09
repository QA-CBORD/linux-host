export const defaultPreloginCs = {
  continue_as_guest: 'Continue as guest',
  continue_as_nonguest: 'Continue as Student | Continue as Employee',
  pre_login_instruction:
    '<p>Here goes further instructions on how to login or register as a guest vs login or register as a student</p>',
};

export const defaultForgotPasswordCs = {
  resend_email: 'Resend email',
  back_to_login: 'Return to login',
  enter_email: 'Enter your email to receive instructions on how to reset your password',
  email_label: 'Email',
  submit_btn: 'Submit',
  message_sent:
    'A message has been sent to your email that will contain a link for you to change your password. Clicking on that link will take you to a page where you can enter in a new password',
};

export const defaultRegistrationCs = {
  screen_title: 'Create an account',
  submit_btn_text: 'Create Account',
  phone: 'Phone',
  first_name: 'First Name',
  last_name: 'Last Name',
  user_name: 'Email',
  password: 'Password',
  success_dismiss_btn: 'Dismiss',
  success_screen_title: 'Verify Email',
  success_resend_email: 'Resend Email',
  reg_failed_message: 'Registration failed. Please try again later',
  success_screen_message:
    'We have sent you a verification email. Tap the link inside that to verify your email and login',
  passwordValidators: [],
};

export const defaultMobileCredentialCs = {
  nfc_dialog_defaults: {
    nfc_off_dialog_accept: 'Proceed',
    nfc_off_dialog_cancel: 'Cancel',
    nfc_off_dialog_title: 'NFC is turned off',
    nfc_off_dialog_text:
      'The NFC setting is turned off for your phone. You can proceed and provision your credential, but it will not work when presented to an NFC reader to open a door or pay for a purchase until you turn on your NFC setting.',
  },

  terms: '<p>content string describing terms and conditions for cbord HID mobile credentials.</p>',
  'usage-instructions':
    '<p>Instructions for your mobile credential. Once you provision your mobile credential, it will be registered with your phones NFC chip and can be used in all of the same places that your plastic ID card could be used. Places such as opening doors, or paying for food on campus.</p>',
};
