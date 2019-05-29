import * as Globals from '../../app.global';

export enum LOCAL_ROUTING {
  levels = 'levels',
  store = 'store',
  history = 'history',
}

export enum CONTENT_STRINGS {
  activateBtn = 'button_activate',
  closeBtn = 'button_close',
  retryBtn = 'button_retry',
  headerTitle = 'header_title',
  optInBtn = 'button_opt-in',
  optInFailLabel = 'label_opt-in-failed',
}
export const ContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.rewards,
  domain: Globals.ContentString.DOMAINS.patron,
};

export enum OPT_IN_STATUS {
  yes = 1,
  no = 0,
}

export enum PopupTypes {
  REDEEM = 'REDEEM',
  SCAN = 'SCAN',
  SUCCESS = 'SUCCESS',
  CLAIM = 'CLAIM',
  RETRY = 'RETRY',
  OPT_IN = 'OPT_IN',
}

export enum LEVEL_STATUS {
  locked = 0,
  unlocked = 1,
  claimed = 2,
  received = 3,
}

export enum CLAIM_STATUS {
  unearned = 0,
  earned = 1,
  claimed = 2,
  received = 3,
}
