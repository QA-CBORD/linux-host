(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~explore-explore-module~ordering-ordering-module~pages-address-edi~cc7158bc"],{

/***/ "./src/app/core/service/coords/coords.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/core/service/coords/coords.service.ts ***!
  \*******************************************************/
/*! exports provided: CoordsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoordsService", function() { return CoordsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");





var Geolocation = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Geolocation;
var CoordsService = /** @class */ (function () {
    function CoordsService() {
        this.fetchInterval = 5000;
        this.timestamp = 0;
        this.latestPosition = {
            timestamp: null,
            coords: {
                accuracy: null,
                latitude: null,
                longitude: null,
            },
        };
        this._location$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](undefined);
        this.emptyPosition = {
            timestamp: null,
            coords: {
                accuracy: null,
                latitude: null,
                longitude: null,
            },
        };
    }
    Object.defineProperty(CoordsService.prototype, "location$", {
        get: function () {
            return this._location$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["skipWhile"])(function (value) { return !value; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoordsService.prototype, "_latestLocation", {
        set: function (position) {
            this.latestPosition = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, position);
            this._location$.next(this.latestPosition);
        },
        enumerable: true,
        configurable: true
    });
    CoordsService.prototype.getCoords = function () {
        var timeDiff = new Date().getTime() - this.timestamp;
        if (timeDiff > this.fetchInterval) {
            this.requestLocationFromDevice();
        }
        return this.location$;
    };
    CoordsService.prototype.requestLocationFromDevice = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true,
            timeout: 5,
        };
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(Geolocation.getCurrentPosition(options))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_this.emptyPosition); }))
            .subscribe(function (resp) {
            /// set timestamp and set location
            _this.timestamp = new Date().getTime();
            _this._latestLocation = resp;
        }, function (error) {
            /// clear timestamp and return empty position so we can try another request
            _this.timestamp = 0;
            _this._latestLocation = _this.emptyPosition;
        });
    };
    CoordsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CoordsService);
    return CoordsService;
}());



/***/ }),

/***/ "./src/app/core/utils/date-helper.ts":
/*!*******************************************!*\
  !*** ./src/app/core/utils/date-helper.ts ***!
  \*******************************************/
/*! exports provided: determineDate, toISOString, toLocaleString, getTime, getDateTimeInGMT, convertGMTintoLocalTime, isSameDay, WEEK, formatDateByContentStrings, sortContentStringsBySourceArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determineDate", function() { return determineDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toISOString", function() { return toISOString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLocaleString", function() { return toLocaleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTime", function() { return getTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateTimeInGMT", function() { return getDateTimeInGMT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertGMTintoLocalTime", function() { return convertGMTintoLocalTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameDay", function() { return isSameDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEEK", function() { return WEEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateByContentStrings", function() { return formatDateByContentStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortContentStringsBySourceArray", function() { return sortContentStringsBySourceArray; });
/* harmony import */ var _sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sections/accounts/shared/ui-components/filter/date-util */ "./src/app/sections/accounts/shared/ui-components/filter/date-util.ts");

var determineDate = function (date) { return (date ? new Date(date) : new Date()); };
var toISOString = function () { return new Date().toISOString(); };
var toLocaleString = function (date) { return determineDate(date).toLocaleString(); };
var getTime = function (date) { return determineDate(date).getTime(); };
var getDateTimeInGMT = function (dueTime, locale, timeZone) {
    var localTimezone = new Date().toLocaleString(locale, { timeZone: timeZone });
    var greenwichTimezone = new Date().toLocaleString(locale, { timeZone: 'GMT' });
    var timeZoneinGMT = (new Date(greenwichTimezone) - new Date(localTimezone)) / 1000 / 60 / 60;
    timeZoneinGMT = timeZoneinGMT * -1;
    var toString = JSON.stringify(timeZoneinGMT);
    timeZoneinGMT = "" + toString[0] + (toString[1].length > 1 ? toString[1] : '0' + toString[1]);
    var usa = new Date(dueTime);
    var usaTime = usa.toLocaleString(locale, {
        hour12: false,
        hour: '2-digit',
        day: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        month: '2-digit',
    });
    var arrOfDatetime = usaTime.split(',');
    var splittedTime = arrOfDatetime[0].split('/');
    return splittedTime[2] + "-" + splittedTime[0] + "-" + splittedTime[1] + "T" + arrOfDatetime[1].trim() + ".000" + timeZoneinGMT + "00";
};
var convertGMTintoLocalTime = function (dueTime, locale, timeZone) {
    var idxOfTimezone = dueTime.indexOf('+');
    var updatedDateFormat = dueTime.slice(0, idxOfTimezone) + "Z";
    var localTimeInString = new Date(updatedDateFormat).toLocaleString(locale, {
        timeZone: timeZone,
        hour12: false,
        hour: '2-digit',
        day: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        month: '2-digit'
    });
    var arrOfDatetime = localTimeInString.split(',');
    var splittedTime = arrOfDatetime[0].split('/');
    return splittedTime[2] + "-" + splittedTime[0] + "-" + splittedTime[1] + "T" + arrOfDatetime[1].trim() + ".000";
};
var isSameDay = function (c, n, index) {
    if (index === void 0) { index = 0; }
    var current = new Date(c);
    var next = new Date(n);
    return (current.getFullYear() === next.getFullYear() &&
        current.getDate() + index === next.getDate() &&
        current.getMonth() === next.getMonth());
};
var WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var formatDateByContentStrings = function (date, weekContentStrings, monthContentStrings) {
    var formattedWeek = sortContentStringsBySourceArray(weekContentStrings, WEEK);
    var formattedMonth = sortContentStringsBySourceArray(monthContentStrings, _sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_0__["MONTH"]);
    return formattedWeek[date.getDay()] + ", " + formattedMonth[date.getMonth()] + " " + date.getDate();
};
var sortContentStringsBySourceArray = function (contentStrings, sourceArray) {
    var res = [];
    var _loop_1 = function (i) {
        var index = sourceArray.findIndex(function (elem) { return elem.toLowerCase() === contentStrings[i].name.toLowerCase(); });
        res[index] = contentStrings[i].value;
    };
    for (var i = 0; i < contentStrings.length; i++) {
        _loop_1(i);
    }
    return res;
};


/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/filter/date-util.ts":
/*!****************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/filter/date-util.ts ***!
  \****************************************************************************/
/*! exports provided: MONTH, getAmountOfMonthFromPeriod, getTimeRangeOfDate, getRangeBetweenDates, getUniquePeriodName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH", function() { return MONTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAmountOfMonthFromPeriod", function() { return getAmountOfMonthFromPeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeRangeOfDate", function() { return getTimeRangeOfDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeBetweenDates", function() { return getRangeBetweenDates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUniquePeriodName", function() { return getUniquePeriodName; });
/* harmony import */ var _accounts_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../accounts.config */ "./src/app/sections/accounts/accounts.config.ts");

