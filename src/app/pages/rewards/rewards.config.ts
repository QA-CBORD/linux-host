import * as Globals from "../../app.global";

export enum LOCAL_ROUTING {
  levels = 'levels',
  store = 'store',
  history = 'history',
}

export enum CONTENT_STRINGS {
  activateBtn = 'button_activate',
  closeBtn = 'button_close',
  headerTitle = 'header_title',
}
export const ContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.rewards,
  domain: Globals.ContentString.DOMAINS.patron,
};