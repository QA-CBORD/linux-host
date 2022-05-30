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

export const defaultIdentifyRecipientCs = {
  screen_title: 'Identify Recipient',
  sub_title: 'Who is this deposit for ?',
  remove_recipient_btn_text: 'remove',
  add_new_recipient_text: 'Add new recipient',
  add_other_recipient_Text: 'Add another recipient',
  submit_btn: 'CONTINUE',
  remove_recipient_dialog_title: 'Remove ',
  remove_recipient_dialog_msg: 'Are you sure ?',
  remove_recipient_dialog_cancel: 'OOPS, CANCEL',
  remove_recipient_dialog_confirm: 'YES, REMOVE',
  add_new_recipient_failure: 'Could not add recipient. Please check the info or try again later.',
  save_recipient_for_future: 'Save this recipient for future deposits ?'
}

export const defaultCreditCardMgmtCs: {
  screen_title: string;
  no_card_found: string;
  add_new_card_btn_text: string;
  user_info_text: string;
  error_loading_cards: string;
  remove_success_msg: string;
  remove_failure_msg: string;
  added_success_msg: string;
  remove_card_btn: string;
  cancel_remove_card_btn: string;
} = {
  screen_title: 'Payment Methods',
  no_card_found: "You don't have any payment methods.",
  add_new_card_btn_text: "Add New Card",
  user_info_text:"Credit card information is handled by USAePay. After adding a new card, you will be redirected back to this screen.",
  error_loading_cards: "An error occurred while loading your credit card accounts.",
  remove_success_msg: "Your credit card has been removed successfully.",
  remove_failure_msg: "We could not remove your credit card, please try again later.",
  added_success_msg: "Your credit card has been added successfully.",
  remove_card_btn: 'Remove Card',
  cancel_remove_card_btn: 'Cancel'
}

export const checkingDefaultCs = {
  title: 'Home',
  order_pending: 'Order Pending',
  subtitle: 'Your order is now pending. You will receive a confirmation email shortly.',
  instruction: 'When you arrive, tap the Location Check In or Scan Code button to complete your order.',
  lbl_pickup_time: 'PICKUP TIME',
  pickup_info: 'Check In within 30 minutes before or after this Pickup Time.',//'This order will not be available outside of the 30 min window.',
  lbl_pickup_addr: 'PICKUP ADDRESS',
  lbl_total: 'Total',
  lbl_btn_order_detail: 'Order Details',
  lbl_btn_scan_code: 'Scan Code',
  lbl_btn_loc_chck_in: 'Use Location',
  not_checked_in_subtitle: 'Unable to Check In',
  lbl_btn_back: 'Back',
  too_early: 'You are here too early. You cannot Check In earlier than 30 minutes before Pick Up time.',
  get_closer: 'You must be closer to the merchant to use Location Check In. Or use the Scan Code feature once you arrive at the merchant.',
  invalid_scan_code: 'The code you scanned is invalid to check in your order. Please try again.',
  lbl_btn_checkin_in: 'Check In',
  lbl_btn_add2_cart: 'Add To Cart',
  checkin_method_text: "Check in either by using your location services or by scanning the QR code.",
  scan_code_prompt: 'Position the code in the center of the screen to scan.',
  scan_code_title: 'Scan Barcode or QR Code'
}

export const checkingSuccessCs = {
  title: 'Home',
  subtitle: 'Your other is on the way',
  instructions: 'Please wait while your order is being prepared.',
  lbl_pickup_time: 'PICKUP TIME',
  lbl_pickup_address: 'PICKUP ADDRESS',
  lbl_total: 'Total',
  lbl_btn_order_detail: 'Order Details',
  done: 'Done',
  labelOrder: 'Order',
  lbl_subtotal: 'Subtotal',
  lbl_tip: 'Tip',
  lbl_tax: 'Tax',
  lbl_discount: 'Discount',
  lbl_pickupFee: 'PICK UP FEE',
  lbl_deliveryFee: 'DELIVERY FEE'

}

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
  error_code_7001: 'A confirmed cashless user already exists and can not be added again',
  error_code_9505: 'Your password contains some weird combination, try another.',
  error_code_6101: 'Cannot find a match for given user information',
};

