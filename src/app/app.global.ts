import { Injectable } from '@angular/core';

export let DEBUG_ON = true;

export namespace Environment {
  export enum Value {
    DEVELOPMENT = 0,
    DEMO = 1,
    PRODUCTION = 2,
  }

  export enum BaseUrl {
    DEVELOPMENT = 'https://student.dev.cbord.com',
    DEMO = 'https://student.demo.cbord.com',
    PRODUCTION = 'https://student.cbord.com',
  }

  export enum ServiceUrl {
    DEVELOPMENT = 'https://services.get.dev.cbord.com/GETServices/services',
    DEMO = 'http://getdemo.cbord.com/GETServices/services',
    PRODUCTION = 'https://services.get.cbord.com/GETServices/services',
  }

  export enum AWSAPIUrl {
    DEVELOPMENT = 'https://dwptofebk7.execute-api.us-east-1.amazonaws.com/dev',
  }
}

export namespace Exception {
  export enum Strings {
    TITLE = 'Oh no!',
  }

  export enum DisplayOptions {
    ONE_BUTTON,
    TWO_BUTTON,
    THREE_BUTTON,
  }
}

@Injectable()
export class Events {
  static readonly SIDEMENU_UPDATE = 'data:navigationMenu:updated';
  static readonly SIDEPANE_ENABLE = 'state:navigationMenu:visibility';

  static readonly EXCEPTION_SHOW = 'state:exceptionShow:visibility';

  static readonly LOADER_SHOW = 'state:loader:visibility';
}

export namespace Settings {
  export enum ESetting {
    PIN_ENABLED = 'get.feature.enable_mobile_pin_entry',
    SOA_KEY = 'soa.general.key',
    PIN_ENTRY_MAX_FAILURES = 'get.login.pin_max_failed',
    FEEDBACK_EMAIL = 'soa.email.get_feedback_email',
    MY_CARD_ENABLED = 'get.feature.enable_get_my_card',
    MOBILE_ACCESS_ENABLED = 'get.feature.enable_open_my_door',
    FUNDS_ENABLED = '',
    REWARDS_ENABLED = 'get.feature.enable_rewards',
    FOOD_ENABLED = 'get.feature.enable_food',
    PLACES_ENABLED = 'get.feature.enable_merchants',
  }

  export enum ESettingList {
    FEATURES = 'get.feature',
    DEPOSITS = 'get.deposit',
    MEAL_PLAN = 'get.meal_plan',
  }

  export enum EStrings {
    USERNAME_TITLE = 'get_web_gui.login_screen.email_username',
    GET_MY_CARD_BACK = 'get_mobile_app.get_my_card.back_instructions',
    REWARDS_PATRON_DISABLED = 'get_common.error.RewardsDisabledForUserException',
  }
}

export namespace ContentString {
  export enum DOMAINS {
    patron = 'patron-ui',
  }

  export enum CATEGORIES {
    core = 'core-ui',
    mobileAccess = 'mobile-access',
    rewards = 'rewards',
  }

  export enum MODAL {
    cancel = 'button_cancel',
    retry = 'button_retry',
    ok = 'button_ok',
  }
}

export namespace User {
  export enum EBounceStatus {
    NONE = 'NONE',
    TRANSIENT = 'TRANSIENT',
    PERMANENT = 'PERMANENT',
  }

  export enum EBounceStatusInt {
    NONE = 1,
    TRANSIENT = 2,
    PERMANENT = 3,
  }

  export enum ENotificationStatus {
    NOT_CONFIRMED = 1,
    STALE = 2,
    CONFIRMED = 3,
    INVALID = 4,
  }

  export enum EPhotoStatus {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    REPLACED = 3,
    DELETED = 4,
  }

  export enum ESetting {
    CASHLESS_KEY = 'CashlessKey',
  }
}

export enum NAVIGATE {
  rewards = 'rewards',
  mobileAccess = 'openmydoor',
  secureMessage = 'securemessaging',
  accounts = 'accounts',
}