var MONTH = [];
MONTH[0] = 'January';
MONTH[1] = 'February';
MONTH[2] = 'March';
MONTH[3] = 'April';
MONTH[4] = 'May';
MONTH[5] = 'June';
MONTH[6] = 'July';
MONTH[7] = 'August';
MONTH[8] = 'September';
MONTH[9] = 'October';
MONTH[10] = 'November';
MONTH[11] = 'December';
var getNameMonth = function (m) {
    return MONTH[m];
};
var createMonthObject = function (date) {
    return {
        name: getNameMonth(date.getMonth()),
        year: date.getFullYear(),
        month: date.getMonth(),
    };
};
var getAmountOfMonthFromPeriod = function (n, date) {
    var startPeriod = date ? date : new Date();
    var month = [];
    var currentMonth = createMonthObject(startPeriod);
    var prevMonth;
    for (var i = 0; i < n; i++) {
        prevMonth = currentMonth;
        var prevMonthDate = prevMonth.month === 0 ? new Date(currentMonth.year - 1, 11) : new Date(currentMonth.year, currentMonth.month - 1);
        currentMonth = createMonthObject(prevMonthDate);
        month.push(currentMonth);
    }
    return month;
};
var getTimeRangeOfDate = function (date) {
    var earliestDate;
    var latestDate;
    var month = 30;
    var halfYear = 180;
    if (date.name === _accounts_config__WEBPACK_IMPORTED_MODULE_0__["TIME_PERIOD"].pastMonth || date.name === _accounts_config__WEBPACK_IMPORTED_MODULE_0__["TIME_PERIOD"].pastSixMonth) {
        var daysBack = date.name === _accounts_config__WEBPACK_IMPORTED_MODULE_0__["TIME_PERIOD"].pastMonth ? month : halfYear;
        earliestDate = null;
        latestDate = new Date(new Date().setDate(new Date().getDate() - daysBack));
    }
    else {
        var nextMonth = new Date(date.year, date.month + 1).valueOf();
        latestDate = new Date(date.year, date.month);
        earliestDate = new Date(nextMonth - 1);
    }
    earliestDate = earliestDate ? earliestDate.toISOString() : null;
    latestDate = latestDate.toISOString();
    return { startDate: earliestDate, endDate: latestDate };
};
var getRangeBetweenDates = function (sourceDate, targetDate) {
    var endDate = getTimeRangeOfDate(sourceDate).startDate;
    var startDate = getTimeRangeOfDate(targetDate).startDate;
    return { startDate: startDate, endDate: endDate };
};
var getUniquePeriodName = function (date) {
    return date.name === _accounts_config__WEBPACK_IMPORTED_MODULE_0__["TIME_PERIOD"].pastSixMonth || date.name === _accounts_config__WEBPACK_IMPORTED_MODULE_0__["TIME_PERIOD"].pastMonth
        ? date.name
        : date.name + " " + date.year;
};


/***/ }),

/***/ "./src/app/sections/ordering/ordering.config.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/ordering/ordering.config.ts ***!
  \******************************************************/