export const guestDashboardDefaultStrings = {
  deposit: 'Guest deposit',
  order: 'Start an order',
  explore: 'Explore',
};

export const ConnectivityScreentDefaultStrings = {
  title: 'No connection',
  description: 'Make sure your Wi-Fi or mobile data is turned on, then try again.',
  scan_card_desc: 'You may still scan your card when you are offline.',
  scan_card_btn: 'Scan Card',
  try_again_btn: 'Try Again',
  description_server_error: 'We are working on fixing the problem. Try again or come back later.',
  title_server_error: 'Something went wrong',
  connect_failed: 'Unable to connect.',
  scan_card_desc_server_error: '',
  retry: 'Retry'
};

export const depositDefaultStrings = {
  title: 'Confirm Deposit',
  policy_title: 'Refund Policy',
  lbl_deposit_amount: 'Deposit Amount',
  convenience_fee: 'Convenience Fee',
  total_payment: 'Total Payment',
  lbl_account: 'Account',
  bill_me_pay_method: 'Bill me',
  cc_ending_in_text: 'ending in',
  lbl_ok_button: 'DEPOSIT',
  lbl_cancel_button: 'CANCEL',
  lbl_select_payment_method: 'Payment Method',
  new_credit_card_text: 'Add a Credit Card',
  lbl_card_security_code: 'Card Security Code',
  card_security_code_error_text: 'Please enter a valid card security code.',
  lbl_select_account_for_deposit: 'To Account',
  lbl_select_amount_for_deposit: 'Amount to Deposit',
  max_amount_error_text: 'The maximum amount for a deposit is',
  min_amount_error_text: 'The minimum amount for a deposit is',
  amount_pattern_error_text: 'Please enter a valid amount.',
  submit_button_lbl: 'Deposit',
  choose_action_placeholder_text: 'Please Choose',
  success_screen_title: 'Deposit',
  subtitle_detail_text: 'This transaction was successful. You can review it to make sure everything checks out.',
  subtitle_summary_text: 'Success!',
  done_button_text: 'DONE',
};

export const guestDepositDefaultStrings = {
  title: 'Confirm Deposit',
  policy_title: 'Refund Policy',
  lbl_deposit_amount: 'Deposit Amount',
  convenience_fee: 'Convenience Fee',
  total_payment: 'Total Payment',
  lbl_account: 'Account',
  bill_me_pay_method: 'Bill me',
  cc_ending_in_text: 'ending in',
  lbl_ok_button: 'DEPOSIT',
  lbl_cancel_button: 'CANCEL',
  lbl_select_payment_method: 'Payment Method',
  new_credit_card_text: 'Add a Credit Card',
  lbl_card_security_code: 'Card Security Code',
  card_security_code_error_text: 'Please enter a valid card security code.',
  lbl_select_account_for_deposit: 'To Account',
  lbl_select_amount_for_deposit: 'Amount to Deposit',
  max_amount_error_text: 'The maximum amount for a deposit is',
  min_amount_error_text: 'The minimum amount for a deposit is',
  amount_pattern_error_text: 'Please enter a valid amount.',
  submit_button_lbl: 'Deposit',
  choose_action_placeholder_text: 'Please Choose',
  success_screen_title: 'Deposit',
  subtitle_detail_text: 'The transaction to ${recipient_name} was successful. You can review it to make sure everything checks out.',
  subtitle_summary_text: 'Success!',
  done_button_text: 'DONE',
};

export const guestAddFundsDefaultStrings = {
  add_funds_title: 'Add Funds',
  notice_text: 'You are depositing to the account of {recipient_name}.',
  source_account_text: 'Payment Method',
  destination_account_text: 'To Account',
  deposit_label: 'Amount To Deposit', 
  deposit_button: 'Deposit',
  refund_text: 'Refund Policy'
}

