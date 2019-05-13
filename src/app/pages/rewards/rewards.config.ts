import * as Globals from "../../app.global";

export enum LOCAL_ROUTING {
  levels = 'levels',
  store = 'store',
  history = 'history',
}

export enum CONTENT_STRINGS {
  activateBtn = 'button_activate',
  closeBtn = 'button_close',
  retryBtn = "button_retry",
  headerTitle = 'header_title',
  optInBtn = 'button_opt-in',
  optInFailLabel = 'label_opt-in-failed'
}
export const ContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.rewards,
  domain: Globals.ContentString.DOMAINS.patron,
};

export enum OPT_IN_STATUS {
  yes = 1,
  no = 0
}