/*! exports provided: LOCAL_ROUTING, ORDERING_CONTENT_STRINGS, MerchantSearchOptionName, MerchantSettings, ORDER_TYPE, PAYMENT_SYSTEM_TYPE, ACCOUNT_TYPES, INSTITUTION_ADDRESS_RESTRICTIONS, ORDER_ERROR_CODES, ORDER_VALIDATION_ERRORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERING_CONTENT_STRINGS", function() { return ORDERING_CONTENT_STRINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantSearchOptionName", function() { return MerchantSearchOptionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantSettings", function() { return MerchantSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_TYPE", function() { return ORDER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_SYSTEM_TYPE", function() { return PAYMENT_SYSTEM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCOUNT_TYPES", function() { return ACCOUNT_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTITUTION_ADDRESS_RESTRICTIONS", function() { return INSTITUTION_ADDRESS_RESTRICTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_ERROR_CODES", function() { return ORDER_ERROR_CODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_VALIDATION_ERRORS", function() { return ORDER_VALIDATION_ERRORS; });
var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["recentOrders"] = "recent-orders";
    LOCAL_ROUTING["favoriteMerchants"] = "favorite-merchants";
    LOCAL_ROUTING["savedAddresses"] = "saved-addresses";
    LOCAL_ROUTING["fullMenu"] = "full-menu";
    LOCAL_ROUTING["cart"] = "cart";
    LOCAL_ROUTING["menuCategoryItems"] = "menu-category-items";
    LOCAL_ROUTING["itemDetail"] = "item-detail";
    LOCAL_ROUTING["addressEdit"] = "address-edit";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var ORDERING_CONTENT_STRINGS;
(function (ORDERING_CONTENT_STRINGS) {
    ORDERING_CONTENT_STRINGS["errorMessageTimeSlotCapacityReached"] = "error_message_time-slot-capacity-reached";
    ORDERING_CONTENT_STRINGS["errorMessageInsufficientFunds"] = "error_message_insufficient-funds";
    ORDERING_CONTENT_STRINGS["buttonAdd"] = "button_add";
    ORDERING_CONTENT_STRINGS["buttonUpdate"] = "label_update";
    ORDERING_CONTENT_STRINGS["backToOrdering"] = "button_back-to-ordering";
    ORDERING_CONTENT_STRINGS["buttonCancel"] = "button_cancel";
    ORDERING_CONTENT_STRINGS["buttonClose"] = "button_close";
    ORDERING_CONTENT_STRINGS["buttonConfirm"] = "button_confirm";
    ORDERING_CONTENT_STRINGS["buttonDashboardStartOrder"] = "button_dashboard_start-order";
    ORDERING_CONTENT_STRINGS["buttonDismiss"] = "button_dismiss";
    ORDERING_CONTENT_STRINGS["buttonDone"] = "button_done";
    ORDERING_CONTENT_STRINGS["buttonExplore"] = "button_explore";
    ORDERING_CONTENT_STRINGS["buttonPlaceOrder"] = "button_place-order";
    ORDERING_CONTENT_STRINGS["buttonReorder"] = "button_reorder";
    ORDERING_CONTENT_STRINGS["buttonSave"] = "button_save";
    ORDERING_CONTENT_STRINGS["buttonBack"] = "button_back";
    ORDERING_CONTENT_STRINGS["buttonSetDeliveryAddress"] = "button_set-delivery-address";
    ORDERING_CONTENT_STRINGS["buttonSetPickupAddress"] = "button_set-pickup-address";
    ORDERING_CONTENT_STRINGS["buttonViewCart"] = "button_view-cart";
    ORDERING_CONTENT_STRINGS["formErrorAddress"] = "form-error_address";
    ORDERING_CONTENT_STRINGS["formErrorBuilding"] = "form-error_building";
    ORDERING_CONTENT_STRINGS["formErrorChooseAddress"] = "form-error_choose-address";
    ORDERING_CONTENT_STRINGS["formErrorCity"] = "form-error_city";
    ORDERING_CONTENT_STRINGS["formErrorRoom"] = "form-error_room";
    ORDERING_CONTENT_STRINGS["formErrorState"] = "form-error_state";
    ORDERING_CONTENT_STRINGS["formErrorTipInvalidFormat"] = "form-error_tip_invalid-format";
    ORDERING_CONTENT_STRINGS["formErrorTipMinimum"] = "form-error_tip_minimum";
    ORDERING_CONTENT_STRINGS["formErrorTipSubtotal"] = "form-error_tip_subtotal";
    ORDERING_CONTENT_STRINGS["labelAddNewAddress"] = "label_add-new-address";
    ORDERING_CONTENT_STRINGS["labelAddedToFavorites"] = "label_added-to-favorites";
    ORDERING_CONTENT_STRINGS["labelAddressLine1"] = "label_address-line-1";
    ORDERING_CONTENT_STRINGS["labelAddressLine2"] = "label_address-line-2";
    ORDERING_CONTENT_STRINGS["labelAsap"] = "label_asap";
    ORDERING_CONTENT_STRINGS["labelBuildings"] = "label_buildings";
    ORDERING_CONTENT_STRINGS["labelCart"] = "label_cart";
    ORDERING_CONTENT_STRINGS["labelCity"] = "label_city";
    ORDERING_CONTENT_STRINGS["labelClosed"] = "label_closed";
    ORDERING_CONTENT_STRINGS["labelCompletedOrders"] = "label_completed-orders";
    ORDERING_CONTENT_STRINGS["labelDashboard"] = "label_dashboard";
    ORDERING_CONTENT_STRINGS["labelDelivery"] = "label_delivery";
    ORDERING_CONTENT_STRINGS["labelDeliveryAddress"] = "label_delivery-address";
    ORDERING_CONTENT_STRINGS["labelDeliveryFee"] = "label_delivery-fee";
    ORDERING_CONTENT_STRINGS["labelDeliveryTime"] = "label_delivery-time";
    ORDERING_CONTENT_STRINGS["labelDiscount"] = "label_discount";
    ORDERING_CONTENT_STRINGS["labelEmptyFavorites"] = "label_empty-favorites";
    ORDERING_CONTENT_STRINGS["labelEmptySearch"] = "label_empty-search";
    ORDERING_CONTENT_STRINGS["labelFavorites"] = "label_favorites";
    ORDERING_CONTENT_STRINGS["labelFor"] = "label_for";
    ORDERING_CONTENT_STRINGS["labelFullMenu"] = "label_full-menu";
    ORDERING_CONTENT_STRINGS["labelItemNote"] = "label_item-note";
    ORDERING_CONTENT_STRINGS["labelMealSuffix"] = "label_meal_suffix";
    ORDERING_CONTENT_STRINGS["mealSuffixPlural"] = "label_meal_suffix_plural";
    ORDERING_CONTENT_STRINGS["labelMilesSuffix"] = "label_miles_suffix";
    ORDERING_CONTENT_STRINGS["labelNickname"] = "label_nickname";
    ORDERING_CONTENT_STRINGS["labelOffCampus"] = "label_off-campus";
    ORDERING_CONTENT_STRINGS["labelOnCampus"] = "label_on-campus";
    ORDERING_CONTENT_STRINGS["labelOpen"] = "label_open";
    ORDERING_CONTENT_STRINGS["labelOptional"] = "label_optional";
    ORDERING_CONTENT_STRINGS["labelOrder"] = "label_order";
    ORDERING_CONTENT_STRINGS["labelOrderOptions"] = "label_order-options";
    ORDERING_CONTENT_STRINGS["labelOrderPlacedDescription"] = "label_order-placed-description";
    ORDERING_CONTENT_STRINGS["labelOrderPlacedTitle"] = "label_order-placed-title";
    ORDERING_CONTENT_STRINGS["labelPaymentMethod"] = "label_payment-method";
    ORDERING_CONTENT_STRINGS["labelPendingOrders"] = "label_pending-orders";
    ORDERING_CONTENT_STRINGS["labelPickup"] = "label_pickup";
    ORDERING_CONTENT_STRINGS["labelPickupAddress"] = "label_pickup-address";
    ORDERING_CONTENT_STRINGS["labelPickupFee"] = "label_pickup-fee";
    ORDERING_CONTENT_STRINGS["labelPickupTime"] = "label_pickup-time";
    ORDERING_CONTENT_STRINGS["labelRecentOrders"] = "label_recent-orders";
    ORDERING_CONTENT_STRINGS["labelRemoveItem"] = "label_remove-item";
    ORDERING_CONTENT_STRINGS["labelRemovedFromFavorites"] = "label_removed-from-favorites";
    ORDERING_CONTENT_STRINGS["labelRoom"] = "label_room";
    ORDERING_CONTENT_STRINGS["labelSavedAddresses"] = "label_saved-addresses";
    ORDERING_CONTENT_STRINGS["labelSearch"] = "label_search";
    ORDERING_CONTENT_STRINGS["labelSelectDeliveryAddress"] = "label_select-delivery-address";
    ORDERING_CONTENT_STRINGS["labelSelectPickupAddress"] = "label_select-pickup-address";
    ORDERING_CONTENT_STRINGS["labelSelectTime"] = "label_select-time";
    ORDERING_CONTENT_STRINGS["labelSetAsDefault"] = "label_set-as-default";
    ORDERING_CONTENT_STRINGS["labelState"] = "label_state";
    ORDERING_CONTENT_STRINGS["labelSubtotal"] = "label_subtotal";
    ORDERING_CONTENT_STRINGS["labelTax"] = "label_tax";
    ORDERING_CONTENT_STRINGS["labelTip"] = "label_tip";
    ORDERING_CONTENT_STRINGS["labelTipAmount"] = "label_tip-amount";
    ORDERING_CONTENT_STRINGS["labelTotal"] = "label_total";
    ORDERING_CONTENT_STRINGS["labelOrderNotes"] = "label_order-notes";
    ORDERING_CONTENT_STRINGS["labelTomorrow"] = "label_tomorrow";
    ORDERING_CONTENT_STRINGS["selectAccount"] = "label_select-account";
    ORDERING_CONTENT_STRINGS["noRecentOrders"] = "label_no-recent-orders";
    ORDERING_CONTENT_STRINGS["buttonCancelOrder"] = "button_cancel-order";
    ORDERING_CONTENT_STRINGS["buttonScheduleOrder"] = "button_schedule-order";
})(ORDERING_CONTENT_STRINGS || (ORDERING_CONTENT_STRINGS = {}));
var MerchantSearchOptionName;
(function (MerchantSearchOptionName) {
    MerchantSearchOptionName["OPEN_NOW"] = "open_now";
    MerchantSearchOptionName["ACTIVE"] = "active";
    MerchantSearchOptionName["TAGS"] = "tags";
    MerchantSearchOptionName["ADDED_AFTER_DATE"] = "addedAfterDate";
    MerchantSearchOptionName["ADDRESS"] = "address";
    MerchantSearchOptionName["LATITUDE"] = "latitude";
    MerchantSearchOptionName["LONGITUDE"] = "longitude";
    MerchantSearchOptionName["ORDER_TYPE"] = "order_type";
    MerchantSearchOptionName["MENU"] = "menu_search";
    MerchantSearchOptionName["INCLUDE_ORDER_TYPES"] = "include_order_types";
    MerchantSearchOptionName["LIMIT_BY_DELIVERY_DISTANCE"] = "limit_by_delivery_distance";
    MerchantSearchOptionName["MERCHANT_ID"] = "merchant_id";
    MerchantSearchOptionName["INCLUDE_SETTINGS"] = "include_settings";
})(MerchantSearchOptionName || (MerchantSearchOptionName = {}));
var MerchantSettings;
(function (MerchantSettings) {
    MerchantSettings["deliveryAddressRestriction"] = "merchant.order.delivery_address_restriction";
    MerchantSettings["pickupLocationsEnabled"] = "merchant.order.pickup_locations_enabled";
    MerchantSettings["orderAheadEnabled"] = "merchant.order.order_ahead_enabled";
    MerchantSettings["disableItemNotes"] = "merchant.order.disable_item_notes";
    MerchantSettings["tipEnabled"] = "merchant.tip.enable_tip";
})(MerchantSettings || (MerchantSettings = {}));
var ORDER_TYPE;
(function (ORDER_TYPE) {
    ORDER_TYPE[ORDER_TYPE["PICKUP"] = 0] = "PICKUP";
    ORDER_TYPE[ORDER_TYPE["DELIVERY"] = 1] = "DELIVERY";
    ORDER_TYPE[ORDER_TYPE["DINEIN"] = 2] = "DINEIN";
})(ORDER_TYPE || (ORDER_TYPE = {}));
var PAYMENT_SYSTEM_TYPE;
(function (PAYMENT_SYSTEM_TYPE) {
    PAYMENT_SYSTEM_TYPE[PAYMENT_SYSTEM_TYPE["OPCS"] = 1] = "OPCS";
    PAYMENT_SYSTEM_TYPE[PAYMENT_SYSTEM_TYPE["CSGOLD"] = 2] = "CSGOLD";
    PAYMENT_SYSTEM_TYPE[PAYMENT_SYSTEM_TYPE["MONETRA"] = 3] = "MONETRA";
    PAYMENT_SYSTEM_TYPE[PAYMENT_SYSTEM_TYPE["USAEPAY"] = 4] = "USAEPAY";
})(PAYMENT_SYSTEM_TYPE || (PAYMENT_SYSTEM_TYPE = {}));
var ACCOUNT_TYPES;
(function (ACCOUNT_TYPES) {
    ACCOUNT_TYPES[ACCOUNT_TYPES["meals"] = 1] = "meals";
    ACCOUNT_TYPES[ACCOUNT_TYPES["charge"] = 2] = "charge";
    ACCOUNT_TYPES[ACCOUNT_TYPES["decliningBalance"] = 3] = "decliningBalance";
})(ACCOUNT_TYPES || (ACCOUNT_TYPES = {}));
var INSTITUTION_ADDRESS_RESTRICTIONS;
(function (INSTITUTION_ADDRESS_RESTRICTIONS) {
    INSTITUTION_ADDRESS_RESTRICTIONS[INSTITUTION_ADDRESS_RESTRICTIONS["both"] = 0] = "both";
    INSTITUTION_ADDRESS_RESTRICTIONS[INSTITUTION_ADDRESS_RESTRICTIONS["onCampus"] = 1] = "onCampus";
    INSTITUTION_ADDRESS_RESTRICTIONS[INSTITUTION_ADDRESS_RESTRICTIONS["offCampus"] = 2] = "offCampus";
})(INSTITUTION_ADDRESS_RESTRICTIONS || (INSTITUTION_ADDRESS_RESTRICTIONS = {}));
var ORDER_ERROR_CODES = {
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
    TIMEOUT: '9997',
};
var ORDER_VALIDATION_ERRORS = {
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


/***/ }),

