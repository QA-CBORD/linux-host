(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-automatic-deposit-page-automatic-deposit-module"],{

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

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts ***!
  \***************************************************************************************/
/*! exports provided: AUTO_DEPOSIT_PAYMENT_TYPES, DEPOSIT_FREQUENCY, AUTO_DEPOST_SUCCESS_MESSAGE_TITLE, getLowBalanceSuccessBodyMessage, getWeeklySuccessBodyMessage, getMonthlySuccessBodyMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_DEPOSIT_PAYMENT_TYPES", function() { return AUTO_DEPOSIT_PAYMENT_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEPOSIT_FREQUENCY", function() { return DEPOSIT_FREQUENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_DEPOST_SUCCESS_MESSAGE_TITLE", function() { return AUTO_DEPOST_SUCCESS_MESSAGE_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLowBalanceSuccessBodyMessage", function() { return getLowBalanceSuccessBodyMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWeeklySuccessBodyMessage", function() { return getWeeklySuccessBodyMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMonthlySuccessBodyMessage", function() { return getMonthlySuccessBodyMessage; });
/* harmony import */ var _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/utils/date-helper */ "./src/app/core/utils/date-helper.ts");

var AUTO_DEPOSIT_PAYMENT_TYPES;
(function (AUTO_DEPOSIT_PAYMENT_TYPES) {
    AUTO_DEPOSIT_PAYMENT_TYPES[AUTO_DEPOSIT_PAYMENT_TYPES["automaticDepositOff"] = 0] = "automaticDepositOff";
    AUTO_DEPOSIT_PAYMENT_TYPES[AUTO_DEPOSIT_PAYMENT_TYPES["timeBased"] = 1] = "timeBased";
    AUTO_DEPOSIT_PAYMENT_TYPES[AUTO_DEPOSIT_PAYMENT_TYPES["lowBalance"] = 2] = "lowBalance";
})(AUTO_DEPOSIT_PAYMENT_TYPES || (AUTO_DEPOSIT_PAYMENT_TYPES = {}));
var DEPOSIT_FREQUENCY;
(function (DEPOSIT_FREQUENCY) {
    DEPOSIT_FREQUENCY["week"] = "week";
    DEPOSIT_FREQUENCY["month"] = "month";
})(DEPOSIT_FREQUENCY || (DEPOSIT_FREQUENCY = {}));
var AUTO_DEPOST_SUCCESS_MESSAGE_TITLE;
(function (AUTO_DEPOST_SUCCESS_MESSAGE_TITLE) {
    AUTO_DEPOST_SUCCESS_MESSAGE_TITLE["lowBalance"] = "Low Balance Deposit Enabled!";
    AUTO_DEPOST_SUCCESS_MESSAGE_TITLE["weekly"] = "Weekly Deposit Enabled!";
    AUTO_DEPOST_SUCCESS_MESSAGE_TITLE["monthly"] = "Monthly Deposit Enabled!";
    AUTO_DEPOST_SUCCESS_MESSAGE_TITLE["off"] = "Automatic Deposit Disabled";
})(AUTO_DEPOST_SUCCESS_MESSAGE_TITLE || (AUTO_DEPOST_SUCCESS_MESSAGE_TITLE = {}));
var getLowBalanceSuccessBodyMessage = function (amount, lowAmount, accName) {
    return "We'll automatically add $" + amount + " every time your " + accName + " account drops below $" + lowAmount + ".";
};
var getWeeklySuccessBodyMessage = function (amount, day, accName) {
    return "We'll automatically add $" + amount + " every week on " + _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_0__["WEEK"][day] + " to your " + accName + " account.";
};
var getMonthlySuccessBodyMessage = function (amount, day, accName) {
    var dayAsString;
    switch (day) {
        case 1:
            dayAsString = '1st';
            break;
        case 2:
            dayAsString = '2nd';
            break;
        case 3:
            dayAsString = '3rd';
            break;
        default:
            dayAsString = day + "th";
    }
    return "We'll automatically add $" + amount + " every month on " + dayAsString + " to your " + accName + " account.";
};


