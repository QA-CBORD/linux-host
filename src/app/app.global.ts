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

  static readonly LOADER_SHOW = 'state:loader:visibility';
}

export namespace Settings {
  export enum SettingList {
    FEATURES = 'get.feature',
    DEPOSITS = 'get.deposit',
    MEAL_PLAN = 'get.meal_plan',
    PHOTO_UPLOAD = 'get.photo_upload',
  }

  export enum Setting {
    PIN_ENABLED = 'get.feature.enable_mobile_pin_entry',
    SOA_KEY = 'soa.general.key',
    PIN_ENTRY_MAX_FAILURES = 'get.login.pin_max_failed',
    FEEDBACK_EMAIL = 'soa.email.get_feedback_email',
    PATRON_DISPLAY_MEDIA_TYPE = 'get.feature.mobile_patron_cashless_display_media_type',
    MY_CARD_ENABLED = 'get.feature.enable_get_my_card',
    MOBILE_ACCESS_ENABLED = 'get.feature.enable_open_my_door',
    SECURE_MESSAGING_ENABLED = 'get.feature.enable_secure_messaging',
    REWARDS_ENABLED = 'get.feature.enable_rewards',
    FOOD_ENABLED = 'get.feature.enable_food',
    PLACES_ENABLED = 'get.feature.enable_merchants',
    ONETIME_DEPOSITS_ENABLED = 'get.deposit.enable_onetime_deposits',
    AUTO_DEPOSIT_ENABLED = 'get.feature.enable_auto_deposits',
    DEPOSIT_TENDERS = 'get.feature.deposit_tenders',
    DISPLAY_TENDERS = 'get.feature.display_tenders',
    GUEST_DEPOSIT_ENABLED = 'get.deposit.enable_guest_deposits',
    BILLME_MAPPING = 'get.deposit.billme_mapping',
    FREEFORM_DEPOSIT_ENABLED = 'get.deposit.allow_freeform_onetime_amounts',
    BILLME_AMOUNTS = 'get.deposit.billme_amounts',
    PRESET_DEPOSIT_AMOUNTS_CREDITCARD = 'get.deposit.onetime_amounts',
    PAYMENT_TYPES = 'get.deposit.payment_types',
    BILLME_AMOUNT_MIN = 'get.deposit.billme_minimum',
    CREDITCARD_AMOUNT_MIN = 'get.deposit.onetime_minimum',
    BILLME_AMOUNT_MAX = 'get.deposit.billme_maximum',
    CREDITCARD_AMOUNT_MAX = 'get.deposit.onetime_maximum',
    AUTO_DEPOSIT_PAYMENT_TYPES = 'get.deposit.auto_deposit_payment_types',
    LOW_BALANCE_AUTO_DEPOSIT_ENABLED = 'get.feature.enable_low_balance_auto_deposit',
    LOW_BALANCE_FREEFORM_ENABLED = 'get.deposit.allow_freeform_low_balance_amounts',
    LOW_BALANCE_AMOUNTS = 'get.deposit.low_balance_amounts',
    BILLME_FREEFORM_ENABLED = 'get.deposit.allow_freeform_billme_amounts',
    AUTO_DEPOSIT_TENDERS = 'get.feature.auto_deposit_tenders',
    MOBILE_HEADER_COLOR = 'get.style.custom_site_colors',
    HOUSING_ENABLED = 'get.feature.enable_housing',
    MEAL_DONATIONS_ENABLED = 'get.feature.meal_donations_enabled',
    MEAL_DONATIONS_TENDERS = 'get.meal_donation.tenders',
    MEAL_DONATIONS_FREEFORM_ENABLED = 'get.meal_donation.allow_freeform',
    MEAL_DONATIONS_FIXED_MEAL_AMOUNTS = 'get.meal_donation.fixed_meal_amounts',
    MEAL_DONATIONS_FIXED_DOLLAR_AMOUNTS = 'get.meal_donation.fixed_dollar_amounts',
    CREDIT_PAYMENT_SYSTEM_TYPE = 'get.credit.payment_system_type',
    ADDRESS_RESTRICTION = 'get.feature.institution_address_restriction',
    DISPLAY_CREDIT_CARDS = 'get.feature.display_credit_cards',
    APPLE_PAY_ENABLED = 'get.feature.enable_apple_pay',
    APPLE_WALLET_ENABLED = 'get.feature.enable_apple_wallet',
    PUSH_NOTIFICATION_ENABLED = 'get.feature.enable_push_notification'
  }

}

export enum AccountType {
  MEALS = 1,
  CHARGE = 2,
  DECLINING_BALANCE = 3,
  APPLEPAY = 4,
}

export enum PaymentType {
  CREDIT = 1,
  BILLME = 2,
}
export enum PaymentSystemType {
  OPCS = 1,
  CSGOLD = 2,
  MONETRA = 3,
  USAEPAY = 4,
}

export namespace ContentString {
  export enum DOMAINS {
    patron = 'patron-ui',
  }

  export enum CATEGORIES {
    core = 'core-ui',
    mobileAccess = 'mobile-access',
    rewards = 'rewards',
    accounts = 'accounts',
    transactions = 'transactions',
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

  export enum Settings {
    CASHLESS_KEY = 'CashlessKey',
    QUICK_AMOUNT = 'quick_amount',
    MOBILE_ACCESS_FAVORITES = 'mobileaccess_favorites',
    DEFAULT_ADDRESS = 'defaultaddress',
  }
}

export enum ROLES {
  guest = 'guest',
  patron = 'patron'
}

export enum PATRON_NAVIGATION {
  housing = 'patron/housing',
  dashboard = 'patron/dashboard',
  rewards = 'patron/rewards',
  mobileAccess = 'patron/openmydoor',
  secureMessage = 'patron/securemessaging',
  accounts = 'patron/accounts',
  ordering = 'patron/ordering',
  explore = 'patron/explore',
  biometric = 'patron/biometric',
  settings = 'patron/settings',
}

export enum LoginType {
  FACEID = 'FACEID',
  FINGERPRINT = 'FINGERPRINT',
  PIN = 'PIN',
  WEB = 'WEB',
  LOCAL = 'LOCAL',
}