/***/ "./src/app/sections/ordering/services/cart.service.ts":
/*!************************************************************!*\
  !*** ./src/app/sections/ordering/services/cart.service.ts ***!
  \************************************************************/
/*! exports provided: CartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartService", function() { return CartService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _merchant_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./merchant.service */ "./src/app/sections/ordering/services/merchant.service.ts");
/* harmony import */ var _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/utils/date-helper */ "./src/app/core/utils/date-helper.ts");
/* harmony import */ var _sections_ordering_services_ordering_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/ordering/services/ordering.api.service */ "./src/app/sections/ordering/services/ordering.api.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");









var CartService = /** @class */ (function () {
    function CartService(userFacadeService, merchantService, api) {
        this.userFacadeService = userFacadeService;
        this.merchantService = merchantService;
        this.api = api;
        this.cart = { order: null, merchant: null, menu: null, orderDetailsOptions: null };
        this._cart$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.cart);
        // temporary cachedError for the cart:
        this._catchError = null;
    }
    Object.defineProperty(CartService.prototype, "merchant$", {
        get: function () {
            return this._cart$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var merchant = _a.merchant;
                return merchant;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "orderInfo$", {
        get: function () {
            return this._cart$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var order = _a.order;
                return order;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "menuInfo$", {
        get: function () {
            return this._cart$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var menu = _a.menu;
                return menu;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "orderDetailsOptions$", {
        get: function () {
            return this._cart$.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var orderDetailsOptions = _a.orderDetailsOptions;
                return orderDetailsOptions;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "isMerchantOpenNow$", {
        get: function () {
            return this.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var openNow = _a.openNow;
                return openNow;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "menuItems$", {
        get: function () {
            return this.orderInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var orderItems = _a.orderItems;
                return orderItems.reduce(function (state, _a) {
                    var quantity = _a.quantity;
                    return state + quantity;
                }, 0);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "orderItems$", {
        get: function () {
            return this.orderInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                var orderItems = _a.orderItems;
                return orderItems;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "cartsErrorMessage", {
        get: function () {
            return this._catchError;
        },
        set: function (message) {
            this._catchError = message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "_order", {
        set: function (orderInfo) {
            this.cart.order = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, orderInfo);
            this.onStateChanged();
        },
        enumerable: true,
        configurable: true
    });
    // --------------------------------------- SETTERS BLOCK ---------------------------------------------//
    CartService.prototype.setActiveMerchant = function (merchant) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var prevMerchant;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevMerchant = this.cart.merchant;
                        this.cart.merchant = JSON.parse(JSON.stringify(merchant));
                        if (!(prevMerchant && prevMerchant.id !== merchant.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshCartDate()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!prevMerchant) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setInitialEmptyOrder()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.onStateChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.setActiveMerchantsMenuByOrderOptions = function (dueTime, orderType, address, isASAP) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var id;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cart.orderDetailsOptions = { orderType: orderType, dueTime: dueTime, address: address, isASAP: isASAP };
                        return [4 /*yield*/, this.merchant$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).toPromise()];
                    case 1:
                        id = (_a.sent()).id;
                        return [4 /*yield*/, this.getMerchantMenu(id, dueTime, orderType).then(function (menu) { return (_this.cart.menu = menu); })];
                    case 2:
                        _a.sent();
                        this.onStateChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.setInitialEmptyOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initEmptyOrder().then(function (order) { return (_this.cart.order = order); })];
                    case 1:
                        _a.sent();
                        this.onStateChanged();
                        return [2 /*return*/];
                }
            });
        });
    };
    // ----------------------------------------- REMOVING DATA BLOCK ---------------------------------------//
    CartService.prototype.removeOrderItemFromOrderById = function (id) {
        if (!this.cart.order || !this.cart.order.orderItems.length)
            return;
        var itemIndex = this.cart.order.orderItems.findIndex(function (_a) {
            var oId = _a.id;
            return oId === id;
        });
        if (itemIndex !== -1) {
            var removedItem = this.cart.order.orderItems.splice(itemIndex, 1)[0];
            this.onStateChanged();
            return removedItem;
        }
    };
    CartService.prototype.removeOrderDetailsOptions = function () {
        this.cart.orderDetailsOptions = null;
        this.onStateChanged();
    };
    CartService.prototype.clearCart = function () {
        this.cart.merchant = null;
        this.cart.orderDetailsOptions = null;
        this.cart.menu = null;
        this.cart.order = null;
        this.onStateChanged();
    };
    // ----------------------------------------- UPDATERS BLOCK -----------------------------------------//
    CartService.prototype.addOrderItems = function (orderItems) {
        if (!this.cart.order)
            return;
        if (orderItems instanceof Array)
            orderItems.forEach(this.addOrderItem.bind(this));
        else
            this.addOrderItem(orderItems);
        this.onStateChanged();
    };
    CartService.prototype.validateOrder = function () {
        var _this = this;
        var _a = this.cart.orderDetailsOptions, type = _a.orderType, dueTime = _a.dueTime, addr = _a.address;
        var address = {};
        if (addr) {
            address = type === _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_4__["ORDER_TYPE"].DELIVERY ? { deliveryAddressId: addr.id } : { pickupAddressId: addr.id };
        }
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (_a) {
            var userPhone = _a.phone, timeZone = _a.timeZone, locale = _a.locale;
            _this.cart.order = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _this.cart.order, address, { userPhone: userPhone,
                type: type, dueTime: Object(_core_utils_date_helper__WEBPACK_IMPORTED_MODULE_6__["getDateTimeInGMT"])(dueTime, locale, timeZone) });
            return _this.merchantService.validateOrder(_this.cart.order);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (updatedOrder) { return (_this._order = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, updatedOrder, { dueTime: _this.cart.order.dueTime })); }));
    };
    CartService.prototype.submitOrder = function (accId, cvv) {
        return this.api.submitOrder(this.cart.order, accId, cvv);
    };
    CartService.prototype.updateOrderAddress = function (address) {
        if (this.cart.orderDetailsOptions) {
            this.cart.orderDetailsOptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.cart.orderDetailsOptions, { address: address });
            this.onStateChanged();
        }
    };
    CartService.prototype.updateOrderNote = function (note) {
        this.cart.order.notes = note;
    };
    CartService.prototype.removeLastOrderItem = function () {
        this.cart.order.orderItems.pop();
        this.onStateChanged();
    };
    CartService.prototype.setOrderTip = function (amount) {
        this.cart.order.tip = amount;
        this.cart.order.total = this.calculateTotal();
        this.onStateChanged();
    };
    CartService.prototype.addPaymentInfoToOrder = function (peymentInfo) {
        this.cart.order.orderPayment = [peymentInfo];
    };
    CartService.prototype.clearActiveOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setInitialEmptyOrder()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.getMerchantMenu = function (id, dueTime, type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, timeZone, locale, timeInGMT;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userFacadeService
                            .getUserData$()
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
                            .toPromise()];
                    case 1:
                        _a = _b.sent(), timeZone = _a.timeZone, locale = _a.locale;
                        return [4 /*yield*/, Object(_core_utils_date_helper__WEBPACK_IMPORTED_MODULE_6__["getDateTimeInGMT"])(dueTime, locale, timeZone)];
                    case 2:
                        timeInGMT = _b.sent();
                        return [2 /*return*/, this.merchantService
                                .getDisplayMenu(id, timeInGMT, type)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
                                .toPromise()];
                }
            });
        });
    };
    CartService.prototype.addOrderItem = function (orderItem) {
        this.cart.order.orderItems.push(orderItem);
    };
    CartService.prototype.onStateChanged = function () {
        this._cart$.next(this.cart);
    };
    CartService.prototype.calculateTotal = function () {
        var _a = this.cart.order, subTotal = _a.subTotal, tax = _a.tax, useFee = _a.useFee, deliveryFee = _a.deliveryFee, pickupFee = _a.pickupFee, tip = _a.tip, discount = _a.discount;
        return ((subTotal || 0) +
            (tax || 0) +
            (useFee || 0) +
            (deliveryFee || 0) +
            (pickupFee || 0) +
            (tip || 0) -
            (discount || 0));
    };
    CartService.prototype.initEmptyOrder = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.userFacadeService
                        .getUserData$()
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                        var institutionId = _a.institutionId, userId = _a.id;
                        return {
                            userId: userId,
                            orderItems: [],
                            merchantId: _this.cart.merchant.id,
                            institutionId: institutionId,
                        };
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
                        .toPromise()];
            });
        });
    };
    CartService.prototype.refreshCartDate = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cart.order = null;
                        this.cart.orderDetailsOptions = null;
                        this.cart.menu = null;
                        return [4 /*yield*/, this.setInitialEmptyOrder()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CartService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__["UserFacadeService"],
            _merchant_service__WEBPACK_IMPORTED_MODULE_5__["MerchantService"],
            _sections_ordering_services_ordering_api_service__WEBPACK_IMPORTED_MODULE_7__["OrderingApiService"]])
    ], CartService);
    return CartService;
}());