/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header title=\"Automatic Deposit\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonIcon]=\"'ios-close'\"\r\n           [backButtonTitle]=\"''\"\r\n           [isToolbarShow]=\"true\"></st-header>\r\n<ion-content class=\"content\"\r\n             *ngIf=\"showContent\">\r\n    <h1 class=\"content__header\">Automatic Deposit Type</h1>\r\n    <st-deposit-type-nav [activeType]=\"autoDepositSettings?.active ? autoDepositSettings?.autoDepositType : autoDepositTypes.automaticDepositOff\"\r\n                         (onTypeChanged)=\"onDepositTypeChangedHandler($event)\"></st-deposit-type-nav>\r\n\r\n    <form class=\"deposit-form\"\r\n          novalidate\r\n          *ngIf=\"formHasBeenPrepared | async\"\r\n          [formGroup]=\"automaticDepositForm\">\r\n        <ng-container *ngIf=\"activeAutoDepositType === autoDepositTypes.timeBased\"\r\n                      [ngTemplateOutlet]=\"timeBased\"></ng-container>\r\n\r\n        <ng-template #lowBalance>\r\n            <st-input-floating-label *ngIf=\"(isLowBalanceFreeInput$ | async); else selectLowBalanceAmount\"\r\n                                     [isError]=\"lowBalanceAmount.errors && (lowBalanceAmount.dirty || lowBalanceAmount.touched)\"\r\n                                     [control]=\"lowBalanceAmount\"\r\n                                     [formControlName]=\"controlNames.lowBalanceAmount\"\r\n                                     title=\"Enter amount\"\r\n                                     class=\"deposit-form__label\"\r\n                                     type=\"number\"\r\n                                     inputmode=\"decimal\"\r\n                                     idd=\"lowBalanceAmount\"\r\n                                     label=\"When my balance drops to\">\r\n                <p class=\"deposit-form__control-error-msg\">\r\n                    {{ lowBalanceAmount.errors?.errorMsg }}\r\n                </p>\r\n            </st-input-floating-label>\r\n\r\n            <ng-template #selectLowBalanceAmount>\r\n                <st-select-floating-label [formControlName]=\"controlNames.lowBalanceAmount\"\r\n                                          [control]=\"lowBalanceAmount\"\r\n                                          [interfaceOptions]=\"customActionSheetOptions\"\r\n                                          [isError]=\"lowBalanceAmount?.invalid && lowBalanceAmount?.touched\"\r\n                                          class=\"deposit-form__label\"\r\n                                          interface=\"action-sheet\"\r\n                                          title=\"Choose amount from a dropdown list below\"\r\n                                          label=\"When my balance drops to\"\r\n                                          idd=\"lowBalanceAmount\">\r\n                    <ng-container role=\"options\">\r\n                        <ion-select-option *ngFor=\"let amount of (lowBalanceValues$ | async)\"\r\n                                           [value]=\"parseFloat(amount)\">{{ amount | transactionUnits }}\r\n                        </ion-select-option>\r\n                    </ng-container>\r\n\r\n                    <ng-container role=\"error\">\r\n                        <p class=\"deposit-form__control-error-msg\">\r\n                            {{ lowBalanceAmount.errors?.errorMsg }}\r\n                        </p>\r\n                    </ng-container>\r\n                </st-select-floating-label>\r\n            </ng-template>\r\n\r\n        </ng-template>\r\n\r\n        <ng-template #timeBased>\r\n            <st-deposit-frequency [autoDepositSettings]=\"autoDepositSettings\"\r\n                                  (onFrequencyChanged)=\"onFrequencyChanged($event)\"></st-deposit-frequency>\r\n\r\n            <ng-container *ngIf=\"activeFrequency === frequency.month && dayOfMonth; else week\">\r\n\r\n                <st-input-floating-label [isError]=\"dayOfMonth.errors && (dayOfMonth.dirty || dayOfMonth.touched)\"\r\n                                         [control]=\"dayOfMonth\"\r\n                                         [formControlName]=\"controlNames.dayOfMonth\"\r\n                                         label=\"Day of Month\"\r\n                                         class=\"deposit-form__label\"\r\n                                         type=\"number\"\r\n                                         idd=\"dayOfMonth\"\r\n                                         title=\"write day of month\">\r\n                    <p class=\"deposit-form__control-error-msg\">\r\n                        {{ dayOfMonth.errors?.errorMsg }}\r\n                    </p>\r\n                </st-input-floating-label>\r\n            </ng-container>\r\n\r\n            <ng-template #week>\r\n\r\n                <st-select-floating-label *ngIf=\"dayOfWeek\"\r\n                                          [formControlName]=\"controlNames.dayOfWeek\"\r\n                                          [control]=\"dayOfWeek\"\r\n                                          [interfaceOptions]=\"customActionSheetOptions\"\r\n                                          [isError]=\"dayOfWeek.invalid && dayOfWeek.touched\"\r\n                                          interface=\"action-sheet\"\r\n                                          title=\"Choose day of week from a dropdown list below\"\r\n                                          label=\"Day of Week\"\r\n                                          class=\"deposit-form__label\"\r\n                                          idd=\"lowBalanceAmount\">\r\n                    <ng-container role=\"options\">\r\n                        <ion-select-option *ngFor=\"let day of weekArray; let i = index;\"\r\n                                           [value]=\"i + 1\">{{day}}\r\n                        </ion-select-option>\r\n                    </ng-container>\r\n\r\n                    <ng-container role=\"error\">\r\n                        <p class=\"deposit-form__control-error-msg\">\r\n                            {{ dayOfWeek.errors?.errorMsg }}\r\n                        </p>\r\n                    </ng-container>\r\n                </st-select-floating-label>\r\n\r\n            </ng-template>\r\n        </ng-template>\r\n\r\n        <st-select-floating-label [formControlName]=\"controlNames.paymentMethod\"\r\n                                  [control]=\"paymentMethod\"\r\n                                  [interfaceOptions]=\"customActionSheetOptions\"\r\n                                  [isError]=\"paymentMethod.invalid && paymentMethod.touched\"\r\n                                  (change)=\"onPaymentMethodChanged($event)\"\r\n                                  interface=\"action-sheet\"\r\n                                  title=\"Choose an account from a dropdown list below\"\r\n                                  label=\"Payment Method\"\r\n                                  idd=\"lowBalanceAmount\"\r\n                                  class=\"deposit-form__label\">\r\n            <ng-container role=\"options\">\r\n\r\n                <ion-select-option *ngIf=\"applePayEnabled$ | async\"\r\n                                   [value]=\"'applePay'\">\r\n                    Apple Pay\r\n                </ion-select-option>\r\n\r\n                <ng-container *ngFor=\"let account of sourceAccounts; trackBy: trackByAccountId\">\r\n\r\n                    <ng-container *ngIf=\"account === paymentTypes.BILLME; then billMe; else creditCard\"></ng-container>\r\n\r\n                    <ng-template #billMe>\r\n                        <ion-select-option [value]=\"account\">\r\n                            Bill Me\r\n                        </ion-select-option>\r\n                    </ng-template>\r\n\r\n                    <ng-template #creditCard>\r\n                        <ion-select-option [value]=\"account\">\r\n                            {{ account.accountTender | creditCardType }} ending in\r\n                            {{ account.lastFour }}\r\n                        </ion-select-option>\r\n                    </ng-template>\r\n\r\n                </ng-container>\r\n\r\n                <ion-select-option *ngIf=\"isCreditPaymentTypeEnabled$ | async\"\r\n                                   [value]=\"'addCC'\">\r\n                    Add credit card\r\n                </ion-select-option>\r\n\r\n            </ng-container>\r\n\r\n            <ng-container role=\"error\">\r\n                <p class=\"deposit-form__control-error-msg\">\r\n                    {{ paymentMethod.errors?.errorMsg }}\r\n                </p>\r\n            </ng-container>\r\n        </st-select-floating-label>\r\n\r\n        <st-select-floating-label [formControlName]=\"controlNames.account\"\r\n                                  [control]=\"account\"\r\n                                  [interfaceOptions]=\"customActionSheetOptions\"\r\n                                  [isError]=\"account.invalid && account.touched\"\r\n                                  class=\"deposit-form__label\"\r\n                                  interface=\"action-sheet\"\r\n                                  title=\"Choose account from a dropdown list below\"\r\n                                  label=\"Account\"\r\n                                  idd=\"account\">\r\n            <ng-container role=\"options\">\r\n                <ion-select-option [value]=\"account\"\r\n                                   *ngFor=\"let account of destinationAccounts; trackBy: trackByAccountId\">\r\n                    {{ account.accountDisplayName }} ({{ account.balance | transactionUnits: account.accountType }})\r\n                </ion-select-option>\r\n            </ng-container>\r\n\r\n            <ng-container role=\"error\">\r\n                <p class=\"deposit-form__control-error-msg\">\r\n                    {{ account.errors?.errorMsg }}\r\n                </p>\r\n            </ng-container>\r\n        </st-select-floating-label>\r\n\r\n        <ng-container *ngIf=\"(isFreeFormAmountToDepositEnabled$ | async); then amountInput; else amountSelect\">\r\n        </ng-container>\r\n\r\n        <ng-template #amountSelect>\r\n            <st-select-floating-label [formControlName]=\"controlNames.amountToDeposit\"\r\n                                      [control]=\"amountToDeposit\"\r\n                                      [interfaceOptions]=\"customActionSheetOptions\"\r\n                                      [isError]=\"amountToDeposit.invalid && amountToDeposit.touched\"\r\n                                      interface=\"action-sheet\"\r\n                                      title=\"Choose amount to deposit from a dropdown list below\"\r\n                                      label=\"Amount to deposit\"\r\n                                      class=\"deposit-form__label\"\r\n                                      idd=\"amountToDeposit\">\r\n                <ng-container role=\"options\">\r\n                    <ion-select-option *ngFor=\"let amount of (amountsForSelect$ | async)\"\r\n                                       [value]=\"parseFloat(amount)\">{{\r\n                      amount | transactionUnits\r\n                        }}</ion-select-option>\r\n                </ng-container>\r\n\r\n                <ng-container role=\"error\">\r\n                    <p class=\"deposit-form__control-error-msg\">\r\n                        {{ amountToDeposit.errors?.errorMsg }}\r\n                    </p>\r\n                </ng-container>\r\n            </st-select-floating-label>\r\n        </ng-template>\r\n\r\n        <ng-template #amountInput>\r\n            <st-input-floating-label [control]=\"amountToDeposit\"\r\n                                     [formControlName]=\"controlNames.amountToDeposit\"\r\n                                     [isError]=\"amountToDeposit.invalid && amountToDeposit.touched\"\r\n                                     title=\"enter amount to deposit\"\r\n                                     class=\"deposit-form__label\"\r\n                                     type=\"number\"\r\n                                     inputmode=\"decimal\"\r\n                                     idd=\"amountToDeposit\"\r\n                                     label=\"Amount to deposit\">\r\n                <p class=\"deposit-form__control-error-msg\">\r\n                    {{ amountToDeposit.errors?.errorMsg }}\r\n                </p>\r\n            </st-input-floating-label>\r\n        </ng-template>\r\n\r\n        <ng-container *ngIf=\"activeAutoDepositType === autoDepositTypes.lowBalance && lowBalanceAmount\"\r\n                      [ngTemplateOutlet]=\"lowBalance\"></ng-container>\r\n\r\n    </form>\r\n\r\n</ion-content>\r\n\r\n<ion-footer class=\"deposit-form__footer\"\r\n            mode=\"ios\">\r\n    <st-button [isDisabled]=\"automaticDepositForm && automaticDepositForm.invalid\"\r\n               (onClick)=\"onSubmit()\">\r\n        save settings\r\n    </st-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.content {\n  --padding-end: 20px;\n  --padding-start: 20px; }\n.content__header {\n    line-height: 20px;\n    letter-spacing: 0;\n    font-size: 16px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-form__control {\n  height: 45px;\n  background: #fff;\n  border-radius: 8px;\n  border: 1px solid #d4d6d8;\n  letter-spacing: 0;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif;\n  --placeholder-color: #626262;\n  --padding-start: 5px; }\n.deposit-form__control--error {\n    border: 1px solid #e22942; }\n.deposit-form__control-error-msg {\n  margin: 0;\n  color: #881928;\n  letter-spacing: 0;\n  min-height: 16px;\n  line-height: 16px;\n  font-size: 12px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-form__label {\n  margin-top: 25px;\n  display: block;\n  font-size: 14px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-form__footer {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px 10px 50px;\n  background-color: #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9hdXRvbWF0aWMtZGVwb3NpdC1wYWdlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcYWNjb3VudHNcXHBhZ2VzXFxhdXRvbWF0aWMtZGVwb3NpdC1wYWdlXFxhdXRvbWF0aWMtZGVwb3NpdC1wYWdlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9hdXRvbWF0aWMtZGVwb3NpdC1wYWdlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLG1CQUFjO0VBQ2QscUJBQWdCLEVBQUE7QUFFaEI7SUFDRSxpQkFBaUI7SUFDakIsaUJBQWlCO0lDUG5CLGVEU21DO0lDTG5DLGdERjBFdUQsRUFBQTtBQy9EdkQ7RUFDRSxZQUFZO0VBQ1osZ0JEK0VjO0VDOUVkLGtCQUFrQjtFQUNsQix5QkRrRXNCO0VDakV0QixpQkFBaUI7RUNwQm5CLGVEc0JtQztFQ2xCbkMsZ0RGMEV1RDtFQ3ZEckQsNEJBQW9CO0VBQ3BCLG9CQUFnQixFQUFBO0FBRWhCO0lBQ0UseUJEbUZrQixFQUFBO0FDL0V0QjtFQUNFLFNBQVM7RUFDVCxjRDhFcUI7RUM3RXJCLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VDcENuQixlRHNDaUM7RUNsQ2pDLDZDRjRFa0QsRUFBQTtBQ3ZDbEQ7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQzNDaEIsZUQ2Q21DO0VDekNuQyxnREYwRXVELEVBQUE7QUM5QnZEO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2Isd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsc0JENENjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9hdXRvbWF0aWMtZGVwb3NpdC1wYWdlL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0IFwidG9vbHNcIjtcclxuXHJcbi5jb250ZW50IHtcclxuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xyXG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcclxuXHJcbiAgJl9faGVhZGVyIHtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4uZGVwb3NpdC1mb3JtIHtcclxuICAmX19jb250cm9sIHtcclxuICAgIGhlaWdodDogNDVweDtcclxuICAgIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1saW5rLXdhdGVyO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNnB4KTtcclxuICAgIC0tcGxhY2Vob2xkZXItY29sb3I6ICM2MjYyNjI7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDVweDtcclxuXHJcbiAgICAmLS1lcnJvciB7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1hbGl6YXJpbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICZfX2NvbnRyb2wtZXJyb3ItbXNnIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGNvbG9yOiAkY29sb3ItZmxhbWUtcmVkO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcbiAgICBtaW4taGVpZ2h0OiAxNnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTJweCk7XHJcbiAgfVxyXG5cclxuICAmX19sYWJlbCB7XHJcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxNHB4KVxyXG4gIH1cclxuXHJcbiAgJl9fZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwcHggMTBweCA1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: AutomaticDepositPageComponent, AUTOMATIC_DEPOSIT_CONTROL_NAMES, CONTROL_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomaticDepositPageComponent", function() { return AutomaticDepositPageComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTOMATIC_DEPOSIT_CONTROL_NAMES", function() { return AUTOMATIC_DEPOSIT_CONTROL_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTROL_ERROR", function() { return CONTROL_ERROR; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auto-deposit.config */ "./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _components_popover_popover_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/popover/popover.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/utils/date-helper */ "./src/app/core/utils/date-helper.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./service/auto-deposit.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/accounts/services/deposit.service */ "./src/app/sections/accounts/services/deposit.service.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @core/service/external-payment/external-payment.service */ "./src/app/core/service/external-payment/external-payment.service.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");

var _a;



















var AutomaticDepositPageComponent = /** @class */ (function () {
    function AutomaticDepositPageComponent(fb, settingsFacadeService, route, depositService, autoDepositService, popoverCtrl, router, toastController, cdRef, loadingService, externalPaymentService, userFacadeService, globalNav) {
        this.fb = fb;
        this.settingsFacadeService = settingsFacadeService;
        this.route = route;
        this.depositService = depositService;
        this.autoDepositService = autoDepositService;
        this.popoverCtrl = popoverCtrl;
        this.router = router;
        this.toastController = toastController;
        this.cdRef = cdRef;
        this.loadingService = loadingService;
        this.externalPaymentService = externalPaymentService;
        this.userFacadeService = userFacadeService;
        this.globalNav = globalNav;
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
        this.billmeSourceAccounts = [];
        this.formHasBeenPrepared = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.sourceAccounts = [];
        this.customActionSheetOptions = {
            cssClass: 'custom-deposit-actionSheet',
        };
    }
    AutomaticDepositPageComponent.prototype.ionViewWillEnter = function () {
        this.globalNav.hideNavBar();
        this.showContent = true;
        this.getAccounts();
        this.cdRef.detectChanges();
        this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    };
    AutomaticDepositPageComponent.prototype.ionViewWillLeave = function () {
        this.globalNav.showNavBar();
        this.deleteForm();
        this.showContent = false;
        this.sourceSubscription.unsubscribe();
    };
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "controlNames", {
        //-------------------- Constants block --------------------------//
        get: function () {
            return AUTOMATIC_DEPOSIT_CONTROL_NAMES;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "autoDepositTypes", {
        get: function () {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "frequency", {
        get: function () {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["DEPOSIT_FREQUENCY"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "weekArray", {
        get: function () {
            return _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_9__["WEEK"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "paymentTypes", {
        get: function () {
            return _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "amountToDeposit", {
        //-------------------- Constants block end--------------------------//
        //-------------------- Controls getter block --------------------------//
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.amountToDeposit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "dayOfMonth", {
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.dayOfMonth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "dayOfWeek", {
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.dayOfWeek);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "paymentMethod", {
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.paymentMethod);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "account", {
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.account);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "lowBalanceAmount", {
        get: function () {
            return this.automaticDepositForm.get(this.controlNames.lowBalanceAmount);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "amountsForSelect$", {
        //-------------------- Controls getter block end--------------------------//
        //-------------------- Dynamic form settings block --------------------------//
        get: function () {
            var _this = this;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["iif"])(function () { return _this.activePaymentType === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME; }, this.billMeAmounts$, this.oneTimeAmounts$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isFreeFormAmountToDepositEnabled$", {
        get: function () {
            var _this = this;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["iif"])(function () { return _this.activePaymentType === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME; }, this.isAllowFreeFormBillMe$, this.isFreeFromDepositEnabled$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isFreeFromDepositEnabled$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.FREEFORM_DEPOSIT_ENABLED)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Boolean(Number(value));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "billMeAmounts$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.FREEFORM_DEPOSIT_ENABLED)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "oneTimeAmounts$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "lowBalanceValues$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.LOW_BALANCE_AMOUNTS)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "autoDepositTenders$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.AUTO_DEPOSIT_TENDERS)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isAllowFreeFormBillMe$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.BILLME_FREEFORM_ENABLED)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Boolean(Number(value));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isLowBalanceFreeInput$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.LOW_BALANCE_FREEFORM_ENABLED)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Boolean(Number(value));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isBillMePaymentTypesEnabled$", {
        get: function () {
            var _this = this;
            return this.getPaymentType(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (types) {
                if (types.length) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(types.indexOf(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME) !== -1);
                }
                return _this.getPaymentType(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.PAYMENT_TYPES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (types) { return types.indexOf(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME) !== -1; }));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "isCreditPaymentTypeEnabled$", {
        get: function () {
            var _this = this;
            return this.getPaymentType(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (types) {
                if (types.length) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(types.indexOf(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].CREDIT) !== -1);
                }
                return _this.getPaymentType(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.PAYMENT_TYPES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (types) { return types.indexOf(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].CREDIT) !== -1; }));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "billmeMappingArr$", {
        get: function () {
            return this.settingsFacadeService
                .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.BILLME_MAPPING)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
                var value = _a.value;
                return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
            }));
        },
        enumerable: true,
        configurable: true
    });
    AutomaticDepositPageComponent.prototype.getPaymentType = function (setting) {
        return this.settingsFacadeService.getSetting(setting).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (settingInfo) {
            return settingInfo.value && settingInfo.value.length > 0 ? Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(settingInfo.value) : [];
        }));
    };
    //-------------------- Dynamic form settings block end--------------------------//
    AutomaticDepositPageComponent.prototype.trackByAccountId = function (i) {
        return i + "-" + Math.random();
    };
    AutomaticDepositPageComponent.prototype.parseFloat = function (value) {
        return parseFloat(value);
    };
    AutomaticDepositPageComponent.prototype.onPaymentMethodChanged = function (value) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var paymentSystem;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(value === 'addCC')) return [3 /*break*/, 2];
                        this.automaticDepositForm.reset();
                        return [4 /*yield*/, this.definePaymentSystemType()];
                    case 1:
                        paymentSystem = _a.sent();
                        if (paymentSystem === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_SYSTEM_TYPE"].MONETRA) {
                            this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["PATRON_NAVIGATION"].accounts, _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["LOCAL_ROUTING"].addCreditCard], {
                                queryParams: { skip: true },
                            });
                            return [2 /*return*/];
                        }
                        this.addUSAePayCreditCard();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.defineDestAccounts(value).then(function () { return _this.setValidators(); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.defineDestAccounts = function (target) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var type;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = target;
                        if (target instanceof Object) {
                            type = this.isBillMeAccount(target) ? _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME : _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].CREDIT;
                        }
                        else {
                            type = target;
                        }
                        if (this.activePaymentType && this.activePaymentType !== type) {
                            this.account.reset();
                            this.amountToDeposit.reset();
                        }
                        this.activePaymentType = type;
                        if (!(type === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME)) return [3 /*break*/, 2];
                        this.destinationAccounts = this.billmeDestinationAccounts;
                        return [4 /*yield*/, this.setBillmeActiveAccount()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.destinationAccounts = this.creditCardDestinationAccounts;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.getAccounts = function () {
        var _this = this;
        var subscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this.autoDepositTenders$, this.billmeMappingArr$, this.isBillMePaymentTypesEnabled$, this.isCreditPaymentTypeEnabled$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (_a) {
            var tenders = _a[0], mapping = _a[1], isBillMeEnabled = _a[2], isCreditCardEnabled = _a[3];
            return _this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])(function (_a) {
                var _b = _a.data, accounts = _b.accounts, depositSettings = _b.depositSettings;
                _this.autoDepositSettings = depositSettings;
                _this.creditCardSourceAccounts = isCreditCardEnabled
                    ? _this.depositService.filterAccountsByPaymentSystem(accounts)
                    : [];
                _this.sourceAccounts = _this.creditCardSourceAccounts.slice();
                if (isBillMeEnabled)
                    _this.sourceAccounts.push(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME);
                _this.creditCardDestinationAccounts = _this.depositService.filterCreditCardDestAccounts(tenders, accounts);
                _this.billmeDestinationAccounts = _this.depositService.filterBillmeDestAccounts(mapping, accounts);
                _this.billmeSourceAccounts = _this.depositService.filterBillmeSourceAccounts(mapping, accounts);
            }));
        }))
            .subscribe(function (_a) {
            var _b = _a.data, accounts = _b.accounts, depositSettings = _b.depositSettings;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                var _c;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.initPredefinedAccounts(depositSettings, accounts);
                            this.defineDestAccounts(this.paymentMethodAccount);
                            _c = this.autoDepositSettings.active;
                            if (!_c) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.initForm()];
                        case 1:
                            _c = (_d.sent());
                            _d.label = 2;
                        case 2:
                            _c;
                            return [2 /*return*/];
                    }
                });
            });
        });
        this.sourceSubscription.add(subscription);
    };
    AutomaticDepositPageComponent.prototype.initPredefinedAccounts = function (settings, accounts) {
        var _this = this;
        this.paymentMethodAccount = settings.fromAccountId && accounts.find(function (acc) { return acc.id === settings.fromAccountId; });
        if (this.paymentMethodAccount &&
            !this.creditCardSourceAccounts.some(function (_a) {
                var id = _a.id;
                return id === _this.paymentMethodAccount.id;
            })) {
            this.paymentMethodAccount = _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME;
        }
        this.destinationAccount = settings.toAccountId && accounts.find(function (acc) { return acc.id === settings.toAccountId; });
    };
    AutomaticDepositPageComponent.prototype.isBillMeAccount = function (_a) {
        var id = _a.id;
        return this.billmeSourceAccounts.some(function (acc) { return acc.id === id; });
    };
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "_activeType", {
        set: function (type) {
            this.activeAutoDepositType = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomaticDepositPageComponent.prototype, "_activeFrequency", {
        set: function (freq) {
            this.activeFrequency = freq;
        },
        enumerable: true,
        configurable: true
    });
    // -------------------- Events handlers block--------------------------//
    AutomaticDepositPageComponent.prototype.onDepositTypeChangedHandler = function (type) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var isAutomaticDepositOff, wasDestroyed;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isAutomaticDepositOff = type === this.autoDepositTypes.automaticDepositOff;
                        wasDestroyed = type !== this.autoDepositTypes.automaticDepositOff &&
                            this.activeAutoDepositType === this.autoDepositTypes.automaticDepositOff;
                        if (isAutomaticDepositOff) {
                            this.deleteForm();
                            return [2 /*return*/, (this._activeType = type)];
                        }
                        else if (wasDestroyed) {
                            this.initForm();
                        }
                        return [4 /*yield*/, this.updateFormStateByDepositType(type)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.onFrequencyChanged = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._activeFrequency = event;
                        return [4 /*yield*/, this.updateFormStateByDepositType(this.activeAutoDepositType, event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.onSubmit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var predefinedUpdateCall, _a, paymentMethod, account_1, rest, isBillme_1, sourceAccForBillmeDeposit, resultSettings_1;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.automaticDepositForm && this.automaticDepositForm.invalid)
                            return [2 /*return*/];
                        if (!(this.automaticDepositForm === null)) return [3 /*break*/, 1];
                        predefinedUpdateCall = this.autoDepositService.updateAutoDepositSettings(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.autoDepositSettings, { active: false }));
                        return [3 /*break*/, 4];
                    case 1:
                        _a = this.automaticDepositForm.value, paymentMethod = _a.paymentMethod, account_1 = _a.account, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["paymentMethod", "account"]);
                        isBillme_1 = paymentMethod === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME;
                        sourceAccForBillmeDeposit = this.billmeMappingArr$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (billmeMappingArr) { return _this.depositService.sourceAccForBillmeDeposit(account_1, billmeMappingArr); }));
                        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased)
                            this.timeBasedResolver();
                        resultSettings_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.autoDepositSettings, rest, { autoDepositType: this.activeAutoDepositType, toAccountId: account_1.id, active: true });
                        if (!isBillme_1) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setBillmeActiveAccount()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        predefinedUpdateCall = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["iif"])(function () { return isBillme_1; }, sourceAccForBillmeDeposit, Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(paymentMethod)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (sourceAcc) {
                            return _this.autoDepositService.updateAutoDepositSettings(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, resultSettings_1, { fromAccountId: sourceAcc.id }));
                        }));
                        _b.label = 4;
                    case 4:
                        predefinedUpdateCall
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
                            .subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { var _a; return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = res;
                                    if (!_a) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.showModal()];
                                case 1:
                                    _a = (_b.sent());
                                    _b.label = 2;
                                case 2: return [2 /*return*/, _a];
                            }
                        }); }); }, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.showToast('Something went wrong please try again later...')];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.timeBasedResolver = function () {
        this.autoDepositSettings =
            this.activeFrequency === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["DEPOSIT_FREQUENCY"].week
                ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.autoDepositSettings, { dayOfMonth: 0 }) : tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.autoDepositSettings, { dayOfWeek: 0 });
    };
    // -------------------- Events handlers block end --------------------------//
    // -------------------- Form main block --------------------------//
    AutomaticDepositPageComponent.prototype.initForm = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var paymentBlock;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentBlock = this.initPaymentFormBlock();
                        this.automaticDepositForm = this.fb.group(paymentBlock);
                        return [4 /*yield*/, this.setValidators()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setBillmeActiveAccount()];
                    case 2:
                        _a.sent();
                        this.formHasBeenPrepared.next(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.setBillmeActiveAccount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var account, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.activePaymentType !== _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME || !this.automaticDepositForm)
                            return [2 /*return*/];
                        account = this.automaticDepositForm.value.account;
                        if (!account)
                            return [2 /*return*/];
                        _a = this;
                        return [4 /*yield*/, this.billmeMappingArr$
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (billmeMappingArr) { return _this.depositService.sourceAccForBillmeDeposit(account, billmeMappingArr); }))
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])())
                                .toPromise()];
                    case 1:
                        _a.activeBillMeAccount = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.deleteForm = function () {
        this.automaticDepositForm = null;
        this.formHasBeenPrepared.next(false);
    };
    AutomaticDepositPageComponent.prototype.updateFormStateByDepositType = function (type, frequency) {
        if (frequency === void 0) { frequency = this.activeFrequency; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var control, controlName, controlSetting;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        control = this.getControlByActiveState(type, frequency);
                        controlName = Object.keys(control)[0];
                        controlSetting = control[controlName];
                        this.automaticDepositForm.addControl(controlName, new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](controlSetting[0], controlSetting[1]));
                        this.updateActiveState(type, frequency);
                        return [4 /*yield*/, this.setValidators()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.getControlByActiveState = function (type, frequency) {
        var control;
        if (type === this.autoDepositTypes.lowBalance) {
            this.cleanControls([this.controlNames.dayOfMonth, this.controlNames.dayOfWeek]);
            control = this.initLowBalanceFormBlock();
        }
        if (type === this.autoDepositTypes.timeBased) {
            var timeBasedControlUnused = frequency === this.frequency.month ? this.controlNames.dayOfWeek : this.controlNames.dayOfMonth;
            this.cleanControls([this.controlNames.lowBalanceAmount, timeBasedControlUnused]);
            control = this.initTimeBasedBlock(frequency);
        }
        return control;
    };
    AutomaticDepositPageComponent.prototype.updateActiveState = function (type, frequency) {
        this._activeType = type;
        this._activeFrequency = frequency;
    };
    AutomaticDepositPageComponent.prototype.cleanControls = function (controlNames) {
        for (var i = 0; i < controlNames.length; i++) {
            this.automaticDepositForm.contains(controlNames[i]) && this.automaticDepositForm.removeControl(controlNames[i]);
        }
    };
    AutomaticDepositPageComponent.prototype.getAmountToDepositErrors = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var amountToDeposit, maxSetting, minSetting, max, min;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amountToDeposit = AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit;
                        return [4 /*yield*/, this.settingsFacadeService
                                .getSetting(this.activePaymentType === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME
                                ? src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.BILLME_AMOUNT_MAX
                                : src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.CREDITCARD_AMOUNT_MAX)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])())
                                .toPromise()];
                    case 1:
                        maxSetting = _a.sent();
                        return [4 /*yield*/, this.settingsFacadeService
                                .getSetting(this.activePaymentType === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME
                                ? src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.BILLME_AMOUNT_MIN
                                : src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.CREDITCARD_AMOUNT_MIN)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])())
                                .toPromise()];
                    case 2:
                        minSetting = _a.sent();
                        max = parseFloat(maxSetting.value);
                        min = parseFloat(minSetting.value);
                        return [2 /*return*/, [
                                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[amountToDeposit].requiredEnter),
                                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["validateInputAmount"], CONTROL_ERROR[amountToDeposit].input),
                                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(max), CONTROL_ERROR[amountToDeposit].maximum + Number(max).toFixed(2)),
                                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(min), CONTROL_ERROR[amountToDeposit].minimum + Number(min).toFixed(2)),
                            ]];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.setValidators = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var lowBalanceAmount, amountToDeposit, isLowBalanceFreeInput, freeFormErrors, selectErrors, errors, isAllowFreeFormAmountToDeposit, errors, _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        lowBalanceAmount = AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount, amountToDeposit = AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit;
                        if (!this.automaticDepositForm.contains(this.controlNames.lowBalanceAmount)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isLowBalanceFreeInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 1:
                        isLowBalanceFreeInput = _b.sent();
                        freeFormErrors = [
                            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[lowBalanceAmount].requiredEnter),
                            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["validateInputAmount"], CONTROL_ERROR[lowBalanceAmount].input),
                            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(6), CONTROL_ERROR[lowBalanceAmount].maximum),
                            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(0), CONTROL_ERROR[lowBalanceAmount].minimum),
                        ];
                        selectErrors = Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[lowBalanceAmount].requiredSelect);
                        errors = isLowBalanceFreeInput ? freeFormErrors : selectErrors;
                        this.automaticDepositForm.get(lowBalanceAmount).setValidators(errors);
                        _b.label = 2;
                    case 2:
                        if (!this.automaticDepositForm.contains(amountToDeposit)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.isFreeFormAmountToDepositEnabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).toPromise()];
                    case 3:
                        isAllowFreeFormAmountToDeposit = _b.sent();
                        if (!isAllowFreeFormAmountToDeposit) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getAmountToDepositErrors()];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[amountToDeposit].requiredSelect);
                        _b.label = 6;
                    case 6:
                        errors = _a;
                        this.automaticDepositForm.get(amountToDeposit).setValidators(errors);
                        this.automaticDepositForm.get(this.controlNames.amountToDeposit).value !== '' &&
                            this.amountToDeposit.markAsTouched();
                        _b.label = 7;
                    case 7:
                        // Temporary method for detecting changes after markAsTouched() execute;
                        setTimeout(function () {
                            _this.cdRef.detectChanges();
                        }, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    // -------------------- Controls block --------------------------//
    AutomaticDepositPageComponent.prototype.initPaymentFormBlock = function () {
        var _a;
        var account = AUTOMATIC_DEPOSIT_CONTROL_NAMES.account, paymentMethod = AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod, amountToDeposit = AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit;
        var accountValidators = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[account].required)];
        var paymentMethodValidators = [
            Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[paymentMethod].required),
        ];
        return _a = {},
            _a[account] = [this.destinationAccount || '', accountValidators],
            _a[amountToDeposit] = [this.autoDepositSettings.amount],
            _a[paymentMethod] = [this.paymentMethodAccount || '', paymentMethodValidators],
            _a;
    };
    AutomaticDepositPageComponent.prototype.initTimeBasedBlock = function (frequency) {
        var _a;
        var dayOfMonth = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth, dayOfWeek = AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek;
        var validators;
        var controlName;
        var day;
        if (frequency === this.frequency.month) {
            day = this.autoDepositSettings.dayOfMonth;
            controlName = dayOfMonth;
            validators = [
                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[dayOfMonth].required),
                Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["validateMonthRange"], CONTROL_ERROR[dayOfMonth].range),
            ];
        }
        else {
            day = this.autoDepositSettings.dayOfWeek;
            controlName = dayOfWeek;
            validators = [Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["formControlErrorDecorator"])(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, CONTROL_ERROR[dayOfWeek].required)];
        }
        return _a = {}, _a[controlName] = [day ? day : '', validators], _a;
    };
    AutomaticDepositPageComponent.prototype.initLowBalanceFormBlock = function () {
        var _a;
        return _a = {}, _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount] = [this.autoDepositSettings.lowBalanceAmount], _a;
    };
    // -------------------- Controls block end --------------------------//
    // ---------------------- interactive block ----------------------------------//
    AutomaticDepositPageComponent.prototype.getModalTitle = function () {
        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].lowBalance) {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOST_SUCCESS_MESSAGE_TITLE"].lowBalance;
        }
        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased) {
            return this.activeFrequency === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["DEPOSIT_FREQUENCY"].month
                ? _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOST_SUCCESS_MESSAGE_TITLE"].monthly
                : _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOST_SUCCESS_MESSAGE_TITLE"].weekly;
        }
        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].automaticDepositOff) {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOST_SUCCESS_MESSAGE_TITLE"].off;
        }
    };
    AutomaticDepositPageComponent.prototype.getModalBodyMessage = function () {
        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].lowBalance) {
            return Object(_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["getLowBalanceSuccessBodyMessage"])(this.amountToDeposit.value, this.lowBalanceAmount.value, 'Bill me');
        }
        if (this.activeAutoDepositType === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased) {
            return this.activeFrequency === _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["DEPOSIT_FREQUENCY"].month
                ? Object(_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["getMonthlySuccessBodyMessage"])(this.amountToDeposit.value, this.dayOfMonth.value, 'Bill me')
                : Object(_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["getWeeklySuccessBodyMessage"])(this.amountToDeposit.value, this.dayOfWeek.value - 1, 'Bill me');
        }
    };
    AutomaticDepositPageComponent.prototype.definePaymentSystemType = function () {
        return this.settingsFacadeService
            .getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["Settings"].Setting.CREDIT_PAYMENT_SYSTEM_TYPE)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (_a) {
            var value = _a.value;
            return parseInt(value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])())
            .toPromise();
    };
    AutomaticDepositPageComponent.prototype.addUSAePayCreditCard = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.externalPaymentService.addUSAePayCreditCard())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])(function (_a) {
            var success = _a.success, errorMessage = _a.errorMessage;
            if (!success) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(errorMessage);
            }
            _this.loadingService.showSpinner();
            // Update user accounts for refreshing Credit Card dropdown list
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(_this.depositService.getUserAccounts(), _this.isBillMePaymentTypesEnabled$);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1))
            .subscribe(function (_a) {
            var _b = _a[0], accounts = _b === void 0 ? [] : _b, isBillMeEnabled = _a[1];
            var creditCardSourceAccounts = (accounts.length && _this.depositService.filterAccountsByPaymentSystem(accounts)) || [];
            _this.sourceAccounts = creditCardSourceAccounts.slice();
            if (isBillMeEnabled)
                _this.sourceAccounts.push(_sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_12__["PAYMENT_TYPE"].BILLME);
            _this.paymentMethod.setValue('');
            _this.cdRef.detectChanges();
        }, function (err) { return _this.showToast(err); }, function () { return _this.loadingService.closeSpinner(); });
    };
    AutomaticDepositPageComponent.prototype.showModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _components_popover_popover_component__WEBPACK_IMPORTED_MODULE_6__["PopoverComponent"],
                            componentProps: {
                                data: { title: this.getModalTitle(), message: this.getModalBodyMessage() },
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_14__["PATRON_NAVIGATION"].accounts])];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.showToast = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 3000,
                            position: 'top',
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AutomaticDepositPageComponent.prototype.saveSettings = function ($event) {
        var isTypeChanged = (!this.autoDepositSettings.active &&
            this.activeAutoDepositType !== _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].automaticDepositOff) ||
            (this.autoDepositSettings.active && this.activeAutoDepositType !== this.autoDepositSettings.autoDepositType);
        var isFormTouched = this.automaticDepositForm && this.automaticDepositForm.touched;
        if (isTypeChanged || isFormTouched) {
            $event.returnValue = '';
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:beforeunload', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [BeforeUnloadEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], AutomaticDepositPageComponent.prototype, "saveSettings", null);
    AutomaticDepositPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-automatic-deposit-page',
            template: __webpack_require__(/*! ./automatic-deposit-page.component.html */ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./automatic-deposit-page.component.scss */ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_17__["SettingsFacadeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_13__["DepositService"],
            _service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_11__["AutoDepositService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["PopoverController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ToastController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_15__["LoadingService"],
            _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__["ExternalPaymentService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_16__["UserFacadeService"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_19__["GlobalNavService"]])
    ], AutomaticDepositPageComponent);
    return AutomaticDepositPageComponent;
}());

var AUTOMATIC_DEPOSIT_CONTROL_NAMES;
(function (AUTOMATIC_DEPOSIT_CONTROL_NAMES) {
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["amountToDeposit"] = "amount";
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["account"] = "account";
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["paymentMethod"] = "paymentMethod";
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["lowBalanceAmount"] = "lowBalanceAmount";
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["dayOfWeek"] = "dayOfWeek";
    AUTOMATIC_DEPOSIT_CONTROL_NAMES["dayOfMonth"] = "dayOfMonth";
})(AUTOMATIC_DEPOSIT_CONTROL_NAMES || (AUTOMATIC_DEPOSIT_CONTROL_NAMES = {}));
var CONTROL_ERROR = (_a = {},
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.amountToDeposit] = {
        requiredEnter: 'You must enter an amount.',
        input: '',
        requiredSelect: 'You must select a suitable amount from select',
        maximum: 'Maximum Deposit Amount: $',
        minimum: 'Minimum Deposit Amount: $',
    },
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.paymentMethod] = {
        required: 'You must select payment method.',
    },
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.account] = {
        required: 'You must choose an account.',
    },
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.lowBalanceAmount] = {
        requiredEnter: 'You must enter an amount.',
        input: '',
        minimum: 'Value can not be lower than 0',
        maximum: 'Value can not be greater than 999 999',
        requiredSelect: 'You must select a suitable amount from select',
    },
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfWeek] = {
        required: 'You must select day of week',
    },
    _a[AUTOMATIC_DEPOSIT_CONTROL_NAMES.dayOfMonth] = {
        required: 'You must enter day of month',
        range: 'You must enter number between 1 and 31',
    },
    _a);


