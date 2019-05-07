import * as Globals from '../../app.global';

export enum SPINNER_MESSAGES {
  activating = 'Activating location...',
  errorActivating = 'Something went wrong while activating',
}

export enum LOCAL_ROUTING {
  activate = 'activate',
}

export enum TOAST_MESSAGE {
  addedFav = 'was added to your favorite list',
  removedFav = 'was removed from your favorite list',
  errorSavingFav = 'Something went wrong with synchronizing your favorite list',
}

export enum CONTENT_STRINGS {
  activateBtn = 'button_activate',
  closeBtn = 'button_close',
  headerTitle = 'header_title',
  searchbarPlaceholder = 'searchbar_placeholder_filter-locations',
}
export const ContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.mobileAccess,
  domain: Globals.ContentString.DOMAINS.patron,
};