/***/ }),

/***/ "./src/app/sections/ordering/services/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/sections/ordering/services/index.ts ***!
  \*****************************************************/
/*! exports provided: MerchantService, CartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _merchant_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merchant.service */ "./src/app/sections/ordering/services/merchant.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MerchantService", function() { return _merchant_service__WEBPACK_IMPORTED_MODULE_0__["MerchantService"]; });

/* harmony import */ var _cart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.service */ "./src/app/sections/ordering/services/cart.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CartService", function() { return _cart_service__WEBPACK_IMPORTED_MODULE_1__["CartService"]; });





/***/ }),

/***/ "./src/app/sections/ordering/services/merchant.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/sections/ordering/services/merchant.service.ts ***!
  \****************************************************************/
/*! exports provided: MerchantService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantService", function() { return MerchantService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ordering_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ordering.api.service */ "./src/app/sections/ordering/services/ordering.api.service.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/app/sections/ordering/utils/index.ts");
/* harmony import */ var _ordering_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/commerce/commerce-api.service */ "./src/app/core/service/commerce/commerce-api.service.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");












var MerchantService = /** @class */ (function () {
    function MerchantService(orderingApiService, commerceApiService, userFacadeService, settingsFacadeService) {
        this.orderingApiService = orderingApiService;
        this.commerceApiService = commerceApiService;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.menuMerchants = [];
        this.recentOrders = [];
        this._menuMerchants$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._recentOrders$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
        this._selectedAddress$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this._orderTypes$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
    }
    Object.defineProperty(MerchantService.prototype, "menuMerchants$", {
        get: function () {
            return this._menuMerchants$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "_menuMerchants", {
        set: function (value) {
            this.menuMerchants = value.slice();
            this._menuMerchants$.next(this.menuMerchants.slice());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "orderTypes$", {
        get: function () {
            return this._orderTypes$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "orderTypes", {
        set: function (value) {
            this._orderTypes$.next(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "recentOrders$", {
        get: function () {
            return this._recentOrders$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "_recentOrders", {
        set: function (value) {
            this.recentOrders = value.slice();
            this._recentOrders$.next(this.recentOrders.slice());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "selectedAddress$", {
        get: function () {
            return this._selectedAddress$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MerchantService.prototype, "selectedAddress", {
        set: function (value) {
            this._selectedAddress$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    MerchantService.prototype.getMenuMerchants = function () {
        var _this = this;
        var searchOptions = new _utils__WEBPACK_IMPORTED_MODULE_5__["MerchantSearchOptions"]();
        var op = {
            key: _ordering_config__WEBPACK_IMPORTED_MODULE_6__["MerchantSearchOptionName"].INCLUDE_SETTINGS,
            value: 1,
        };
        searchOptions.addSearchOption(op);
        return this.orderingApiService
            .getMenuMerchants(searchOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (merchantList) { return (_this._menuMerchants = merchantList); }));
    };
    MerchantService.prototype.getMerchantsWithFavoriteInfo = function () {
        var _this = this;
        var searchOptions = new _utils__WEBPACK_IMPORTED_MODULE_5__["MerchantSearchOptions"]();
        searchOptions.addSearchOption({
            key: _ordering_config__WEBPACK_IMPORTED_MODULE_6__["MerchantSearchOptionName"].INCLUDE_SETTINGS,
            value: 1,
        });
        var resultHandler = function (favoriteMerchants, merchantList) {
            if (!favoriteMerchants || favoriteMerchants.length <= 0) {
                _this._menuMerchants = merchantList;
                return merchantList;
            }
            merchantList.forEach(function (merchant) { return (merchant.isFavorite = favoriteMerchants.some(function (item) { return item['id'] === merchant.id; })); });
            _this._menuMerchants = merchantList;
            return merchantList;
        };
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.orderingApiService.getFavoriteMerchants(), this.orderingApiService.getMenuMerchants(searchOptions), resultHandler);
    };
    MerchantService.prototype.validateOrder = function (order) {
        return this.orderingApiService.validateOrder(order);
    };
    MerchantService.prototype.cancelOrderById = function (id) {
        return this.orderingApiService.cancelOrder(id);
    };
    MerchantService.prototype.getRecentOrders = function () {
        var _this = this;
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var id = _a.id, institutionId = _a.institutionId;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.orderingApiService.getSuccessfulOrdersList(id, institutionId), _this.getMenuMerchants(), function (orders, merchants) {
                return orders.map(function (order) {
                    var merchant = merchants.find(function (_a) {
                        var id = _a.id;
                        return id === order.merchantId;
                    });
                    return merchant && tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, order, { merchantName: merchant.name });
                });
            });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (recentOrders) { return (_this._recentOrders = recentOrders); }));
    };
    MerchantService.prototype.getMerchantOrderSchedule = function (merchantId, orderType) {
        return this.orderingApiService.getMerchantOrderSchedule(merchantId, orderType);
    };
    MerchantService.prototype.retrieveUserAddressList = function () {
        return this.userFacadeService.getUserAddresses$();
    };
    MerchantService.prototype.retrievePickupLocations = function (storeAddress, _a) {
        var value = _a.value;
        switch (value) {
            case null:
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([]);
            case 'true':
                return this.orderingApiService.retrievePickupLocations();
            case 'false':
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])([storeAddress]);
        }
    };
    MerchantService.prototype.addFavoriteMerchant = function (merchantId) {
        return this.orderingApiService.addFavoriteMerchant(merchantId);
    };
    MerchantService.prototype.removeFavoriteMerchant = function (merchantId) {
        return this.orderingApiService.removeFavoriteMerchant(merchantId);
    };
    MerchantService.prototype.retrieveBuildings = function () {
        return this.orderingApiService.retrieveBuildings();
    };
    MerchantService.prototype.updateUserAddress = function (updateUserAddress) {
        return this.orderingApiService.updateUserAddress(updateUserAddress);
    };
    MerchantService.prototype.retrieveDeliveryAddresses = function (merchantId) {
        var _this = this;
        return this.getDefaultAddress().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var value = _a.value;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ defaultAddress: value }), _this.retrieveUserAddressList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (addresses) { return _this.filterDeliveryAddresses(merchantId, addresses); })));
        }));
    };
    MerchantService.prototype.getMerchantPaymentAccounts = function (merchantId) {
        return this.orderingApiService.getMerchantPaymentAccounts(merchantId);
    };
    MerchantService.prototype.isOutsideMerchantDeliveryArea = function (merchantId, latitude, longitude) {
        return this.orderingApiService.isOutsideMerchantDeliveryArea(merchantId, latitude, longitude);
    };
    MerchantService.prototype.getSettingByConfig = function (config) {
        return this.orderingApiService.getSettingByConfig(config);
    };
    MerchantService.prototype.getDisplayMenu = function (merchantId, dateTime, orderType) {
        return this.orderingApiService.getDisplayMenu(merchantId, dateTime, orderType);
    };
    MerchantService.prototype.getUserAccounts = function () {
        var _this = this;
        return this.commerceApiService
            .getUserAccounts()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (accounts) { return _this.filterAccountsByPaymentSystem(accounts); }));
    };
    MerchantService.prototype.extractAllAvailableMenuItemsFromMenu = function (_a) {
        var menuCategories = _a.menuCategories;
        return menuCategories.reduce(function (state, _a) {
            var menuCategoryItems = _a.menuCategoryItems;
            var item = menuCategoryItems.map(function (_a) {
                var active = _a.active, visible = _a.visible, menuItem = _a.menuItem;
                if (active && visible && menuItem && menuItem.active && menuItem.visible && !menuItem.deleted) {
                    return menuItem;
                }
            });
            return state.concat(item);
        }, []);
    };
    MerchantService.prototype.extractAllAvailableMenuItemOptionsFromMenuItem = function (_a) {
        var menuItemOptions = _a.menuItemOptions;
        return menuItemOptions.reduce(function (state, _a) {
            var menuGroupItems = _a.menuGroup.menuGroupItems;
            var res = menuGroupItems.reduce(function (state, _a) {
                var active = _a.active, visible = _a.visible, menuItem = _a.menuItem;
                if (active && visible && menuItem.active && menuItem.visible && !menuItem.deleted) {
                    return state.concat([menuItem]);
                }
            }, []);
            return state.concat(res);
        }, []);
    };
    MerchantService.prototype.getDefaultAddress = function () {
        return this.settingsFacadeService.getUserSetting(_app_global__WEBPACK_IMPORTED_MODULE_11__["User"].Settings.DEFAULT_ADDRESS);
    };
    MerchantService.prototype.filterAccountsByPaymentSystem = function (accounts) {
        return accounts.filter(function (account) { return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_8__["isCashlessAccount"])(account); });
    };
    MerchantService.prototype.filterDeliveryAddresses = function (merchantId, addresses) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.menuMerchants$, this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_11__["Settings"].Setting.ADDRESS_RESTRICTION)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var merchants = _a[0], institutionRestriction = _a[1];
            var merchant = merchants.find(function (_a) {
                var id = _a.id;
                return id === merchantId;
            });
            var deliveryAddressRestriction = merchant.settings.map[_ordering_config__WEBPACK_IMPORTED_MODULE_6__["MerchantSettings"].deliveryAddressRestriction];
            var modifiedAddresses;
            if (parseInt(deliveryAddressRestriction.value) === 0) {
                modifiedAddresses = addresses;
            }
            else {
                modifiedAddresses = addresses.filter(function (_a) {
                    var onCampus = _a.onCampus;
                    return onCampus === 1;
                });
            }
            return modifiedAddresses.filter(function (address) {
                if (parseInt(institutionRestriction.value) === 1) {
                    return address.onCampus === 1;
                }
                if (parseInt(institutionRestriction.value) === 2) {
                    return address.onCampus === 0;
                }
                return address;
            });
        }));
    };
    MerchantService.prototype.getDeliveryAddressById = function (deliveryId) {
        return this.retrieveUserAddressList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (addresses) { return addresses.find(function (_a) {
            var id = _a.id;
            return id === deliveryId;
        }); }));
    };
    MerchantService.prototype.removeAddress = function (addressId) {
        return this.orderingApiService.removeAddress(addressId);
    };
    MerchantService.prototype.getCurrentLocaleTime = function () {
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var timeZone = _a.timeZone, locale = _a.locale;
            var date = new Date();
            var dueTime = date.toLocaleString(locale, { hour12: false, timeZone: timeZone });
            return new Date(dueTime);
        }));
    };
    MerchantService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ordering_api_service__WEBPACK_IMPORTED_MODULE_4__["OrderingApiService"],
            _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_7__["CommerceApiService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_9__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_10__["SettingsFacadeService"]])
    ], MerchantService);
    return MerchantService;
}());