/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit.module.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit.module.ts ***!
  \********************************************************************************************/
/*! exports provided: AutomaticDepositModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomaticDepositModule", function() { return AutomaticDepositModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _automatic_deposit_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./automatic-deposit-page.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.ts");
/* harmony import */ var _automatic_deposit_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./automatic-deposit.routing.module */ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit.routing.module.ts");
/* harmony import */ var _components_deposit_type_nav_deposit_type_nav_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/deposit-type-nav/deposit-type-nav.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.ts");
/* harmony import */ var _service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./service/auto-deposit.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts");
/* harmony import */ var _service_auto_deposit_api_service_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/auto-deposit-api-service.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit-api-service.service.ts");
/* harmony import */ var _resolver_automatic_deposit_resolver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resolver/automatic-deposit.resolver */ "./src/app/sections/accounts/pages/automatic-deposit-page/resolver/automatic-deposit.resolver.ts");
/* harmony import */ var _components_deposit_frequency_deposit_frequency_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/deposit-frequency/deposit-frequency.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.ts");
/* harmony import */ var _components_popover_popover_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/popover/popover.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.ts");
/* harmony import */ var _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/accounts/shared/pipes/credit-card-type/credit-card-type.module */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts");
/* harmony import */ var _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @shared/ui-components/st-input-floating-label/st-input-floating-label.module */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/ui-components/st-select-floating-label/st-select-floating-label.module */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_deactivate_page_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard */ "./src/app/sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard.ts");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_components_confirm_usaved_changes_popover_confirm_unsaved_changes_popover_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");






















