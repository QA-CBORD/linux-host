export enum BUTTON_TYPE {
  REDEEM = 'REDEEM',
  OKAY = 'OKAY',
  CLAIM = 'CLAIM',
  RETRY = 'RETRY',
  OPT_IN = 'OPT_IN',
  CANCEL = 'CANCEL',
  CLOSE = 'CLOSE',
  CONTINUE = 'CONTINUE',
  REMOVE = 'REMOVE'
}

const CANCEL = {
  class: 'clear',
  shape: 'round',
  strong: true,
  fill: 'clear',
  type: BUTTON_TYPE.CANCEL,
};

const REMOVE = {
  class: 'filled-red',
  shape: 'round',
  strong: true,
  fill: 'default',
  type: BUTTON_TYPE.REMOVE,
};

const RETRY = {
  class: 'filled',
  shape: 'round',
  strong: false,
  fill: 'default',
  type: BUTTON_TYPE.RETRY,
};

const OKAY = {
  class: 'filled',
  shape: 'round',
  strong: false,
  fill: 'default',
  type: BUTTON_TYPE.OKAY,
};

const REDEEM = {
  class: 'filled',
  shape: 'round',
  strong: false,
  fill: 'default',
  type: BUTTON_TYPE.REDEEM,
};

const CLAIM = {
  class: 'filled',
  shape: 'round',
  strong: false,
  fill: 'default',
  type: BUTTON_TYPE.CLAIM,
};

const CLOSE = {
  class: 'clear-with-shadow',
  shape: 'round',
  strong: true,
  fill: 'clear',
  type: BUTTON_TYPE.CLOSE,
};

const NO = {
  class: 'small-with-shadow',
  shape: 'round',
  strong: true,
  fill: 'clear',
  type: BUTTON_TYPE.CLOSE,
};

const OPT_IN = {
  class: 'filled',
  shape: 'round',
  strong: false,
  fill: 'default',
  type: BUTTON_TYPE.OPT_IN,
};

export const buttons = {
  CANCEL,
  RETRY,
  NO,
  OKAY,
  REDEEM,
  CLOSE,
  CLAIM,
  OPT_IN,
  REMOVE
};