/***/ }),

/***/ "./src/app/sections/ordering/services/ordering.api.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/sections/ordering/services/ordering.api.service.ts ***!
  \********************************************************************/
/*! exports provided: OrderingApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderingApiService", function() { return OrderingApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/service/coords/coords.service */ "./src/app/core/service/coords/coords.service.ts");
/* harmony import */ var _ordering_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");









/** This service should be global */
var OrderingApiService = /** @class */ (function () {
    function OrderingApiService(http, userFacadeService, coords) {
        this.http = http;
        this.userFacadeService = userFacadeService;
        this.coords = coords;
        this.serviceUrlMerchant = '/json/merchant';
        this.serviceUrlOrdering = '/json/ordering';
        this.serviceUrlUser = '/json/user';
        this.serviceUrlInstitution = '/json/institution';
    }
    OrderingApiService.prototype.getMenuMerchants = function (searchOptions) {
        var _this = this;
        return this.coords.getCoords().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (geoData) {
            if (geoData && geoData.coords && geoData.coords.latitude !== null && geoData.coords.longitude !== null) {
                searchOptions.addSearchOption({ key: _ordering_config__WEBPACK_IMPORTED_MODULE_6__["MerchantSearchOptionName"].LATITUDE, value: geoData.coords.latitude });
                searchOptions.addSearchOption({ key: _ordering_config__WEBPACK_IMPORTED_MODULE_6__["MerchantSearchOptionName"].LONGITUDE, value: geoData.coords.longitude });
            }
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('getMenuMerchants', { searchOptions: searchOptions }, true, true);
            return _this.http
                .post(_this.serviceUrlMerchant, queryConfig)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
                var response = _a.response;
                return response.list;
            }));
        }));
    };
    OrderingApiService.prototype.getFavoriteMerchants = function () {
        var postParams = { excludeNonOrdering: false };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('getFavoriteMerchants', postParams, true);
        return this.http
            .post(this.serviceUrlMerchant, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response.list;
        }));
    };
    OrderingApiService.prototype.addFavoriteMerchant = function (merchantId) {
        var postParams = { merchantId: merchantId, notes: '' };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('addFavoriteMerchant', postParams, true);
        return this.http
            .post(this.serviceUrlMerchant, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.removeFavoriteMerchant = function (merchantId) {
        var postParams = { merchantId: merchantId };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('removeFavoriteMerchant', postParams, true);
        return this.http
            .post(this.serviceUrlMerchant, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.getSuccessfulOrdersList = function (userId, institutionId) {
        var postParams = { userId: userId, merchantId: null, maxReturn: 30 };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('retrieveSuccessfulOrdersList', postParams, true, true);
        return this.http
            .post(this.serviceUrlOrdering, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response.list;
        }));
    };
    OrderingApiService.prototype.getMerchantOrderSchedule = function (merchantId, orderType) {
        var postParams = { merchantId: merchantId, orderType: orderType, startDate: null, endDate: null };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('getMerchantOrderSchedule', postParams, true);
        return this.http
            .post(this.serviceUrlOrdering, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.validateOrder = function (orderInfo) {
        var postParams = { order: this.adjustOrderIfRollUp(orderInfo) };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('validateOrder', postParams, true);
        return this.http
            .post(this.serviceUrlOrdering, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.cancelOrder = function (orderId) {
        var postParams = { orderId: orderId };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('cancelOrder', postParams, true);
        return this.http
            .post(this.serviceUrlOrdering, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.retrieveBuildings = function () {
        var postParams = { active: true };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('retrieveBuildings', postParams, true, true);
        return this.http
            .post(this.serviceUrlInstitution, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var list = _a.response.list;
            return list;
        }));
    };
    OrderingApiService.prototype.updateUserAddress = function (_a) {
        var _this = this;
        var _b = _a.address1, address1 = _b === void 0 ? null : _b, _c = _a.address2, address2 = _c === void 0 ? null : _c, _d = _a.campus, campus = _d === void 0 ? null : _d, _e = _a.city, city = _e === void 0 ? null : _e, _f = _a.nickname, nickname = _f === void 0 ? null : _f, _g = _a.state, state = _g === void 0 ? null : _g, _h = _a.building, building = _h === void 0 ? null : _h, _j = _a.room, room = _j === void 0 ? null : _j, _k = _a.id, id = _k === void 0 ? null : _k, _l = _a.latitude, latitude = _l === void 0 ? null : _l, _m = _a.longitude, longitude = _m === void 0 ? null : _m;
        var campusValue = parseInt(campus);
        var addedAddress;
        var postParams = {
            address: {
                id: id ? id : null,
                department: null,
                objectRevision: null,
                company: null,
                address1: address1,
                address2: address2 !== null && !address2.length ? null : address2,
                city: city,
                state: state,
                postalcode: null,
                country: null,
                latitude: campusValue ? latitude : null,
                longitude: campusValue ? longitude : null,
                notes: null,
                nickname: nickname === null || !nickname ? address1 : nickname,
                building: building ? building : null,
                floor: null,
                room: room,
                crossStreet: null,
                accessCode: null,
                phone: null,
                phoneExt: null,
                onCampus: campus,
            },
        };
        if (!campusValue) {
            addedAddress = this.addressToGeocode(postParams.address);
        }
        else {
            addedAddress = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(postParams.address);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(addedAddress, this.userFacadeService.getUserData$()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var address = _a[0], user = _a[1];
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('updateUserAddress', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, postParams, { address: address, userId: user.id }), true);
            return _this.http.post(_this.serviceUrlUser, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.retrievePickupLocations = function () {
        var postParams = { active: true };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('retrievePickupLocations', postParams, true, true);
        return this.http
            .post(this.serviceUrlInstitution, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response.list;
        }));
    };
    OrderingApiService.prototype.isOutsideMerchantDeliveryArea = function (merchantId, latitude, longitude) {
        var postParams = { merchantId: merchantId, latitude: latitude, longitude: longitude };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('isOutsideMerchantDeliveryArea', postParams, true);
        return this.http
            .post(this.serviceUrlMerchant, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.getMerchantPaymentAccounts = function (merchantId) {
        var _this = this;
        var methodName = 'getMerchantPaymentAccounts';
        var postParams = { merchantId: merchantId };
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var id = _a.id;
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('getMerchantPaymentAccounts', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, postParams, { userId: id }), true);
            return _this.http.post(_this.serviceUrlMerchant, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.getSettingByConfig = function (config) {
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('retrieveSetting', config, true, true);
        return this.http
            .post('/json/configuration', queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.getDisplayMenu = function (merchantId, dateTime, orderType, locale, depth) {
        if (locale === void 0) { locale = null; }
        if (depth === void 0) { depth = 4; }
        var postParams = { merchantId: merchantId, dateTime: dateTime, orderType: orderType, locale: locale, depth: depth };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('getDisplayMenu', postParams, true);
        return this.http
            .post(this.serviceUrlMerchant, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.addressToGeocode = function (address) {
        var postParams = { address: address };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('addressToGeocode', postParams, true);
        return this.http.post(this.serviceUrlUser, queryConfig).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.submitOrder = function (orderInfo, accountId, cvv) {
        accountId = accountId === 'rollup' ? null : accountId;
        var postParams = { order: this.adjustOrderIfRollUp(orderInfo), accountId: accountId, cvv: cvv };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('submitOrder', postParams, true);
        return this.http
            .post(this.serviceUrlOrdering, queryConfig)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.removeAddress = function (addressId) {
        var _this = this;
        var postParams = { addressId: addressId };
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var id = _a.id;
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_7__["RPCQueryConfig"]('deleteUserAddress', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, postParams, { userId: id }), true);
            return _this.http.post('/json/user', queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    OrderingApiService.prototype.adjustOrderIfRollUp = function (order) {
        if (order &&
            order.orderPayment &&
            order.orderPayment.length > 0 &&
            order.orderPayment[0].accountId &&
            order.orderPayment[0].accountId === 'rollup') {
            order.orderPayment = [];
        }
        return order;
    };
    OrderingApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_8__["UserFacadeService"],
            src_app_core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_5__["CoordsService"]])
    ], OrderingApiService);
    return OrderingApiService;
}());



/***/ }),

/***/ "./src/app/sections/ordering/services/ordering.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/sections/ordering/services/ordering.service.ts ***!
  \****************************************************************/
/*! exports provided: OrderingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderingService", function() { return OrderingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var OrderingService = /** @class */ (function () {
    function OrderingService(contentStringsFacadeService) {
        this.contentStringsFacadeService = contentStringsFacadeService;
    }
    OrderingService.prototype.getContentStringByName = function (name) {
        return this.contentStringsFacadeService.getContentString$(_content_strings__WEBPACK_IMPORTED_MODULE_3__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_3__["CONTENT_STINGS_CATEGORIES"].ordering, name).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (string) { return string ? string.value : ''; }));
    };
    OrderingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_2__["ContentStringsFacadeService"]])
    ], OrderingService);
    return OrderingService;
}());



/***/ }),

/***/ "./src/app/sections/ordering/utils/index.ts":
/*!**************************************************!*\
  !*** ./src/app/sections/ordering/utils/index.ts ***!
  \**************************************************/
/*! exports provided: MerchantSearchOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _merchant_search_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merchant-search-options */ "./src/app/sections/ordering/utils/merchant-search-options.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MerchantSearchOptions", function() { return _merchant_search_options__WEBPACK_IMPORTED_MODULE_0__["MerchantSearchOptions"]; });