var declarations = [
    _automatic_deposit_page_component__WEBPACK_IMPORTED_MODULE_6__["AutomaticDepositPageComponent"],
    _components_deposit_type_nav_deposit_type_nav_component__WEBPACK_IMPORTED_MODULE_8__["DepositTypeNavComponent"],
    _components_deposit_frequency_deposit_frequency_component__WEBPACK_IMPORTED_MODULE_12__["DepositFrequencyComponent"],
    _components_popover_popover_component__WEBPACK_IMPORTED_MODULE_13__["PopoverComponent"],
    _sections_accounts_pages_automatic_deposit_page_components_confirm_usaved_changes_popover_confirm_unsaved_changes_popover_component__WEBPACK_IMPORTED_MODULE_20__["ConfirmUnsavedChangesPopoverComponent"]
];
var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
    _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_15__["StInputFloatingLabelModule"],
    _shared_ui_components_st_select_floating_label_st_select_floating_label_module__WEBPACK_IMPORTED_MODULE_16__["StSelectFloatingLabelModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_17__["StHeaderModule"],
    _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_18__["StPopoverLayoutModule"],
    _shared_pipes__WEBPACK_IMPORTED_MODULE_4__["TransactionUnitsPipeModule"],
    _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_14__["CreditCardTypeModule"],
    _automatic_deposit_routing_module__WEBPACK_IMPORTED_MODULE_7__["AutomaticDepositRoutingModule"],
    _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_21__["StButtonModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"].forRoot({
        scrollPadding: false,
        scrollAssist: true,
    }),
];
var entryComponents = [_components_popover_popover_component__WEBPACK_IMPORTED_MODULE_13__["PopoverComponent"], _sections_accounts_pages_automatic_deposit_page_components_confirm_usaved_changes_popover_confirm_unsaved_changes_popover_component__WEBPACK_IMPORTED_MODULE_20__["ConfirmUnsavedChangesPopoverComponent"]];
var providers = [_service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_9__["AutoDepositService"], _service_auto_deposit_api_service_service__WEBPACK_IMPORTED_MODULE_10__["AutoDepositApiService"], _resolver_automatic_deposit_resolver__WEBPACK_IMPORTED_MODULE_11__["AutomaticDepositResolver"], _sections_accounts_pages_automatic_deposit_page_deactivate_page_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_19__["UnsavedChangesGuard"]];
var AutomaticDepositModule = /** @class */ (function () {
    function AutomaticDepositModule() {
    }
    AutomaticDepositModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                imports,
            ],
            declarations: declarations,
            providers: providers,
            entryComponents: entryComponents,
        })
    ], AutomaticDepositModule);
    return AutomaticDepositModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit.routing.module.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit.routing.module.ts ***!
  \****************************************************************************************************/
