import * as Globals from '../../app.global';

export enum LOCAL_ROUTING {
  levels = 'levels',
  store = 'store',
  history = 'history',
}

export enum CONTENT_STRINGS {
  activateBtn = 'button_activate',
  optInToast = 'toast_opt-in-success',
  cancelBtn = 'button_cancel',
  closeBtn = 'button_close',
  backBtn = 'button_back',
  retryBtn = 'button_retry',
  retryTitle = 'dialog_header_retry',
  headerTitle = 'header_title',
  optInBtn = 'button_opt-in',
  optInFailLabel = 'label_opt-in-failed',
  levelTabTitle = 'tab_title_levels',
  storeTabTitle = 'tab_title_store',
  historyTabTitle = 'tab_title_history',
  xpAwayFromRewardLabel = 'label_xp-to-unlock',
  activeRewardLabel = 'label_active-reward',
  rewardClaimedLabel = 'label_reward-claimed',
  noOffersLabel = 'label_no-offers-available',
  balanceLabel = 'label_balance',
  pointsLabel = 'label_points',
  levelLabel = 'label_level',
  pointsCostLabel = 'label_point-cost',
  scanLabel = 'label_scan',
  redeemLabel = 'label_redeem',
  claimLabel = 'label_claim',
  claimedLabel = 'label_claimed',
  claimButton = 'dialog_button_claim',
  redeemButton = 'dialog_button_redeem',
  successTitle = 'dialog_header_success',
  claimTitle = 'dialog_header_claim-reward',
  redeemTitle = 'dialog_header_redeem-reward',
  scanCodeTitle = 'dialog_header_scan-code',
  scanCodeDescription = 'dialog_description_scan-code',
  activeRewardsLabel = 'label_active-reward-plural',
  claimInstructionsLabel = 'label_claim-instructions',
  emptyHistoryListMessage = 'label_empty-history',
}
export const ContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.rewards,
  domain: Globals.ContentString.DOMAINS.patron,
};

export const GenericContentStringsParams = {
  category: Globals.ContentString.CATEGORIES.core,
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
  CANCEL = 'CANCEL',
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
