import { ServerErrorsInfo } from '@core/model/server_error/server-error.model';

export enum LOCAL_ROUTING {
  recentOrders = 'recent-orders',
  favoriteMerchants = 'favorite-merchants',
  savedAddresses = 'saved-addresses',
  fullMenu = 'full-menu',
  cart = 'cart',
  menuCategoryItems = 'menu-category-items',
  itemDetail = 'item-detail',
  addressEdit = 'address-edit',
  checkin = 'checkin',
  itemManualEntry = 'item-manual-entry'
}

export enum ORDERING_CONTENT_STRINGS {
  errorMessageTimeSlotCapacityReached = 'error_message_time-slot-capacity-reached',
  errorMessageInsufficientFunds = 'error_message_insufficient-funds',
  buttonAdd = 'button_add',
  buttonUpdate = 'label_update',
  backToOrdering = 'button_back-to-ordering',
  buttonCancel = 'button_cancel',
  buttonClose = 'button_close',
  buttonConfirm = 'button_confirm',
  buttonDashboardStartOrder = 'button_dashboard_start-order',
  buttonDismiss = 'button_dismiss',
  buttonDone = 'button_done',
  buttonExplore = 'button_explore',
  buttonPlaceOrder = 'button_place-order',
  buttonReorder = 'button_reorder',
  buttonSave = 'button_save',
  buttonBack = 'button_back',
  buttonSetDeliveryAddress = 'button_set-delivery-address',
  buttonSetPickupAddress = 'button_set-pickup-address',
  buttonViewCart = 'button_view-cart',
  formErrorAddress = 'form-error_address',
  formErrorBuilding = 'form-error_building',
  formErrorChooseAddress = 'form-error_choose-address',
  formErrorCity = 'form-error_city',
  formErrorRoom = 'form-error_room',
  formErrorState = 'form-error_state',
  formErrorTipInvalidFormat = 'form-error_tip_invalid-format',
  formErrorTipMinimum = 'form-error_tip_minimum',
  formErrorTipSubtotal = 'form-error_tip_subtotal',
  labelAddNewAddress = 'label_add-new-address',
  labelAddedToFavorites = 'label_added-to-favorites',
  labelAddressLine1 = 'label_address-line-1',
  labelAddressLine2 = 'label_address-line-2',
  labelAsap = 'label_asap',
  labelBuildings = 'label_buildings',
  labelCart = 'label_cart',
  labelCity = 'label_city',
  labelClosed = 'label_closed',
  labelCompletedOrders = 'label_completed-orders',
  labelDashboard = 'label_dashboard',
  labelDelivery = 'label_delivery',
  labelDeliveryAddress = 'label_delivery-address',
  labelDeliveryFee = 'label_delivery-fee',
  labelDeliveryTime = 'label_delivery-time',
  labelDiscount = 'label_discount',
  labelEmptyFavorites = 'label_empty-favorites',
  labelEmptySearch = 'label_empty-search',
  labelFavorites = 'label_favorites',
  labelFor = 'label_for',
  labelFullMenu = 'label_full-menu',
  labelItemNote = 'label_item-note',
  labelMealSuffix = 'label_meal_suffix',
  mealSuffixPlural = 'label_meal_suffix_plural',
  labelMilesSuffix = 'label_miles_suffix',
  labelNickname = 'label_nickname',
  labelOffCampus = 'label_off-campus',
  labelOnCampus = 'label_on-campus',
  labelOpen = 'label_open',
  labelOptional = 'label_optional',
  labelOrder = 'label_order',
  needCheckin= "need_checkin",
  labelBtnCheckin="lbl_btn_checkin",
  labelOrderOptions = 'label_order-options',
  labelOrderPlacedDescription = 'label_order-placed-description',
  labelOrderPlacedTitle = 'label_order-placed-title',
  labelPaymentMethod = 'label_payment-method',
  labelPendingOrders = 'label_pending-orders',
  labelPickup = 'label_pickup',
  labelPickupAddress = 'label_pickup-address',
  labelPickupFee = 'label_pickup-fee',
  labelPickupTime = 'label_pickup-time',
  labelRecentOrders = 'label_recent-orders',
  labelRemoveItem = 'label_remove-item',
  labelRemovedFromFavorites = 'label_removed-from-favorites',
  labelRoom = 'label_room',
  labelSavedAddresses = 'label_saved-addresses',
  labelSearch = 'label_search',
  labelSelectDeliveryAddress = 'label_select-delivery-address',
  labelSelectPickupAddress = 'label_select-pickup-address',
  labelSelectTime = 'label_select-time',
  labelSetAsDefault = 'label_set-as-default',
  labelState = 'label_state',
  labelSubtotal = 'label_subtotal',
  labelTax = 'label_tax',
  labelTip = 'label_tip',
  labelTipAmount = 'label_tip-amount',
  labelTotal = 'label_total',
  labelOrderNotes = 'label_order-notes',
  labelTomorrow = 'label_tomorrow',
  selectAccount = 'label_select-account',
  noRecentOrders = 'label_no-recent-orders',
  buttonCancelOrder = 'button_cancel-order',
  buttonScheduleOrder = 'button_schedule-order',
  orderSubmitTimeout = 'ordering_timeout',
  connectionLost = 'ordering_connection_lost',
  duplicateOrdering ='ordering_duplicate',
  noConnection = 'ordering_no_connection',
  orderingDatesUnavailable = 'ordering_dates_unavailable',
  lblBtnAdd2Cart = 'lbl_btn_add2_cart',
  titleEditAddresses = 'title_edit_address',
  reorderNotAvailableItemMessage = 'not_orders_items_available',
  insufficientBalanceMealsPayment = 'insufficient_balance_meals_payment'
}
export enum ORDERING_SCAN_GO_CONTENT_STRINGS {
  manualEntryInstructions = 'manual-entry_instructions'
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

export enum MerchantSettings {
  deliveryAddressRestriction = 'merchant.order.delivery_address_restriction',
  pickupLocationsEnabled = 'merchant.order.pickup_locations_enabled',
  orderAheadEnabled = 'merchant.order.order_ahead_enabled',
  disableItemNotes = 'merchant.order.disable_item_notes',
  tipEnabled = 'merchant.tip.enable_tip',
  scanBarcodeEnabled = 'merchant.menu.menu_barcode_enabled',
  manualBarcodeEnabled = 'merchant.menu.menu_add_barcodea_enabled',
  addToCartEnabled = 'merchant.menu.menu_add_items_enabled'
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

export enum INSTITUTION_ADDRESS_RESTRICTIONS {
  both = 0,
  onCampus = 1,
  offCampus = 2
}

export const ORDER_ERROR_CODES = {
  DELIVERY_ADDRESS_COORDS: '9001',
  ORDER_DELIVERY_ITEM_MIN: '9002',
  ORDER_TYPE: '9003',
  CONTACT_INFO: '9004',
  ORDER_ITEM_MIN: '9005',
  ORDER_ITEM_MAX: '9006',
  ITEM_OPTION_MIN: '9007',
  ITEM_OPTION_MAX: '9008',
  ORDER_PAYMENT: '9009',
  INVALID_ORDER: '9010',
  MERCHANT_CLOSED: '9011',
  MENU_UNAVAILABLE: '9012',
  ORDER_STATUS: '9013',
  ORDER_TIP: '9014',
  ORDER_CAPACITY: '9017',
  INSUFFICIENT_FUNDS: '6112',
  INVALID_CARD: '6001',
  TIMEOUT: '9997',
  DUPLICATE_ORDER: '9016', // server duplicate order attempt error code.
  CONNECTION_LOST: '0 Unknown Error', // Client's internet connection lost.
  CONNECTION_TIMEOUT: 'Timeout', // Client's connection timed out,
  INSUFFICIENT_BALANCE: 'get_common.error.insufficient_balance_meals_payment'
};

export const ORDER_VALIDATION_ERRORS: ServerErrorsInfo = {
  9001: 'The selected delivery address could not be mapped to valid coordinates.',
  9003: 'Merchant does not support the requested order type',
  9010: 'Incorrect time for menu item',
  9011: 'The merchant is currently closed and not accepting orders',
  9017: 'Order can not be processed for the given due time, it exceeds the merchants order capacity',
  9801: 'The attempted order contains invalid items for the available menu',
  9005: 'Items in order couldn\'t be lower than merchant supports',
  9006: 'Items in order  couldn\'t be more than merchant supports',
  9002: 'Order minimum total for delivery wasn\'t met',
  9012: 'Menu is not available at this time',
  9014: 'Tip amount is negative or greater than the order subtotal',
  9013: 'Order cannot be canceled due to it has been completed',
  6112: 'You dont have enough money',
  9997: 'Timeout error, please try again later'
};