/*! exports provided: AutomaticDepositRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomaticDepositRoutingModule", function() { return AutomaticDepositRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _automatic_deposit_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./automatic-deposit-page.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/automatic-deposit-page.component.ts");
/* harmony import */ var _resolver_automatic_deposit_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolver/automatic-deposit.resolver */ "./src/app/sections/accounts/pages/automatic-deposit-page/resolver/automatic-deposit.resolver.ts");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_deactivate_page_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard */ "./src/app/sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard.ts");






var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _automatic_deposit_page_component__WEBPACK_IMPORTED_MODULE_3__["AutomaticDepositPageComponent"],
        resolve: { data: _resolver_automatic_deposit_resolver__WEBPACK_IMPORTED_MODULE_4__["AutomaticDepositResolver"] },
        canDeactivate: [_sections_accounts_pages_automatic_deposit_page_deactivate_page_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_5__["UnsavedChangesGuard"]]
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var AutomaticDepositRoutingModule = /** @class */ (function () {
    function AutomaticDepositRoutingModule() {
    }
    AutomaticDepositRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], AutomaticDepositRoutingModule);
    return AutomaticDepositRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.html":
/*!*********************************************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.html ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"config\">\r\n  <p class=\"message\">{{config.message}}</p>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.scss":
/*!*********************************************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.scss ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.message {\n  margin: 0 0 10px 0;\n  letter-spacing: 0;\n  color: #464646;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL2NvbmZpcm0tdXNhdmVkLWNoYW5nZXMtcG9wb3Zlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9hdXRvbWF0aWMtZGVwb3NpdC1wYWdlL2NvbXBvbmVudHMvY29uZmlybS11c2F2ZWQtY2hhbmdlcy1wb3BvdmVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcYWNjb3VudHNcXHBhZ2VzXFxhdXRvbWF0aWMtZGVwb3NpdC1wYWdlXFxjb21wb25lbnRzXFxjb25maXJtLXVzYXZlZC1jaGFuZ2VzLXBvcG92ZXJcXGNvbmZpcm0tdW5zYXZlZC1jaGFuZ2VzLXBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9jb25maXJtLXVzYXZlZC1jaGFuZ2VzLXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixjRDRHc0I7RUVoSHRCLGVETWlDO0VDRmpDLGdERjBFdUQsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9jb25maXJtLXVzYXZlZC1jaGFuZ2VzLXBvcG92ZXIvY29uZmlybS11bnNhdmVkLWNoYW5nZXMtcG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgXCJ0b29sc1wiO1xyXG5cclxuLm1lc3NhZ2Uge1xyXG4gIG1hcmdpbjogMCAwIDEwcHggMDtcclxuICBsZXR0ZXItc3BhY2luZzogMDtcclxuICBjb2xvcjogJGNvbG9yLWNoYXJjb2FsO1xyXG5cclxuICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.ts":
/*!*******************************************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.ts ***!
  \*******************************************************************************************************************************************************/
/*! exports provided: ConfirmUnsavedChangesPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmUnsavedChangesPopoverComponent", function() { return ConfirmUnsavedChangesPopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/rewards/rewards.config */ "./src/app/sections/rewards/rewards.config.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");