export const defaultOrderSubmitErrorMessages = {
  timeout: 'The server took too long to respond, however your order may have been submitted, please review your recent order history',
  connectionLost: 'Your internet connection was interrupted, however your order may have been submitted, please review your recent order history',
  duplicateOrdering: 'This order has already been checked out, please review your order history',
  noConnection: 'Please check your internet connection'
};

export const defaultMobileCredentialCs = {
  nfc_off_dialog_accept: 'Proceed',
  nfc_off_dialog_cancel: 'Cancel',
  nfc_off_dialog_title: 'NFC is turned off',
  nfc_off_dialog_text:
    'The NFC setting is turned off for your phone. You can proceed and provision your credential, but it will not work when presented to an NFC reader to open a door or pay for a purchase until you turn on your NFC setting.',
  terms: '<p>content string describing terms and conditions for cbord HID mobile credentials.</p>',
  'usage-instructions':
    '<p>Instructions for your mobile credential. Once you provision your mobile credential, it will be registered with your phones NFC chip and can be used in all of the same places that your plastic ID card could be used. Places such as opening doors, or paying for food on campus.</p>',
  usage_dialog_btn_uninstall: 'Uninstall',
  usage_dialog_btn_ok: 'OK',
  usage_dialog_title: 'Usage instructions',
  mc_exist_title: 'Credential already provisioned',
  mc_provisioned_text:
    'We have detected that you already provisioned a mobile ID, but it is not on this device. You may have uninstalled GET Mobile, deleted the app cache data, or your mobile ID is still installed on another device. If you proceed with this new installation, any previously installed mobile ID will be revoked. Would you like to proceed ?',
  accept_install: 'Accept and Install',
  mc_installed_text:
    'We have detected there is an active mobile ID installed on this device. if you proceed with this new installation, any previously installed ID will be revoked.',
  confirm_title: 'Please confirm',
  confirm_text: 'Are you sure you want to uninstall your mobile ID ?',
  confirm_btn: 'Confirm',
  install_err_title: 'Unexpected error',
  install_err_text: 'An unexpected error occurred, please try again later',
  mc_install_err: 'Mobile credential installation error',
  mc_install_retry: 'retry',
  terms_btn_accept: 'Agree',
  terms_btn_decline: 'Decline',
  terms_title: 'Terms and Conditions',
  cred_available: 'ID not added to Phone',
  cred_available_gpay: 'ID not added to Phone',
  cred_enabled: 'Mobile ID enabled',
  cred_enabled_gpay: 'ID added to Gpay',
  cred_not_ready: 'Mobile ID installed [not ready]',
  cred_not_ready_gpay: 'ID added to Gpay [not ready]',
  cred_revoked: 'Mobile ID revoked',
  is_loading_text: 'Processing ... please wait',
};

export const defaultPasswordChangeCs = {
  current_password: 'Current password',
  new_password: 'New password',
};

export const defaultPasswordValidationStrings = {
  at_least_one_letter: 'at least one letter',
  at_least_one_lowercase: 'at least one lower case',
  at_least_one_number: 'at least one number',
  at_least_one_special_char: 'at least one special character',
  required_password_length: 'at least 7 characters long',
  at_least_one_uppercase: 'at least one upper case	',

};

export const defaultLocationDisclosureStrings = {
  disclosure_button_cancel: 'cancel',
  disclosure_button_text: 'location settings',
  disclosure_text: 'GET can use your location to help you find nearby merchants, check in for an order pickup, and use your card.  Allowing background access to your deviceâs location lets you to take full advantage of these features and enables you to add your card or payroll account to Apple Wallet or Google Pay if offered by your institution.',
  disclosure_title: 'use your location',
};

export const defaultScanCodeStrings = {
  scan_code_title: 'Barcode',
  scan_code_prompt: 'Position the code in the center of the screen to scan.',
  scan_code_button_text: 'Manual Entry',
};