import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';

export enum LOCAL_ROUTING {
  recentOrders = 'recent-orders',
  favoriteMerchants = 'favorite-merchants',
  savedAddresses = 'saved-addresses',
  fullMenu = 'full-menu',
  cart = 'cart',
  menuCategoryItems = 'menu-category-items',
  itemDetail = 'item-detail',
  addressEdit = 'address-edit'
}

export enum MerchantSearchOptionName {
  OPEN_NOW = 'open_now', /// 1/0 - omit to return all
  ACTIVE = 'active', /// 1/0 - default to 1
  TAGS = 'tags', /// CSV set of tags
  ADDED_AFTER_DATE = 'addedAfterDate', /// yyyy-MM-dd
  ADDRESS = 'address', /// street, city, zip
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  ORDER_TYPE = 'order_type', /// CSV set of order types (by name? ID?)
  MENU = 'menu_search',
  INCLUDE_ORDER_TYPES = 'include_order_types', /// 1/0 - default to 1
  LIMIT_BY_DELIVERY_DISTANCE = 'limit_by_delivery_distance', /// 1/0 - default to 1
  MERCHANT_ID = 'merchant_id',
  INCLUDE_SETTINGS = 'include_settings', /// 1/0
}

export const SYSTEM_SETTINGS_CONFIG = {
  addressRestrictionToOnCampus: {
    domain: 'get',
    category: 'feature',
    name: 'institution_address_restriction',
  },
  displayCreditCard: {
    domain: 'get',
    category: 'feature',
    name: 'display_credit_cards',
  },
  displayTenders: {
    domain: 'get',
    category: 'feature',
    name: 'display_tenders',
  },
};

export enum MerchantSettings {
  deliveryAddressRestriction = 'merchant.order.delivery_address_restriction',
  pickupLocationsEnabled = 'merchant.order.pickup_locations_enabled',
  orderAheadEnabled = 'merchant.order.order_ahead_enabled'
}

export enum ORDER_TYPE {
  PICKUP = 0,
  DELIVERY = 1,
  DINEIN = 2,
}

export enum PAYMENT_SYSTEM_TYPE {
  OPCS = 1,
  CSGOLD = 2,
  MONETRA = 3,
  USAEPAY = 4,
}

export enum ACCOUNT_TYPES {
  meals = 1, // Meals, Board
  charge = 2, // Charge, Credit
  decliningBalance = 3, // declining balance, points
}
export const ORDER_VALIDATION_ERRORS: ServerErrorsInfo = {
  9001: 'Delivery Address is required for delivery orders',
  9003: 'Merchant does not support the requested order type',
  9011: 'The merchant is currently closed and not accepting orders',
  9017: 'Order can not be processed for the given due time, it exceeds the merchants order capacity',
  9801: 'The attempted order contains invalid items for the available menu',
  9005: 'Items in order couldn\'t be lower than merchant supports',
  9006: 'Items in order  couldn\'t be more than merchant supports',
  9002: 'Order minimum total for delivery wasn\'t met',
  9014: 'Tip amount is negative or greater than the order subtotal',
  9013: 'Order cannot be canceled due to it has been completed',
  9997: 'Timeout error, please try again later'
};