var ConfirmUnsavedChangesPopoverComponent = /** @class */ (function () {
    function ConfirmUnsavedChangesPopoverComponent() {
    }
    ConfirmUnsavedChangesPopoverComponent.prototype.ngOnInit = function () {
        this.config = {
            type: _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__["PopupTypes"].CANCEL,
            title: 'Unsaved changes',
            buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__["buttons"].CANCEL, { label: 'no' }), tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__["buttons"].OKAY, { label: 'yes' }),],
            message: 'Your changes wont be saved, would you like to leave without saving?',
            code: '',
        };
    };
    ConfirmUnsavedChangesPopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-confirm-unsaved-changes-popover',
            template: __webpack_require__(/*! ./confirm-unsaved-changes-popover.component.html */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.html"),
            styles: [__webpack_require__(/*! ./confirm-unsaved-changes-popover.component.scss */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConfirmUnsavedChangesPopoverComponent);
    return ConfirmUnsavedChangesPopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-list>\r\n    <ion-radio-group (ionChange)=\"onFrequencyChange($event)\">\r\n        <ion-label class=\"frequency__header-title\">Deposit Frequency</ion-label>\r\n\r\n        <ion-item lines=\"none\" class=\"frequency__radio\">\r\n            <ion-label>Once per week</ion-label>\r\n            <ion-radio mode=\"md\" slot=\"start\" [checked]=\"autoDepositSettings?.dayOfWeek !== 0\"\r\n                       [value]=\"frequency.week\"></ion-radio>\r\n        </ion-item>\r\n\r\n        <ion-item lines=\"none\" class=\"frequency__radio\">\r\n            <ion-label>Once per month</ion-label>\r\n            <ion-radio mode=\"md\" slot=\"start\" [checked]=\"autoDepositSettings?.dayOfMonth !== 0\"\r\n                       [value]=\"frequency.month\"></ion-radio>\r\n        </ion-item>\r\n    </ion-radio-group>\r\n</ion-list>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.scss":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.scss ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.frequency__header {\n  padding: 0; }\n.frequency__header-title {\n  color: #333;\n  line-height: 22px;\n  letter-spacing: 0;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.frequency__radio {\n  max-height: 40px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL2RlcG9zaXQtZnJlcXVlbmN5L0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9kZXBvc2l0LWZyZXF1ZW5jeS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGFjY291bnRzXFxwYWdlc1xcYXV0b21hdGljLWRlcG9zaXQtcGFnZVxcY29tcG9uZW50c1xcZGVwb3NpdC1mcmVxdWVuY3lcXGRlcG9zaXQtZnJlcXVlbmN5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9wYWdlcy9hdXRvbWF0aWMtZGVwb3NpdC1wYWdlL2NvbXBvbmVudHMvZGVwb3NpdC1mcmVxdWVuY3kvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNwRXZCO0VBQ0UsVUFBVSxFQUFBO0FBR1o7RUFDRSxXRG1Gb0I7RUNsRnBCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUNWbkIsZURZbUM7RUNSbkMsZ0RGMEV1RCxFQUFBO0FDL0R2RDtFQUNFLGdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL2RlcG9zaXQtZnJlcXVlbmN5L2RlcG9zaXQtZnJlcXVlbmN5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmZyZXF1ZW5jeSB7XHJcblxyXG4gICZfX2hlYWRlciB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuXHJcbiAgJl9faGVhZGVyLXRpdGxlIHtcclxuICAgIGNvbG9yOiAkY29sb3ItbmlnaHQtcmlkZXI7XHJcbiAgICBsaW5lLWhlaWdodDogMjJweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwO1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweClcclxuICB9XHJcblxyXG4gICZfX3JhZGlvIHtcclxuICAgIG1heC1oZWlnaHQ6IDQwcHg7XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: DepositFrequencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositFrequencyComponent", function() { return DepositFrequencyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auto_deposit_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auto-deposit.config */ "./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts");



var DepositFrequencyComponent = /** @class */ (function () {
    function DepositFrequencyComponent() {
        this.onFrequencyChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(DepositFrequencyComponent.prototype, "frequency", {
        get: function () {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_2__["DEPOSIT_FREQUENCY"];
        },
        enumerable: true,
        configurable: true
    });
    DepositFrequencyComponent.prototype.onFrequencyChange = function (_a) {
        var value = _a.detail.value;
        this.onFrequencyChanged.emit(value);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], DepositFrequencyComponent.prototype, "onFrequencyChanged", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DepositFrequencyComponent.prototype, "autoDepositSettings", void 0);
    DepositFrequencyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-deposit-frequency',
            template: __webpack_require__(/*! ./deposit-frequency.component.html */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./deposit-frequency.component.scss */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-frequency/deposit-frequency.component.scss")]
        })
    ], DepositFrequencyComponent);
    return DepositFrequencyComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-radio-group (ionChange)=\"onTypeChange($event)\">\r\n  <ion-item class=\"deposits__radio-item\" lines=\"none\">\r\n    <ion-label class=\"deposits__radio-label-wrapper\">\r\n      <div class=\"deposits__radio-label-title\">Automatic Deposit</div>\r\n      <div class=\"deposits__radio-label-sub-title\">Turn off automatic deposits</div>\r\n    </ion-label>\r\n    <ion-radio class=\"deposits__radio\"\r\n            slot=\"start\"\r\n               [value]=\"autoDepositTypes.automaticDepositOff\"\r\n               [checked]=\"activeType === autoDepositTypes.automaticDepositOff \"\r\n               mode=\"md\"></ion-radio>\r\n  </ion-item>\r\n\r\n  <ion-item class=\"deposits__radio-item\" lines=\"none\" *ngIf=\"isLowBalanceAvailable | async\">\r\n    <ion-label class=\"deposits__radio-label-wrapper\">\r\n      <div class=\"deposits__radio-label-title\">Low Balance</div>\r\n      <div class=\"deposits__radio-label-sub-title\">\r\n        Automatically refill your balance when it drops below a threshold value\r\n      </div>\r\n    </ion-label>\r\n    <ion-radio class=\"deposits__radio\"\r\n            slot=\"start\"\r\n               [value]=\"autoDepositTypes.lowBalance\"\r\n               [checked]=\"activeType === autoDepositTypes.lowBalance\"\r\n               mode=\"md\"></ion-radio>\r\n  </ion-item>\r\n\r\n  <ion-item class=\"deposits__radio-item\" lines=\"none\" *ngIf=\"isTimeBasedAvailable | async\">\r\n    <ion-label class=\"deposits__radio-label-wrapper\">\r\n      <div class=\"deposits__radio-label-title\">Time-based</div>\r\n      <div class=\"deposits__radio-label-sub-title\">Schedule a deposit on a weekly or monthly basis</div>\r\n    </ion-label>\r\n    <ion-radio class=\"deposits__radio\"\r\n            slot=\"start\"\r\n               [value]=\"autoDepositTypes.timeBased\"\r\n               [checked]=\"activeType === autoDepositTypes.timeBased\"\r\n               mode=\"md\"></ion-radio>\r\n  </ion-item>\r\n</ion-radio-group>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.scss":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.deposits__header {\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposits__radio-item {\n  border: 1px solid #c4c4c4;\n  border-radius: 8px;\n  margin-bottom: 8px; }\n.deposits__radio-item.item-radio-checked {\n    --background: #166dff0d;\n    border-color: #166dff; }\n.deposits__radio-item.item-radio-checked .deposits__radio-label-wrapper {\n      color: #000;\n      font-size: 16px;\n      font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposits__radio {\n  --color-checked: #166dff;\n  margin-right: 10px; }\n.deposits__radio-label-wrapper {\n  color: #515151;\n  white-space: pre-line; }\n.deposits__radio-label-title {\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposits__radio-label-sub-title {\n  font-size: 12px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL2RlcG9zaXQtdHlwZS1uYXYvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL2RlcG9zaXQtdHlwZS1uYXYvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xccGFnZXNcXGF1dG9tYXRpYy1kZXBvc2l0LXBhZ2VcXGNvbXBvbmVudHNcXGRlcG9zaXQtdHlwZS1uYXZcXGRlcG9zaXQtdHlwZS1uYXYuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9kZXBvc2l0LXR5cGUtbmF2L0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDckV2QjtFQ0ZBLGVER21DO0VDQ25DLGdERjBFdUQsRUFBQTtBQ3hFdkQ7RUFDRSx5QkRpR2tCO0VDaEdsQixrQkFBa0I7RUFDbEIsa0JBQWtCLEVBQUE7QUFIbkI7SUFNRyx1QkFBYTtJQUNiLHFCRGlGcUIsRUFBQTtBQ3hGeEI7TUFVSyxXRGlGVTtNRWpHaEIsZURrQnFDO01DZHJDLDZDRjRFa0QsRUFBQTtBQ3pEbEQ7RUFDRSx3QkFBZ0I7RUFDaEIsa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxjRDRFc0I7RUMzRXRCLHFCQUFxQixFQUFBO0FBR3ZCO0VDakNBLGVEa0NpQztFQzlCakMsNkNGNEVrRCxFQUFBO0FDM0NsRDtFQ3JDQSxlRHNDbUM7RUNsQ25DLGdERjBFdUQsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9kZXBvc2l0LXR5cGUtbmF2L2RlcG9zaXQtdHlwZS1uYXYuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uZGVwb3NpdHMge1xyXG4gICZfX2hlYWRlciB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fcmFkaW8taXRlbSB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3Itc2lsdmVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG5cclxuICAgICYuaXRlbS1yYWRpby1jaGVja2VkIHtcclxuICAgICAgLS1iYWNrZ3JvdW5kOiAjMTY2ZGZmMGQ7XHJcbiAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLWRvZGdlci1ibHVlO1xyXG5cclxuICAgICAgLmRlcG9zaXRzX19yYWRpby1sYWJlbC13cmFwcGVyIHtcclxuICAgICAgICBjb2xvcjogJGNvbG9yLWJsYWNrO1xyXG5cclxuICAgICAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNnB4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fcmFkaW8ge1xyXG4gICAgLS1jb2xvci1jaGVja2VkOiAjMTY2ZGZmO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fcmFkaW8tbGFiZWwtd3JhcHBlciB7XHJcbiAgICBjb2xvcjogJGNvbG9yLW1hdHRlcmhvcm47XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XHJcbiAgfVxyXG5cclxuICAmX19yYWRpby1sYWJlbC10aXRsZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX3JhZGlvLWxhYmVsLXN1Yi10aXRsZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDEycHgpO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.ts ***!
  \**************************************************************************************************************************/
/*! exports provided: DepositTypeNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositTypeNavComponent", function() { return DepositTypeNavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auto-deposit.config */ "./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../app.global */ "./src/app/app.global.ts");







var DepositTypeNavComponent = /** @class */ (function () {
    function DepositTypeNavComponent(settingsFacadeService) {
        this.settingsFacadeService = settingsFacadeService;
        this.onTypeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(DepositTypeNavComponent.prototype, "autoDepositTypes", {
        get: function () {
            return _auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositTypeNavComponent.prototype, "isLowBalanceAvailable", {
        get: function () {
            return this.availableTypes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (types) { return types[_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].lowBalance]; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositTypeNavComponent.prototype, "isTimeBasedAvailable", {
        get: function () {
            return this.availableTypes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (types) { return types[_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased]; }));
        },
        enumerable: true,
        configurable: true
    });
    DepositTypeNavComponent.prototype.ngOnInit = function () {
        this.setAvailableTypes();
    };
    DepositTypeNavComponent.prototype.onTypeChange = function (_a) {
        var value = _a.detail.value;
        this.activeType = value;
        this.onTypeChanged.emit(value);
    };
    DepositTypeNavComponent.prototype.setAvailableTypes = function () {
        this.availableTypes = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.AUTO_DEPOSIT_ENABLED), this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (settings) {
            var _a;
            var timeBased = settings[0];
            var low = settings[1];
            return _a = {},
                _a[_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].lowBalance] = low && Boolean(Number(low.value)),
                _a[_auto_deposit_config__WEBPACK_IMPORTED_MODULE_4__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased] = timeBased && Boolean(Number(timeBased.value)),
                _a;
        }));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], DepositTypeNavComponent.prototype, "onTypeChanged", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DepositTypeNavComponent.prototype, "activeType", void 0);
    DepositTypeNavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-deposit-type-nav',
            template: __webpack_require__(/*! ./deposit-type-nav.component.html */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./deposit-type-nav.component.scss */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/deposit-type-nav/deposit-type-nav.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_5__["SettingsFacadeService"]])
    ], DepositTypeNavComponent);
    return DepositTypeNavComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.html":
/*!**********************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"config\">\r\n  <img class=\"success-image\" src=\"/assets/images/auto deposit success.svg\" alt=\"success image\">\r\n  <h3 class=\"title\">{{data.title}}</h3>\r\n  <p class=\"message\">{{data.message}}</p>\r\n</st-popover-layout>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.scss":
/*!**********************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.success-image {\n  -o-object-fit: none;\n     object-fit: none; }\n.title {\n  line-height: 20px;\n  letter-spacing: 0;\n  color: #464646;\n  margin: 0 0 10px 0;\n  font-size: 20px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.message {\n  margin: 0 0 10px 0;\n  letter-spacing: 0;\n  color: #464646;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL3BvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL3BvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xccGFnZXNcXGF1dG9tYXRpYy1kZXBvc2l0LXBhZ2VcXGNvbXBvbmVudHNcXHBvcG92ZXJcXHBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2F1dG9tYXRpYy1kZXBvc2l0LXBhZ2UvY29tcG9uZW50cy9wb3BvdmVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLG1CQUFnQjtLQUFoQixnQkFBZ0IsRUFBQTtBQUdsQjtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsY0R3R3NCO0VDdkd0QixrQkFBa0I7RUNUbEIsZURXK0I7RUNQL0IsNkNGNEVrRCxFQUFBO0FDbEVwRDtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsY0QrRnNCO0VFaEh0QixlRG1CaUM7RUNmakMsZ0RGMEV1RCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvYXV0b21hdGljLWRlcG9zaXQtcGFnZS9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgXCJ0b29sc1wiO1xyXG5cclxuLnN1Y2Nlc3MtaW1hZ2Uge1xyXG4gIG9iamVjdC1maXQ6IG5vbmU7XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XHJcbiAgY29sb3I6ICRjb2xvci1jaGFyY29hbDtcclxuICBtYXJnaW46IDAgMCAxMHB4IDA7XHJcblxyXG4gIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDIwcHgpO1xyXG59XHJcblxyXG4ubWVzc2FnZSB7XHJcbiAgbWFyZ2luOiAwIDAgMTBweCAwO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwO1xyXG4gIGNvbG9yOiAkY29sb3ItY2hhcmNvYWw7XHJcblxyXG4gIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: PopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverComponent", function() { return PopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/rewards/rewards.config */ "./src/app/sections/rewards/rewards.config.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");