/***/ }),

/***/ "./src/app/sections/ordering/utils/merchant-search-options.ts":
/*!********************************************************************!*\
  !*** ./src/app/sections/ordering/utils/merchant-search-options.ts ***!
  \********************************************************************/
/*! exports provided: MerchantSearchOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantSearchOptions", function() { return MerchantSearchOptions; });
var MerchantSearchOptions = /** @class */ (function () {
    function MerchantSearchOptions() {
        this.list = [];
    }
    MerchantSearchOptions.prototype.getSearchOptions = function () {
        return this.list;
    };
    MerchantSearchOptions.prototype.addSearchOption = function (searchOption) {
        this.list.push(searchOption);
    };
    return MerchantSearchOptions;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-header/st-header.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/ui-components/st-header/st-header.module.ts ***!
  \********************************************************************/
/*! exports provided: StHeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StHeaderModule", function() { return StHeaderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _st_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./st-header.component */ "./src/app/shared/ui-components/st-header/st-header.component.ts");





var declarations = [_st_header_component__WEBPACK_IMPORTED_MODULE_4__["StHeaderComponent"]];
var StHeaderModule = /** @class */ (function () {
    function StHeaderModule() {
    }
    StHeaderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"]
            ],
            exports: declarations
        })
    ], StHeaderModule);
    return StHeaderModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~explore-explore-module~ordering-ordering-module~pages-address-edi~cc7158bc.js.map