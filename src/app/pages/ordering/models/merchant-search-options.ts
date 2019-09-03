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

export interface MerchantSearchOption {
  key: MerchantSearchOptionName;
  value: any;
}

export class MerchantSearchOptions {
  private list: MerchantSearchOption[] = new Array();

  constructor() {}

  getSearchOptions() {
    return this.list;
  }

  addSearchOption(searchOption: MerchantSearchOption) {
    this.list.push(searchOption);
  }

  // addSearchOptions(searchOptions: MerchantSearchOption[]) {

  //   this.searchOptions = { ...this.searchOptions, searchOptions };
  // }
}