var PopoverComponent = /** @class */ (function () {
    function PopoverComponent() {
    }
    PopoverComponent.prototype.ngOnInit = function () {
        this.config = {
            type: _sections_rewards_rewards_config__WEBPACK_IMPORTED_MODULE_2__["PopupTypes"].CANCEL,
            title: null,
            buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_3__["buttons"].CLOSE, { label: 'done' })],
            message: '',
            code: '',
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PopoverComponent.prototype, "data", void 0);
    PopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-popover',
            template: __webpack_require__(/*! ./popover.component.html */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.html"),
            styles: [__webpack_require__(/*! ./popover.component.scss */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/popover/popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PopoverComponent);
    return PopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/deactivate-page/unsaved-changes.guard.ts ***!
  \*********************************************************************************************************/
/*! exports provided: UnsavedChangesGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsavedChangesGuard", function() { return UnsavedChangesGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/auto-deposit.config */ "./src/app/sections/accounts/pages/automatic-deposit-page/auto-deposit.config.ts");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_accounts_pages_automatic_deposit_page_components_confirm_usaved_changes_popover_confirm_unsaved_changes_popover_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component */ "./src/app/sections/accounts/pages/automatic-deposit-page/components/confirm-usaved-changes-popover/confirm-unsaved-changes-popover.component.ts");
/* harmony import */ var _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");









var UnsavedChangesGuard = /** @class */ (function () {
    function UnsavedChangesGuard(autoDepositService, popoverCtrl) {
        this.autoDepositService = autoDepositService;
        this.popoverCtrl = popoverCtrl;
    }
    UnsavedChangesGuard.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, _b, active, autoDepositType, activeAutoDepositType;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (nextState.root.queryParams.skip)
                            return [2 /*return*/, true];
                        this.component = component;
                        _a = this;
                        return [4 /*yield*/, this.autoDepositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).toPromise()];
                    case 1:
                        _a.autoDepositSettings = _c.sent();
                        _b = this.autoDepositSettings, active = _b.active, autoDepositType = _b.autoDepositType;
                        activeAutoDepositType = this.component.activeAutoDepositType;
                        if (!active && activeAutoDepositType === _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__["AUTO_DEPOSIT_PAYMENT_TYPES"].automaticDepositOff)
                            return [2 /*return*/, true];
                        if (!active && activeAutoDepositType !== _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__["AUTO_DEPOSIT_PAYMENT_TYPES"].automaticDepositOff)
                            return [2 /*return*/, this.showModal()];
                        if (autoDepositType !== activeAutoDepositType)
                            return [2 /*return*/, this.showModal()];
                        if (!this.isSameGeneralInfo())
                            return [2 /*return*/, this.showModal()];
                        if (autoDepositType === _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__["AUTO_DEPOSIT_PAYMENT_TYPES"].lowBalance)
                            return [2 /*return*/, this.isSameLowBalanceConditions() ? true : this.showModal()];
                        if (autoDepositType === _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__["AUTO_DEPOSIT_PAYMENT_TYPES"].timeBased)
                            return [2 /*return*/, this.isSameTimeBasedConditions() ? true : this.showModal()];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UnsavedChangesGuard.prototype.isSameGeneralInfo = function () {
        var _a = this.component, toId = _a.account.value.id, amountToDeposit = _a.amountToDeposit.value, fromId = _a.paymentMethod.value.id, activeBillMeAccount = _a.activeBillMeAccount, activePaymentType = _a.activePaymentType;
        var _b = this.autoDepositSettings, amount = _b.amount, fromAccountId = _b.fromAccountId, toAccountId = _b.toAccountId;
        return Number(amount) === Number(amountToDeposit)
            && fromAccountId === (activePaymentType === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["PAYMENT_TYPE"].BILLME ? activeBillMeAccount && activeBillMeAccount.id : fromId)
            && toId === toAccountId;
    };
    UnsavedChangesGuard.prototype.isSameLowBalanceConditions = function () {
        var clb = this.component.lowBalanceAmount.value;
        var slb = this.autoDepositSettings.lowBalanceAmount;
        return Number(clb) === Number(slb);
    };
    UnsavedChangesGuard.prototype.isSameTimeBasedConditions = function () {
        var _a = this.component, cdow = _a.dayOfWeek, cdom = _a.dayOfMonth, activeFrequency = _a.activeFrequency;
        var _b = this.autoDepositSettings, sdow = _b.dayOfWeek, sdom = _b.dayOfMonth;
        return activeFrequency === _sections_accounts_pages_automatic_deposit_page_auto_deposit_config__WEBPACK_IMPORTED_MODULE_3__["DEPOSIT_FREQUENCY"].week
            ? Number(cdow.value) === Number(sdow)
            : Number(cdom.value) === Number(sdom);
    };
    UnsavedChangesGuard.prototype.showModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _sections_accounts_pages_automatic_deposit_page_components_confirm_usaved_changes_popover_confirm_unsaved_changes_popover_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmUnsavedChangesPopoverComponent"],
                            animated: false,
                            backdropDismiss: false,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, modal.onDidDismiss().then(function (_a) {
                                var role = _a.role;
                                return role === _core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_7__["BUTTON_TYPE"].OKAY;
                            })];
                }
            });
        });
    };
    UnsavedChangesGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_pages_automatic_deposit_page_service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_4__["AutoDepositService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"]])
    ], UnsavedChangesGuard);
    return UnsavedChangesGuard;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/resolver/automatic-deposit.resolver.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/resolver/automatic-deposit.resolver.ts ***!
  \*******************************************************************************************************/
/*! exports provided: AutomaticDepositResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomaticDepositResolver", function() { return AutomaticDepositResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/auto-deposit.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts");
/* harmony import */ var _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/services/deposit.service */ "./src/app/sections/accounts/services/deposit.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");







var AutomaticDepositResolver = /** @class */ (function () {
    function AutomaticDepositResolver(autoDepositService, loadingService, depositService) {
        this.autoDepositService = autoDepositService;
        this.loadingService = loadingService;
        this.depositService = depositService;
    }
    AutomaticDepositResolver.prototype.resolve = function () {
        var accounts = this.depositService.getUserAccounts();
        var depositSettings = this.autoDepositService.getUserAutoDepositInfo();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(accounts, depositSettings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) { return ({ accounts: data[0], depositSettings: data[1] }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(this.loadingService.closeSpinner.bind(this.loadingService)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
    };
    AutomaticDepositResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_auto_deposit_service__WEBPACK_IMPORTED_MODULE_4__["AutoDepositService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"],
            _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_5__["DepositService"]])
    ], AutomaticDepositResolver);
    return AutomaticDepositResolver;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit-api-service.service.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit-api-service.service.ts ***!
  \************************************************************************************************************/
/*! exports provided: AutoDepositApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoDepositApiService", function() { return AutoDepositApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");






var AutoDepositApiService = /** @class */ (function () {
    function AutoDepositApiService(http, userFacadeService) {
        this.http = http;
        this.userFacadeService = userFacadeService;
    }
    AutoDepositApiService.prototype.getUserAutoDepositSettingInfo = function () {
        var _this = this;
        var url = '/json/user';
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var userId = _a.id;
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_4__["RPCQueryConfig"]('retrieveAutoDepositSettings', { userId: userId }, true);
            return _this.http.post(url, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    AutoDepositApiService.prototype.retrieveAutoDepositAccountList = function (paymentType) {
        var _this = this;
        var url = '/json/commerce';
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var userId = _a.id;
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_4__["RPCQueryConfig"]('retrieveAutoDepositAccountList', { userId: userId, paymentType: paymentType }, true);
            return _this.http.post(url, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    AutoDepositApiService.prototype.updateAutoDepositSettings = function (userAutoDepositSettingInfo) {
        var url = '/json/user';
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_4__["RPCQueryConfig"]('updateAutoDepositSettings', { userAutoDepositSettingInfo: userAutoDepositSettingInfo }, true);
        return this.http.post(url, queryConfig).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var response = _a.response;
            return response;
        }));
    };
    AutoDepositApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_5__["UserFacadeService"]])
    ], AutoDepositApiService);
    return AutoDepositApiService;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit.service.ts ***!
  \************************************************************************************************/
