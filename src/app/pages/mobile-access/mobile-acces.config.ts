import * as Globals from '../../app.global';

export enum LOCAL_ROUTING {
  activate = 'activate',
}

export enum CONTENT_STRINGS {
  retryBtn = 'button_retry',
  cancelBtn = 'button_cancel',
  activateBtn = 'button_activate',
  closeBtn = 'button_close',
  errorResponseDialogHeader = 'dialog_header_activate-response-error',
  failedResponseDialogHeader = 'dialog_header_activate-response-failed',
  successResponseDialogHeader = 'dialog_header_activate-response-success',
  errorResponseDialogMessage = 'dialog_message_activate-response-error',
  enterCodeDialogHeader = 'dialog_header_enter-code',
  scanBarcodeDialogHeader = 'dialog_header_scan-barcode',
  backBtnHeader = 'header_button_back',
  headerTitle = 'header_title',
  headerTitleActivate = 'header_title_activate',
  retrieveLocationsLoader = 'loader_retrieve-locations',
  activateLocationLoader = 'loader_activate-locations',
  searchbarPlaceholder = 'searchbar_placeholder_filter-locations',
  addFavToast = 'toast_add-favorite',
  removeFavToast = 'toast_remove-favorite',
  addFavErrorToast = 'toast_add-favorite-error',
  noLocationsFound = 'label_no-locations-found',
}
export const MobileAccessContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.mobileAccess,
  domain: Globals.ContentString.DOMAINS.patron,
};

export const GenericContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.core,
  domain: Globals.ContentString.DOMAINS.patron,
};