/*! exports provided: AutoDepositService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoDepositService", function() { return AutoDepositService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auto_deposit_api_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auto-deposit-api-service.service */ "./src/app/sections/accounts/pages/automatic-deposit-page/service/auto-deposit-api-service.service.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");









var AutoDepositService = /** @class */ (function () {
    function AutoDepositService(apiService, settingsFacadeService, userFacadeService) {
        this.apiService = apiService;
        this.settingsFacadeService = settingsFacadeService;
        this.userFacadeService = userFacadeService;
        this.settings = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
    }
    Object.defineProperty(AutoDepositService.prototype, "_settings", {
        set: function (val) {
            this.settings.next(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoDepositService.prototype, "settings$", {
        get: function () {
            return this.settings.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AutoDepositService.prototype.getUserAutoDepositInfo = function () {
        var _this = this;
        return this.apiService.getUserAutoDepositSettingInfo().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) { return (response ? Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(response) : _this.getInitialAutoDepositSetting()); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (settings) { return (_this._settings = settings); }));
    };
    AutoDepositService.prototype.getAutoDepositAccountList = function () {
        var _this = this;
        return this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_8__["Settings"].Setting.AUTO_DEPOSIT_PAYMENT_TYPES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var value = _a.value;
            return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_5__["parseArrayFromString"])(value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (array) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(array.map(function (type) { return _this.apiService.retrieveAutoDepositAccountList(type); })); }));
    };
    AutoDepositService.prototype.updateAutoDepositSettings = function (settings) {
        var _this = this;
        return this.apiService
            .updateAutoDepositSettings(settings)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return response && (_this._settings = settings); }));
    };
    AutoDepositService.prototype.getInitialAutoDepositSetting = function () {
        return this.userFacadeService.getUserData$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var userId = _a.id;
            return ({
                userId: userId,
                amount: 0,
                lowBalanceAmount: 0,
                active: false,
            });
        }));
    };
    AutoDepositService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auto_deposit_api_service_service__WEBPACK_IMPORTED_MODULE_4__["AutoDepositApiService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__["SettingsFacadeService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_6__["UserFacadeService"]])
    ], AutoDepositService);
    return AutoDepositService;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe.ts ***!
  \******************************************************************************************/
/*! exports provided: CreditCardTypePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditCardTypePipe", function() { return CreditCardTypePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _accounts_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../accounts.config */ "./src/app/sections/accounts/accounts.config.ts");



var CreditCardTypePipe = /** @class */ (function () {
    function CreditCardTypePipe() {
    }
    CreditCardTypePipe.prototype.transform = function (value) {
        return _accounts_config__WEBPACK_IMPORTED_MODULE_2__["CREDITCARD_TYPE"][parseInt(value) - 1];
    };
    CreditCardTypePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'creditCardType',
        })
    ], CreditCardTypePipe);
    return CreditCardTypePipe;
}());



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

/***/ "./src/app/sections/rewards/rewards.config.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/rewards/rewards.config.ts ***!
  \****************************************************/
/*! exports provided: LOCAL_ROUTING, CONTENT_STRINGS, ContentStringsParams, GenericContentStringsParams, OPT_IN_STATUS, PopupTypes, LEVEL_STATUS, CLAIM_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCAL_ROUTING", function() { return LOCAL_ROUTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_STRINGS", function() { return CONTENT_STRINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentStringsParams", function() { return ContentStringsParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericContentStringsParams", function() { return GenericContentStringsParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPT_IN_STATUS", function() { return OPT_IN_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupTypes", function() { return PopupTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_STATUS", function() { return LEVEL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLAIM_STATUS", function() { return CLAIM_STATUS; });
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app.global */ "./src/app/app.global.ts");

var LOCAL_ROUTING;
(function (LOCAL_ROUTING) {
    LOCAL_ROUTING["levels"] = "levels";
    LOCAL_ROUTING["store"] = "store";
    LOCAL_ROUTING["history"] = "history";
})(LOCAL_ROUTING || (LOCAL_ROUTING = {}));
var CONTENT_STRINGS;
(function (CONTENT_STRINGS) {
    CONTENT_STRINGS["activateBtn"] = "button_activate";
    CONTENT_STRINGS["optInToast"] = "toast_opt-in-success";
    CONTENT_STRINGS["cancelBtn"] = "button_cancel";
    CONTENT_STRINGS["closeBtn"] = "button_close";
    CONTENT_STRINGS["backBtn"] = "button_back";
    CONTENT_STRINGS["retryBtn"] = "button_retry";
    CONTENT_STRINGS["retryTitle"] = "dialog_header_retry";
    CONTENT_STRINGS["headerTitle"] = "header_title";
    CONTENT_STRINGS["optInBtn"] = "button_opt-in";
    CONTENT_STRINGS["optInFailLabel"] = "label_opt-in-failed";
    CONTENT_STRINGS["levelTabTitle"] = "tab_title_levels";
    CONTENT_STRINGS["storeTabTitle"] = "tab_title_store";
    CONTENT_STRINGS["historyTabTitle"] = "tab_title_history";
    CONTENT_STRINGS["xpAwayFromRewardLabel"] = "label_xp-to-unlock";
    CONTENT_STRINGS["activeRewardLabel"] = "label_active-reward";
    CONTENT_STRINGS["rewardClaimedLabel"] = "label_reward-claimed";
    CONTENT_STRINGS["claimRewardLabel"] = "dialog_header_claim-reward";
    CONTENT_STRINGS["noOffersLabel"] = "label_no-offers-available";
    CONTENT_STRINGS["balanceLabel"] = "label_balance";
    CONTENT_STRINGS["pointsLabel"] = "label_points";
    CONTENT_STRINGS["levelLabel"] = "label_level";
    CONTENT_STRINGS["pointsCostLabel"] = "label_point-cost";
    CONTENT_STRINGS["scanLabel"] = "label_scan";
    CONTENT_STRINGS["redeemLabel"] = "label_redeem";
    CONTENT_STRINGS["claimLabel"] = "label_claim";
    CONTENT_STRINGS["claimedLabel"] = "label_claimed";
    CONTENT_STRINGS["claimButton"] = "dialog_button_claim";
    CONTENT_STRINGS["redeemButton"] = "dialog_button_redeem";
    CONTENT_STRINGS["successTitle"] = "dialog_header_success";
    CONTENT_STRINGS["claimTitle"] = "dialog_header_claim-reward";
    CONTENT_STRINGS["redeemTitle"] = "dialog_header_redeem-reward";
    CONTENT_STRINGS["scanCodeTitle"] = "dialog_header_scan-code";
    CONTENT_STRINGS["scanCodeDescription"] = "dialog_description_scan-code";
    CONTENT_STRINGS["activeRewardsLabel"] = "label_active-reward-plural";
    CONTENT_STRINGS["claimInstructionsLabel"] = "label_claim-instructions";
    CONTENT_STRINGS["emptyHistoryListMessage"] = "label_empty-history";
})(CONTENT_STRINGS || (CONTENT_STRINGS = {}));
var ContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.rewards,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};
var GenericContentStringsParams = {
    category: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].CATEGORIES.core,
    domain: _app_global__WEBPACK_IMPORTED_MODULE_0__["ContentString"].DOMAINS.patron,
};
var OPT_IN_STATUS;
(function (OPT_IN_STATUS) {
    OPT_IN_STATUS[OPT_IN_STATUS["yes"] = 1] = "yes";
    OPT_IN_STATUS[OPT_IN_STATUS["no"] = 0] = "no";
})(OPT_IN_STATUS || (OPT_IN_STATUS = {}));
var PopupTypes;
(function (PopupTypes) {
    PopupTypes["REDEEM"] = "REDEEM";
    PopupTypes["SCAN"] = "SCAN";
    PopupTypes["SUCCESS"] = "SUCCESS";
    PopupTypes["CLAIM"] = "CLAIM";
    PopupTypes["RETRY"] = "RETRY";
    PopupTypes["OPT_IN"] = "OPT_IN";
    PopupTypes["CANCEL"] = "CANCEL";
})(PopupTypes || (PopupTypes = {}));
var LEVEL_STATUS;
(function (LEVEL_STATUS) {
    LEVEL_STATUS[LEVEL_STATUS["locked"] = 0] = "locked";
    LEVEL_STATUS[LEVEL_STATUS["unlocked"] = 1] = "unlocked";
    LEVEL_STATUS[LEVEL_STATUS["claimed"] = 2] = "claimed";
    LEVEL_STATUS[LEVEL_STATUS["received"] = 3] = "received";
})(LEVEL_STATUS || (LEVEL_STATUS = {}));
var CLAIM_STATUS;
(function (CLAIM_STATUS) {
    CLAIM_STATUS[CLAIM_STATUS["unearned"] = 0] = "unearned";
    CLAIM_STATUS[CLAIM_STATUS["earned"] = 1] = "earned";
    CLAIM_STATUS[CLAIM_STATUS["claimed"] = 2] = "claimed";
    CLAIM_STATUS[CLAIM_STATUS["received"] = 3] = "received";
})(CLAIM_STATUS || (CLAIM_STATUS = {}));


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



/***/ }),

/***/ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts ***!
  \************************************************************************************************/
/*! exports provided: StInputFloatingLabelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StInputFloatingLabelModule", function() { return StInputFloatingLabelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_input_floating_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-input-floating-label.component */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.component.ts");




var declarations = [_st_input_floating_label_component__WEBPACK_IMPORTED_MODULE_3__["StInputFloatingLabelComponent"]];
var StInputFloatingLabelModule = /** @class */ (function () {
    function StInputFloatingLabelModule() {
    }
    StInputFloatingLabelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: declarations
        })
    ], StInputFloatingLabelModule);
    return StInputFloatingLabelModule;
}());



/***/ }),

/***/ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.module.ts ***!
  \**************************************************************************************************/
/*! exports provided: StSelectFloatingLabelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StSelectFloatingLabelModule", function() { return StSelectFloatingLabelModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _st_select_floating_label_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./st-select-floating-label.component */ "./src/app/shared/ui-components/st-select-floating-label/st-select-floating-label.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var declarations = [_st_select_floating_label_component__WEBPACK_IMPORTED_MODULE_3__["StSelectFloatingLabelComponent"]];
var StSelectFloatingLabelModule = /** @class */ (function () {
    function StSelectFloatingLabelModule() {
    }
    StSelectFloatingLabelModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"]
            ],
            exports: declarations
        })
    ], StSelectFloatingLabelModule);
    return StSelectFloatingLabelModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-automatic-deposit-page-automatic-deposit-module.js.map