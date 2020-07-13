(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-deposit-page-deposit-module"],{

/***/ "./src/app/sections/accounts/pages/deposit-page/amount-range.validator.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/amount-range.validator.ts ***!
  \********************************************************************************/
/*! exports provided: amountRangeValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "amountRangeValidator", function() { return amountRangeValidator; });
/* harmony import */ var _core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/utils/regexp-patterns */ "./src/app/core/utils/regexp-patterns.ts");

function amountRangeValidator(min, max) {
    return function (control) {
        var value = control.value;
        if (value) {
            var amount = value.toString().replace(_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_0__["COMMA_REGEXP"], '');
            if (isNaN(amount) || amount < min) {
                return { minLength: { min: min, actual: value } };
            }
            if (isNaN(amount) || amount > max) {
                return { maxLength: { max: max, actual: value } };
            }
        }
        return null;
    };
}


/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/deposit-page.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-header title=\"Add Funds\"\r\n           [isTitleShow]=\"true\"\r\n           [backButtonIcon]=\"'ios-close'\"\r\n           [backButtonTitle]=\"''\"\r\n           [isToolbarShow]=\"true\"\r\n           class=\"deposit__header\"></st-header>\r\n<ion-content>\r\n  <form [formGroup]=\"depositForm\">\r\n    <section class=\"deposit__selection-block\">\r\n      <div class=\"deposit__select-wrapper\">\r\n        <ion-label class=\"deposit__label-select\">Payment Method</ion-label>\r\n        <ion-select\r\n          class=\"deposit__select\"\r\n          cancelText=\"Cancel\"\r\n          mode=\"md\"\r\n          placeholder=\"Please Choose\"\r\n          tabindex=\"0\"\r\n          interface=\"action-sheet\"\r\n          [interfaceOptions]=\"customActionSheetPaymentOptions\"\r\n          formControlName=\"sourceAccount\"\r\n          (ionChange)=\"onPaymentMethodChanged($event)\"\r\n        >\r\n          <ion-select-option *ngIf=\"isCreditCardPaymentTypesEnabled && applePayEnabled$ | async\" [value]=\"applePayAccountType\">\r\n            Apple Pay\r\n          </ion-select-option>\r\n          <ng-container *ngIf=\"isCreditCardPaymentTypesEnabled\">\r\n            <ion-select-option [value]=\"account\"\r\n                               *ngFor=\"let account of creditCardSourceAccounts; trackBy: trackByAccountId\"\r\n                               class=\"test-class\">{{ account.accountTender | creditCardType }} ending in\r\n              {{ account.lastFour }}\r\n            </ion-select-option>\r\n          </ng-container>\r\n          <ion-select-option [value]=\"paymentTypes.BILLME\"\r\n                             *ngIf=\"isBillMePaymentTypesEnabled\">Bill Me</ion-select-option>\r\n          <ion-select-option value=\"newCreditCard\"\r\n                             *ngIf=\"isCreditCardPaymentTypesEnabled\"> Add a Credit Card </ion-select-option>\r\n        </ion-select>\r\n      </div>\r\n\r\n      <div>\r\n        <div class=\"deposit__label-cvv\"\r\n             *ngIf=\"isCVVfieldShow\">\r\n          <ion-label class=\"deposit__label-select\">Card Security Code:</ion-label>\r\n          <ion-input class=\"deposit__input-cvv\"\r\n                     inputmode=\"tel\"\r\n                     type=\"tel\"\r\n                     maxlength=\"4\"\r\n                     placeholder=\"CVV\"\r\n                     formControlName=\"fromAccountCvv\"></ion-input>\r\n          <div class=\"deposit__input-cvv--error\"\r\n               *ngIf=\"\r\n            fromAccountCvv &&\r\n            fromAccountCvv.errors &&\r\n            (fromAccountCvv.errors['required'] ||\r\n              fromAccountCvv.errors['pattern'] ||\r\n              fromAccountCvv.errors['minlength']) &&\r\n            (fromAccountCvv.dirty || fromAccountCvv.touched)\r\n          \">\r\n            Please enter a valid card security code.\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"deposit__select-wrapper\">\r\n        <ion-label class=\"deposit__label-select\">To Account</ion-label>\r\n        <ion-select class=\"deposit__select deposit__select-account\"\r\n                    cancelText=\"Cancel\"\r\n                    mode=\"md\"\r\n                    tabindex=\"0\"\r\n                    placeholder=\"Please Choose\"\r\n                    interface=\"action-sheet\"\r\n                    [interfaceOptions]=\"customActionSheetOptions\"\r\n                    formControlName=\"selectedAccount\">\r\n          <ion-select-option [value]=\"account\"\r\n                             *ngFor=\"let account of destinationAccounts; trackBy: trackByAccountId\">\r\n            {{ account.accountDisplayName }} ({{ account.balance | transactionUnits: account.accountType }})\r\n          </ion-select-option>\r\n        </ion-select>\r\n      </div>\r\n      <div class=\"deposit__manual-amount\"\r\n           [ngClass]=\"{ 'deposit__manual-amount--preset-amouts': !(isFreeFormEnabled$ | async)}\">\r\n        <div class=\"deposit__main-select-container\"\r\n             *ngIf=\"!(isFreeFormEnabled$ | async); else mainInput\">\r\n          <div class=\"deposit__select-wrapper\">\r\n            <ion-label class=\"deposit__label-select\">Amount to Deposit</ion-label>\r\n            <ion-select class=\"deposit__select deposit__select-account\"\r\n                        cancelText=\"Cancel\"\r\n                        mode=\"md\"\r\n                        placeholder=\"Please Choose\"\r\n                        interface=\"action-sheet\"\r\n                        [interfaceOptions]=\"customActionSheetOptions\"\r\n                        formControlName=\"mainSelect\">\r\n              <ion-select-option [value]=\"amount\"\r\n                                 *ngFor=\"let amount of amountsForSelect$ | async\">\r\n                {{ amount | transactionUnits }}\r\n              </ion-select-option>\r\n            </ion-select>\r\n          </div>\r\n        </div>\r\n\r\n        <ng-template #mainInput>\r\n          <div class=\"deposit__main-input-container\">\r\n            <ion-input class=\"deposit__main-input\"\r\n                       type=\"tel\"\r\n                       inputmode=\"decimal\"\r\n                       maxlength=\"10\"\r\n                       #inputText\r\n                       placeholder=\"0\"\r\n                       [ngStyle]=\"{ width: inputText.value ? inputText.value.length + 1 + 'ch' : '2ch' }\"\r\n                       [ngClass]=\"{\r\n              'deposit__main-input--focus': focusLine,\r\n              shakeit: isMaxCharLength,\r\n              'deposit__main-input-container--decrease-font': inputText.value && inputText.value.length >= 7\r\n            }\"\r\n                       (ionFocus)=\"focusLine = true\"\r\n                       (ionBlur)=\"focusLine = false\"\r\n                       (keydown)=\"formatInput($event)\"\r\n                       formControlName=\"mainInput\"></ion-input>\r\n            <div *ngIf=\"mainFormInput.errors && mainFormInput.errors['maxLength']\"\r\n                 class=\"deposit__main-input--error\">\r\n              The maximum amount for a deposit is {{ mainFormInput.errors['maxLength'].max | transactionUnits }}\r\n            </div>\r\n            <div *ngIf=\"mainFormInput.errors && mainFormInput.errors['minLength']\"\r\n                 class=\"deposit__main-input--error\">\r\n              The minimum amount for a deposit is {{ mainFormInput.errors['minLength'].min | transactionUnits }}\r\n            </div>\r\n            <div *ngIf=\"\r\n              mainFormInput.errors && mainFormInput.errors['pattern'] && (mainFormInput.dirty || mainFormInput.touched)\r\n            \"\r\n                 class=\"deposit__main-input--error\">\r\n              Please enter a valid amount.\r\n            </div>\r\n          </div>\r\n        </ng-template>\r\n\r\n      </div>\r\n    </section>\r\n  </form>\r\n</ion-content>\r\n<ion-footer class=\"deposit__footer\"\r\n            mode=\"ios\">\r\n  <st-button (onClick)=\"onFormSubmit()\"\r\n             [isDisabled]=\"!depositForm.valid\">\r\n    Deposit\r\n  </st-button>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/deposit-page.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.deposit__header {\n  border-bottom: 1px solid #ebebeb; }\n.deposit__manual-amount {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 30px 0;\n  border-bottom: 1px solid #ebebeb; }\n.deposit__manual-amount--preset-amouts {\n    padding: 0; }\n.deposit__main-input-container {\n  color: #6e6e6e;\n  font-size: 80px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit__main-input-container--decrease-font {\n    font-size: 60px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit__main-input {\n  text-align: center;\n  width: 70%;\n  margin: 0 auto;\n  -webkit-transition: font-size 0.3s ease 0s;\n  transition: font-size 0.3s ease 0s;\n  --padding-bottom: 0;\n  --padding-top: 0;\n  --padding-start: 0; }\n.deposit__main-input--focus {\n    color: #000;\n    border-bottom: 2px solid #166dff !important; }\n.deposit__main-input--error {\n    color: #e22942;\n    text-align: center;\n    font-size: 14px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit__main-input.ng-invalid.ng-dirty {\n    border-bottom: 2px solid red !important; }\n.deposit__main-input::before {\n    content: '$';\n    font-size: 70%;\n    position: relative;\n    left: 5px;\n    bottom: 10px; }\n.deposit__main-select-container {\n  width: 100%; }\n.deposit__select-wrapper {\n  position: relative;\n  border-bottom: 1px solid #ebebeb; }\n.deposit__select {\n  padding: 30px 15px;\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit__label-select {\n  text-transform: uppercase;\n  color: #7e7e7e;\n  position: absolute;\n  left: 16px;\n  top: 10px;\n  font-size: 14px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.deposit__label-cvv {\n  position: relative;\n  height: 80px;\n  display: -webkit-box;\n  display: flex;\n  border-bottom: 1px solid #ebebeb; }\n.deposit__input-cvv {\n  --padding-start: 16px; }\n.deposit__input-cvv--error {\n    position: absolute;\n    left: 16px;\n    top: 55px;\n    color: #e22942;\n    font-size: 14px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit__footer {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding: 10px 10px 50px;\n  background-color: #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvcGFnZXMvZGVwb3NpdC1wYWdlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2RlcG9zaXQtcGFnZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGFjY291bnRzXFxwYWdlc1xcZGVwb3NpdC1wYWdlXFxkZXBvc2l0LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2RlcG9zaXQtcGFnZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3JFdkI7RUFDRSxnQ0QwR21CLEVBQUE7QUN2R3JCO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2IsNEJBQXNCO0VBQXRCLDZCQUFzQjtVQUF0QixzQkFBc0I7RUFDdEIsd0JBQXVCO1VBQXZCLHVCQUF1QjtFQUN2Qix5QkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixnQ0RpR21CLEVBQUE7QUMvRm5CO0lBQ0UsVUFBVSxFQUFBO0FBSWQ7RUFDRSxjRHFFb0I7RUV6RnRCLGVEc0JtQztFQ2xCbkMsZ0RGMEV1RCxFQUFBO0FDdERyRDtJQ3hCRixlRHlCcUM7SUNyQnJDLGdERjBFdUQsRUFBQTtBQ2pEdkQ7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGNBQWM7RUFDZCwwQ0FBa0M7RUFBbEMsa0NBQWtDO0VBa0JsQyxtQkFBaUI7RUFDakIsZ0JBQWM7RUFDZCxrQkFBZ0IsRUFBQTtBQWxCaEI7SUFDRSxXQUFXO0lBQ1gsMkNBQXNELEVBQUE7QUFHeEQ7SUFDRSxjRHFFa0I7SUNwRWxCLGtCQUFrQjtJQzFDdEIsZUQ0Q21DO0lDeENuQyw2Q0Y0RWtELEVBQUE7QUNuRGpEO0lBbUJHLHVDQUF1QyxFQUFBO0FBbkIxQztJQTJCRyxZQUFZO0lBQ1osY0FBYztJQUNkLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsWUFBWSxFQUFBO0FBSWhCO0VBQ0UsV0FBVyxFQUFBO0FBR2I7RUFDRSxrQkFBa0I7RUFDbEIsZ0NEdUNtQixFQUFBO0FDcENyQjtFQUVFLGtCQUFrQjtFQzNFcEIsZUQ2RWlDO0VDekVqQyw2Q0Y0RWtELEVBQUE7QUNBbEQ7RUFDRSx5QkFBeUI7RUFDekIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsU0FBUztFQ3JGWCxlRHVGb0M7RUNuRnBDLGlERjJFeUQsRUFBQTtBQ1d6RDtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQWE7RUFBYixhQUFhO0VBQ2IsZ0NEZW1CLEVBQUE7QUNackI7RUFDRSxxQkFBZ0IsRUFBQTtBQUVoQjtJQUNFLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsU0FBUztJQUNULGNETWtCO0lFOUd0QixlRDBHbUM7SUN0R25DLDZDRjRFa0QsRUFBQTtBQzhCbEQ7RUFDRSxvQkFBYTtFQUFiLGFBQWE7RUFDYix3QkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixzQkRsQmMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3BhZ2VzL2RlcG9zaXQtcGFnZS9kZXBvc2l0LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uZGVwb3NpdCB7XHJcbiAgJl9faGVhZGVyIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3Itd2hpc3BlcjtcclxuICB9XHJcblxyXG4gICZfX21hbnVhbC1hbW91bnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAzMHB4IDA7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXNwZXI7XHJcblxyXG4gICAgJi0tcHJlc2V0LWFtb3V0cyB7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19tYWluLWlucHV0LWNvbnRhaW5lciB7XHJcbiAgICBjb2xvcjogJGNvbG9yLWRpbS1ncmF5O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoODBweCk7XHJcblxyXG4gICAgJi0tZGVjcmVhc2UtZm9udCB7XHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoNjBweCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19tYWluLWlucHV0IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHdpZHRoOiA3MCU7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIHRyYW5zaXRpb246IGZvbnQtc2l6ZSAwLjNzIGVhc2UgMHM7XHJcblxyXG4gICAgJi0tZm9jdXMge1xyXG4gICAgICBjb2xvcjogIzAwMDtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICRjb2xvci1kb2RnZXItYmx1ZSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgICYtLWVycm9yIHtcclxuICAgICAgY29sb3I6ICRjb2xvci1hbGl6YXJpbjtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTRweCk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5uZy1pbnZhbGlkLm5nLWRpcnR5IHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJlZCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIC0tcGFkZGluZy1ib3R0b206IDA7XHJcbiAgICAtLXBhZGRpbmctdG9wOiAwO1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG5cclxuICAgICY6OmJlZm9yZSB7XHJcbiAgICAgIGNvbnRlbnQ6ICckJztcclxuICAgICAgZm9udC1zaXplOiA3MCU7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgbGVmdDogNXB4O1xyXG4gICAgICBib3R0b206IDEwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19tYWluLXNlbGVjdC1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5cclxuICAmX19zZWxlY3Qtd3JhcHBlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXNwZXI7XHJcbiAgfVxyXG5cclxuICAmX19zZWxlY3Qge1xyXG4gICAgLy8gYmFja2dyb3VuZDogdXJsKCcvYXNzZXRzL2ljb24vaW1nL2FuZ2xlLWRvd24uc3ZnJykgbm8tcmVwZWF0IDkyJSBjZW50ZXIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDMwcHggMTVweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNnB4KTtcclxuICB9XHJcblxyXG4gICZfX2xhYmVsLXNlbGVjdCB7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgY29sb3I6ICM3ZTdlN2U7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAxNnB4O1xyXG4gICAgdG9wOiAxMHB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE0cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fbGFiZWwtY3Z2IHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXNwZXI7XHJcbiAgfVxyXG5cclxuICAmX19pbnB1dC1jdnYge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xyXG5cclxuICAgICYtLWVycm9yIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBsZWZ0OiAxNnB4O1xyXG4gICAgICB0b3A6IDU1cHg7XHJcbiAgICAgIGNvbG9yOiAkY29sb3ItYWxpemFyaW47XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgxNHB4KTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgJl9fZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwcHggMTBweCA1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/deposit-page.component.ts ***!
  \********************************************************************************/
/*! exports provided: DepositPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositPageComponent", function() { return DepositPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _accounts_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_ui_components_confirm_deposit_popover_confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.ts");
/* harmony import */ var _shared_ui_components_deposit_modal_deposit_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/ui-components/deposit-modal/deposit-modal.component */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.ts");
/* harmony import */ var src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");
/* harmony import */ var _amount_range_validator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./amount-range.validator */ "./src/app/sections/accounts/pages/deposit-page/amount-range.validator.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/accounts/services/deposit.service */ "./src/app/sections/accounts/services/deposit.service.ts");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @core/utils/regexp-patterns */ "./src/app/core/utils/regexp-patterns.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @core/service/external-payment/external-payment.service */ "./src/app/core/service/external-payment/external-payment.service.ts");
/* harmony import */ var _core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @core/model/add-funds/applepay-response.model */ "./src/app/core/model/add-funds/applepay-response.model.ts");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");





















var DepositPageComponent = /** @class */ (function () {
    function DepositPageComponent(depositService, fb, popoverCtrl, modalController, toastController, router, loadingService, cdRef, userFacadeService, externalPaymentService, globalNav) {
        this.depositService = depositService;
        this.fb = fb;
        this.popoverCtrl = popoverCtrl;
        this.modalController = modalController;
        this.toastController = toastController;
        this.router = router;
        this.loadingService = loadingService;
        this.cdRef = cdRef;
        this.userFacadeService = userFacadeService;
        this.externalPaymentService = externalPaymentService;
        this.globalNav = globalNav;
        this.sourceSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
        this.focusLine = false;
        this.isMaxCharLength = false;
        this.applePayAccountType = {
            accountType: src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["AccountType"].APPLEPAY,
            accountDisplayName: 'Apple Pay',
            isActive: true,
        };
        this.customActionSheetOptions = {
            cssClass: 'custom-deposit-actionSheet',
        };
        this.customActionSheetPaymentOptions = {
            cssClass: 'custom-deposit-actionSheet custom-deposit-actionSheet-last-btn',
        };
    }
    DepositPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.depositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (depositSettings) { return (_this.depositSettings = depositSettings); });
        this.globalNav.hideNavBar();
        this.initForm();
        this.getAccounts();
        this.applePayEnabled$ = this.userFacadeService.isApplePayEnabled$();
    };
    DepositPageComponent.prototype.ngOnDestroy = function () {
        this.sourceSubscription.unsubscribe();
        this.globalNav.showNavBar();
    };
    Object.defineProperty(DepositPageComponent.prototype, "isFreeFromDepositEnabled$", {
        get: function () {
            var _this = this;
            return this.depositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
                var settingInfo = _this.depositService.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.FREEFORM_DEPOSIT_ENABLED.split('.')[2]);
                return settingInfo && Boolean(Number(settingInfo.value));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "isAllowFreeFormBillMe$", {
        get: function () {
            var _this = this;
            return this.depositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
                var settingInfo = _this.depositService.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.BILLME_FREEFORM_ENABLED.split('.')[2]);
                return settingInfo && Boolean(Number(settingInfo.value));
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "isFreeFormEnabled$", {
        get: function () {
            var _this = this;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["iif"])(function () { return _this.activePaymentType === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME; }, this.isAllowFreeFormBillMe$, this.isFreeFromDepositEnabled$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "billMeAmounts$", {
        get: function () {
            var _this = this;
            return this.depositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
                var settingInfo = _this.depositService.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.BILLME_AMOUNTS.split('.')[2]);
                return settingInfo ? Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__["parseArrayFromString"])(settingInfo.value) : [];
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "oneTimeAmounts$", {
        get: function () {
            var _this = this;
            return this.depositService.settings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
                var settingInfo = _this.depositService.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD.split('.')[2]);
                return settingInfo ? Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__["parseArrayFromString"])(settingInfo.value) : [];
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "amountsForSelect$", {
        get: function () {
            var _this = this;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["iif"])(function () { return _this.activePaymentType === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME; }, this.billMeAmounts$, this.oneTimeAmounts$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "isBillMePaymentTypesEnabled", {
        get: function () {
            var billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.PAYMENT_TYPES.split('.')[2]);
            return JSON.parse(billMePaymentTypesEnabled).indexOf(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME) !== -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "isCreditCardPaymentTypesEnabled", {
        get: function () {
            var billMePaymentTypesEnabled = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.PAYMENT_TYPES.split('.')[2]);
            return JSON.parse(billMePaymentTypesEnabled).indexOf(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].CREDIT) !== -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "minMaxOfAmmounts", {
        get: function () {
            var minAmountbillme = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.BILLME_AMOUNT_MIN.split('.')[2]);
            var maxAmountbillme = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.BILLME_AMOUNT_MAX.split('.')[2]);
            var minAmountOneTime = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.CREDITCARD_AMOUNT_MIN.split('.')[2]);
            var maxAmountOneTime = this.getSettingByName(this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.CREDITCARD_AMOUNT_MAX.split('.')[2]);
            return {
                minAmountbillme: minAmountbillme,
                maxAmountbillme: maxAmountbillme,
                minAmountOneTime: minAmountOneTime,
                maxAmountOneTime: maxAmountOneTime,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "mainFormInput", {
        get: function () {
            return this.depositForm.get('mainInput');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "fromAccountCvv", {
        get: function () {
            return this.depositForm.get('fromAccountCvv');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "isCVVfieldShow", {
        get: function () {
            var sourceAcc = this.depositForm.get('sourceAccount').value;
            return (sourceAcc &&
                (sourceAcc !== _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME || sourceAcc !== 'newCreditCard') &&
                sourceAcc.accountType === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["ACCOUNT_TYPES"].charge &&
                sourceAcc.paymentSystemType !== _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_SYSTEM_TYPE"].USAEPAY);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepositPageComponent.prototype, "paymentTypes", {
        get: function () {
            return _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"];
        },
        enumerable: true,
        configurable: true
    });
    DepositPageComponent.prototype.formatInput = function (event) {
        var value = event.target.value;
        var index = value.indexOf('.');
        if (!_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_16__["NUM_COMMA_DOT_REGEXP"].test(value)) {
            this.depositForm.get('mainInput').setValue(value.slice(0, value.length - 1));
        }
        if (index !== -1 && value.slice(index + 1).length > 1) {
            this.depositForm.get('mainInput').setValue(value.slice(0, index + 2));
        }
    };
    DepositPageComponent.prototype.onFormSubmit = function () {
        var _this = this;
        if (this.depositForm && this.depositForm.invalid)
            return;
        var _a = this.depositForm.value, sourceAccount = _a.sourceAccount, selectedAccount = _a.selectedAccount, mainInput = _a.mainInput, mainSelect = _a.mainSelect;
        var isBillme = sourceAccount === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME;
        var isApplePay = sourceAccount.accountType === src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["AccountType"].APPLEPAY;
        var depositReviewBillMe = this.depositService.getContentValueByName(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].billMeDepositReviewInstructions);
        var depositReviewCredit = this.depositService.getContentValueByName(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["CONTENT_STRINGS"].creditDepositReviewInstructions);
        var sourceAccForBillmeDeposit = this.sourceAccForBillmeDeposit(selectedAccount, this.billmeMappingArr);
        var amount = mainInput || mainSelect;
        amount = amount.toString().replace(_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_16__["COMMA_REGEXP"], '');
        if (isApplePay) {
            this.externalPaymentService
                .payWithApplePay(_core_model_add_funds_applepay_response_model__WEBPACK_IMPORTED_MODULE_19__["ApplePay"].DEPOSITS_WITH_APPLE_PAY, {
                accountId: selectedAccount.id,
                depositAmount: amount,
            })
                .then(function (result) {
                if (result.success) {
                    _this.finalizeDepositModal(result);
                }
                else {
                    _this.onErrorRetrieve(result.errorMessage);
                }
            })
                .catch(function (error) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    this.onErrorRetrieve('Something went wrong, please try again...');
                    return [2 /*return*/];
                });
            }); });
        }
        else {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["iif"])(function () { return isBillme; }, sourceAccForBillmeDeposit, Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(sourceAccount))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (sourceAcc) {
                var calculateDepositFee = _this.depositService.calculateDepositFee(sourceAcc.id, selectedAccount.id, amount);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["iif"])(function () { return isBillme; }, Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(0), calculateDepositFee).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (valueFee) { return ({ fee: valueFee, sourceAcc: sourceAcc, selectedAccount: selectedAccount, amount: amount, billme: isBillme }); }));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
                .subscribe(function (info) { return _this.confirmationDepositPopover(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, info, { depositReviewBillMe: depositReviewBillMe, depositReviewCredit: depositReviewCredit })); }, function () {
                _this.loadingService.closeSpinner();
                _this.onErrorRetrieve('Something went wrong, please try again...');
            });
        }
    };
    DepositPageComponent.prototype.setFormValidators = function () {
        var _this = this;
        var minMaxValidators = this.activePaymentType !== _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].CREDIT
            ? [Object(_amount_range_validator__WEBPACK_IMPORTED_MODULE_10__["amountRangeValidator"])(+this.minMaxOfAmmounts.minAmountbillme, +this.minMaxOfAmmounts.maxAmountbillme)]
            : [Object(_amount_range_validator__WEBPACK_IMPORTED_MODULE_10__["amountRangeValidator"])(+this.minMaxOfAmmounts.minAmountOneTime, +this.minMaxOfAmmounts.maxAmountOneTime)];
        this.isFreeFormEnabled$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (data) {
            var sourceAcc = _this.depositForm.get('sourceAccount').value;
            _this.depositForm.controls['mainSelect'].clearValidators();
            _this.depositForm.controls['mainSelect'].setErrors(null);
            _this.resolveCVVValidators(sourceAcc);
            if (sourceAcc === 'newCreditCard') {
                _this.depositForm.reset();
                var paymentSystem = _this.getSettingByName(_this.depositSettings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.CREDIT_PAYMENT_SYSTEM_TYPE.split('.')[2]);
                if (parseInt(paymentSystem) === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_SYSTEM_TYPE"].MONETRA) {
                    _this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].accounts, _accounts_config__WEBPACK_IMPORTED_MODULE_5__["LOCAL_ROUTING"].addCreditCard]);
                    return;
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.externalPaymentService.addUSAePayCreditCard())
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
                    var success = _a.success, errorMessage = _a.errorMessage;
                    if (!success) {
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["throwError"])(errorMessage);
                    }
                    _this.loadingService.showSpinner();
                    return _this.depositService.getUserAccounts();
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
                    .subscribe(function () { }, function (message) { return _this.onErrorRetrieve(message); }, function () { return _this.loadingService.closeSpinner(); });
            }
            if (data) {
                _this.depositForm.controls['mainInput'].setValidators([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
                ].concat(minMaxValidators, [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_16__["CURRENCY_REGEXP"]),
                ]));
            }
            else {
                _this.depositForm.controls['mainSelect'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
                _this.mainFormInput.clearValidators();
                _this.mainFormInput.setErrors(null);
                _this.resetControls(['mainSelect', 'mainInput']);
            }
            _this.depositForm.controls['mainSelect'].setValue(0);
        });
    };
    DepositPageComponent.prototype.initForm = function () {
        this.depositForm = this.fb.group({
            mainInput: [''],
            mainSelect: [''],
            selectedAccount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            sourceAccount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            fromAccountCvv: [''],
        });
        this.setFormValidators();
    };
    DepositPageComponent.prototype.resolveCVVValidators = function (sourceAcc) {
        if (sourceAcc !== _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME && this.isCVVfieldShow) {
            this.depositForm.controls['fromAccountCvv'].setValidators([
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('[0-9.-]*'),
            ]);
            this.depositForm.controls['fromAccountCvv'].reset();
            return;
        }
        this.depositForm.controls['fromAccountCvv'].setErrors(null);
        this.depositForm.controls['fromAccountCvv'].clearValidators();
    };
    DepositPageComponent.prototype.getAccounts = function () {
        var _this = this;
        var subscription = this.depositService.settings$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (settings) {
            var depositTenders = _this.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.DEPOSIT_TENDERS.split('.')[2]);
            var billmeMappingArr = _this.getSettingByName(settings, src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["Settings"].Setting.BILLME_MAPPING.split('.')[2]);
            return {
                depositTenders: Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__["parseArrayFromString"])(depositTenders),
                billmeMappingArr: Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__["parseArrayFromString"])(billmeMappingArr),
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_a) {
            var depositTenders = _a.depositTenders, billmeMappingArr = _a.billmeMappingArr;
            return _this.depositService.accounts$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (accounts) {
                _this.billmeMappingArr = billmeMappingArr;
                _this.creditCardSourceAccounts = _this.filterAccountsByPaymentSystem(accounts);
                _this.creditCardDestinationAccounts = _this.filterCreditCardDestAccounts(depositTenders, accounts);
                _this.billmeDestinationAccounts = _this.filterBillmeDestAccounts(_this.billmeMappingArr, accounts);
                _this.cdRef.markForCheck();
            }));
        }))
            .subscribe(function () {
            _this.defineDestAccounts(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].CREDIT);
        });
        this.sourceSubscription.add(subscription);
    };
    DepositPageComponent.prototype.onPaymentMethodChanged = function (_a) {
        var target = _a.target;
        this.defineDestAccounts(target.value);
        this.resetControls(['mainSelect', 'mainInput', 'selectedAccount']);
        this.setFormValidators();
    };
    DepositPageComponent.prototype.confirmationDepositPopover = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _shared_ui_components_confirm_deposit_popover_confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_7__["ConfirmDepositPopoverComponent"],
                            componentProps: {
                                data: data,
                            },
                            animated: false,
                            backdropDismiss: true,
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (_a) {
                            var role = _a.role;
                            if (role === src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_9__["BUTTON_TYPE"].OKAY) {
                                _this.loadingService.showSpinner();
                                _this.depositService
                                    .deposit(data.sourceAcc.id, data.selectedAccount.id, data.amount, _this.fromAccountCvv.value)
                                    .pipe(Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_15__["handleServerError"])(_accounts_config__WEBPACK_IMPORTED_MODULE_5__["ACCOUNTS_VALIDATION_ERRORS"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () { return _this.loadingService.closeSpinner(); }))
                                    .subscribe(function () { return _this.finalizeDepositModal(data); }, function (error) { return _this.onErrorRetrieve(error || 'Your information could not be verified.'); });
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DepositPageComponent.prototype.trackByAccountId = function (i) {
        return i + "-" + Math.random();
    };
    DepositPageComponent.prototype.resetControls = function (controlNames) {
        var _this = this;
        controlNames.forEach(function (controlName) { return _this.depositForm.contains(controlName) && _this.depositForm.get(controlName).reset(); });
    };
    DepositPageComponent.prototype.defineDestAccounts = function (target) {
        this.activePaymentType =
            target instanceof Object ? _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].CREDIT : typeof target === 'string' ? this.activePaymentType : target;
        this.destinationAccounts =
            target === _accounts_config__WEBPACK_IMPORTED_MODULE_5__["PAYMENT_TYPE"].BILLME ? this.billmeDestinationAccounts : this.creditCardDestinationAccounts;
    };
    DepositPageComponent.prototype.finalizeDepositModal = function (data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _shared_ui_components_deposit_modal_deposit_modal_component__WEBPACK_IMPORTED_MODULE_8__["DepositModalComponent"],
                            animated: true,
                            componentProps: {
                                data: data,
                            },
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function () {
                            _this.depositForm.reset();
                            _this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_12__["PATRON_NAVIGATION"].accounts]);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositPageComponent.prototype.onErrorRetrieve = function (message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 5000,
                            position: 'top',
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositPageComponent.prototype.filterAccountsByPaymentSystem = function (accounts) {
        return this.depositService.filterAccountsByPaymentSystem(accounts);
    };
    DepositPageComponent.prototype.filterCreditCardDestAccounts = function (tendersId, accounts) {
        return this.depositService.filterCreditCardDestAccounts(tendersId, accounts);
    };
    DepositPageComponent.prototype.filterBillmeDestAccounts = function (billmeMappingArr, accounts) {
        return this.depositService.filterBillmeDestAccounts(billmeMappingArr, accounts);
    };
    DepositPageComponent.prototype.sourceAccForBillmeDeposit = function (selectedAccount, billmeMappingArr) {
        return this.depositService.sourceAccForBillmeDeposit(selectedAccount, billmeMappingArr);
    };
    DepositPageComponent.prototype.getSettingByName = function (settings, property) {
        var depositSetting = this.depositService.getSettingByName(settings, property);
        return depositSetting.value;
    };
    DepositPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-deposit-page',
            template: __webpack_require__(/*! ./deposit-page.component.html */ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./deposit-page.component.scss */ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_14__["DepositService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"],
            src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_13__["LoadingService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_17__["UserFacadeService"],
            _core_service_external_payment_external_payment_service__WEBPACK_IMPORTED_MODULE_18__["ExternalPaymentService"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_20__["GlobalNavService"]])
    ], DepositPageComponent);
    return DepositPageComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/deposit.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/deposit.module.ts ***!
  \************************************************************************/
/*! exports provided: DepositModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositModule", function() { return DepositModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deposit_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deposit-page.component */ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.ts");
/* harmony import */ var _deposit_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./deposit.routing.module */ "./src/app/sections/accounts/pages/deposit-page/deposit.routing.module.ts");
/* harmony import */ var _resolvers_deposit_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolvers/deposit.resolver */ "./src/app/sections/accounts/pages/deposit-page/resolvers/deposit.resolver.ts");
/* harmony import */ var _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/accounts/services/deposit.service */ "./src/app/sections/accounts/services/deposit.service.ts");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/accounts/shared/pipes/credit-card-type/credit-card-type.module */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts");
/* harmony import */ var _sections_accounts_shared_ui_components_confirm_deposit_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sections/accounts/shared/ui-components/confirm-deposit-popover */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/index.ts");
/* harmony import */ var _sections_accounts_shared_ui_components_confirm_deposit_popover_confirm_deposit_popover_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module.ts");
/* harmony import */ var _sections_accounts_shared_ui_components_deposit_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sections/accounts/shared/ui-components/deposit-modal */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/index.ts");
/* harmony import */ var _sections_accounts_shared_ui_components_deposit_modal_deposit_modal_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");

















var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_9__["StHeaderModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
    _sections_accounts_shared_pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_10__["CreditCardTypeModule"],
    _shared_pipes__WEBPACK_IMPORTED_MODULE_15__["TransactionUnitsPipeModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"].forRoot({
        scrollPadding: false,
        scrollAssist: true,
    }),
    _deposit_routing_module__WEBPACK_IMPORTED_MODULE_6__["DepositRoutingModule"],
    _sections_accounts_shared_ui_components_confirm_deposit_popover_confirm_deposit_popover_module__WEBPACK_IMPORTED_MODULE_12__["ConfirmDepositPopoverModule"],
    _sections_accounts_shared_ui_components_deposit_modal_deposit_modal_module__WEBPACK_IMPORTED_MODULE_14__["DepositModalModule"],
    _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_16__["StButtonModule"]
];
var declarations = [_deposit_page_component__WEBPACK_IMPORTED_MODULE_5__["DepositPageComponent"]];
var providers = [_resolvers_deposit_resolver__WEBPACK_IMPORTED_MODULE_7__["DepositResolver"], _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_8__["DepositService"]];
var entryComponents = [_sections_accounts_shared_ui_components_confirm_deposit_popover__WEBPACK_IMPORTED_MODULE_11__["ConfirmDepositPopoverComponent"], _sections_accounts_shared_ui_components_deposit_modal__WEBPACK_IMPORTED_MODULE_13__["DepositModalComponent"]];
var DepositModule = /** @class */ (function () {
    function DepositModule() {
    }
    DepositModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                imports,
            ],
            providers: providers,
            entryComponents: entryComponents
        })
    ], DepositModule);
    return DepositModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/deposit.routing.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/deposit.routing.module.ts ***!
  \********************************************************************************/
/*! exports provided: DepositRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositRoutingModule", function() { return DepositRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _deposit_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deposit-page.component */ "./src/app/sections/accounts/pages/deposit-page/deposit-page.component.ts");
/* harmony import */ var _resolvers_deposit_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/deposit.resolver */ "./src/app/sections/accounts/pages/deposit-page/resolvers/deposit.resolver.ts");





var routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _deposit_page_component__WEBPACK_IMPORTED_MODULE_3__["DepositPageComponent"],
        resolve: {
            data: _resolvers_deposit_resolver__WEBPACK_IMPORTED_MODULE_4__["DepositResolver"],
        },
    },
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var DepositRoutingModule = /** @class */ (function () {
    function DepositRoutingModule() {
    }
    DepositRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], DepositRoutingModule);
    return DepositRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/pages/deposit-page/resolvers/deposit.resolver.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/accounts/pages/deposit-page/resolvers/deposit.resolver.ts ***!
  \************************************************************************************/
/*! exports provided: DepositResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositResolver", function() { return DepositResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/accounts/services/deposit.service */ "./src/app/sections/accounts/services/deposit.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");







var DepositResolver = /** @class */ (function () {
    function DepositResolver(depositService, loadingService) {
        this.depositService = depositService;
        this.loadingService = loadingService;
    }
    DepositResolver.prototype.resolve = function () {
        var _this = this;
        var requiredSettings = [
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.DEPOSIT_TENDERS,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.PAYMENT_TYPES,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.BILLME_MAPPING,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.FREEFORM_DEPOSIT_ENABLED,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.PRESET_DEPOSIT_AMOUNTS_CREDITCARD,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.BILLME_AMOUNTS,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.BILLME_AMOUNT_MIN,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.BILLME_AMOUNT_MAX,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.BILLME_FREEFORM_ENABLED,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.CREDIT_PAYMENT_SYSTEM_TYPE,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.CREDITCARD_AMOUNT_MIN,
            _app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.CREDITCARD_AMOUNT_MAX,
        ];
        var contentStringCall = this.depositService.initContentStringsList();
        var accountsCall = this.depositService.getUserAccounts();
        var settingsCall = this.depositService.getUserSettings(requiredSettings);
        this.loadingService.showSpinner();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(contentStringCall, settingsCall, accountsCall).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () { return _this.loadingService.closeSpinner(); }, function () { return _this.loadingService.closeSpinner(); }));
    };
    DepositResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_services_deposit_service__WEBPACK_IMPORTED_MODULE_5__["DepositService"],
            src_app_core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"]])
    ], DepositResolver);
    return DepositResolver;
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

/***/ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<st-popover-layout [popoverConfig]=\"popoverConfig\">\r\n  <section class=\"cdp__policy-container\" *ngIf=\"showDepositInstructions\">\r\n    <h5 class=\"cdp__policy-title\">Refund Policy</h5>\r\n    <div class=\"cdp__policy-body\">\r\n      {{ popoverConfig.message['billme'] ? data.depositReviewBillMe : data.depositReviewCredit }}\r\n    </div>\r\n  </section>\r\n\r\n  <section class=\"cdp__info-container\">\r\n    <div class=\"cdp__label\">\r\n      Deposit Amount:\r\n      <span class=\"cdp__value\">{{\r\n        popoverConfig.message['amount'] | transactionUnits: popoverConfig.message['selectedAccount'].accountType\r\n      }}</span>\r\n    </div>\r\n    <ng-container *ngIf=\"popoverConfig.message['fee']\">\r\n      <div class=\"cdp__label\">\r\n        Convenience Fee:\r\n        <span class=\"cdp__value\">{{\r\n          popoverConfig.message['fee'] | transactionUnits: popoverConfig.message['selectedAccount'].accountType\r\n        }}</span>\r\n      </div>\r\n      <div class=\"cdp__label\">\r\n        Total Payment:\r\n        <span class=\"cdp__value\">\r\n          {{\r\n            +popoverConfig.message['amount'] + +popoverConfig.message['fee']\r\n              | transactionUnits: popoverConfig.message['selectedAccount'].accountType\r\n          }}\r\n        </span>\r\n      </div>\r\n    </ng-container>\r\n    <div class=\"cdp__label\">\r\n      Account:\r\n      <span class=\"cdp__value\">{{ popoverConfig.message['selectedAccount'].accountDisplayName }}</span>\r\n    </div>\r\n    <div class=\"cdp__label\">\r\n      Payment Method:\r\n      <span class=\"cdp__value\" *ngIf=\"!popoverConfig.message['billme']; else billme\">\r\n        {{ popoverConfig.message['sourceAcc'].accountTender | creditCardType }} ending in\r\n        {{ popoverConfig.message['sourceAcc'].lastFour }}\r\n      </span>\r\n    </div>\r\n  </section>\r\n</st-popover-layout>\r\n\r\n<ng-template #billme>\r\n  <span class=\"cdp__value\">Bill me</span>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.scss":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.scss ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n:host .cdp__info-container {\n  margin-top: 10px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n:host .cdp__label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n:host .cdp__label {\n    margin-bottom: 10px; }\n:host .cdp__value {\n  text-align: right;\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n:host .cdp__policy-container {\n  background: #f7f7f7;\n  border-radius: 8px;\n  padding: 8px 12px; }\n:host .cdp__policy-title {\n  margin: 0;\n  font-size: 10px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n:host .cdp__policy-body {\n  font-size: 10px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvc2hhcmVkL3VpLWNvbXBvbmVudHMvY29uZmlybS1kZXBvc2l0LXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvc2hhcmVkL3VpLWNvbXBvbmVudHMvY29uZmlybS1kZXBvc2l0LXBvcG92ZXIvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxhY2NvdW50c1xcc2hhcmVkXFx1aS1jb21wb25lbnRzXFxjb25maXJtLWRlcG9zaXQtcG9wb3ZlclxcY29uZmlybS1kZXBvc2l0LXBvcG92ZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2FjY291bnRzL3NoYXJlZC91aS1jb21wb25lbnRzL2NvbmZpcm0tZGVwb3NpdC1wb3BvdmVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUdNLGdCQUFnQjtFQ0pwQixlRE1xQztFQ0ZyQyxnREYwRXVELEVBQUE7QUM3RXpEO0VBU00sb0JBQWE7RUFBYixhQUFhO0VBQ2IseUJBQThCO1VBQTlCLDhCQUE4QjtFQ1hsQyxlRGdCcUM7RUNackMsZ0RGMEV1RCxFQUFBO0FDN0V6RDtJQVlRLG1CQUFtQixFQUFBO0FBWjNCO0VBbUJNLGlCQUFpQjtFQ3BCckIsZURzQm1DO0VDbEJuQyw2Q0Y0RWtELEVBQUE7QUMvRXBEO0VBeUJNLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCLEVBQUE7QUEzQnZCO0VBK0JNLFNBQVM7RUNoQ2IsZURrQ21DO0VDOUJuQyw2Q0Y0RWtELEVBQUE7QUMvRXBEO0VDREUsZURzQ3NDO0VDbEN0QyxpREYyRXlELEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9zaGFyZWQvdWktY29tcG9uZW50cy9jb25maXJtLWRlcG9zaXQtcG9wb3Zlci9jb25maXJtLWRlcG9zaXQtcG9wb3Zlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbjpob3N0IHtcclxuICAuY2RwIHtcclxuICAgICZfX2luZm8tY29udGFpbmVyIHtcclxuICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fbGFiZWwge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICY6bm90KCY6bGFzdC1jaGlsZCkge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fdmFsdWUge1xyXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDE2cHgpO1xyXG4gICAgfVxyXG5cclxuICAgICZfX3BvbGljeS1jb250YWluZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZjdmN2Y3O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xyXG4gICAgfVxyXG5cclxuICAgICZfX3BvbGljeS10aXRsZSB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDEwcHgpO1xyXG4gICAgfVxyXG5cclxuICAgICZfX3BvbGljeS1ib2R5IHtcclxuICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTBweCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: ConfirmDepositPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDepositPopoverComponent", function() { return ConfirmDepositPopoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/utils/buttons.config */ "./src/app/core/utils/buttons.config.ts");



var ConfirmDepositPopoverComponent = /** @class */ (function () {
    function ConfirmDepositPopoverComponent() {
    }
    ConfirmDepositPopoverComponent.prototype.ngOnInit = function () {
        this.initPopover();
    };
    ConfirmDepositPopoverComponent.prototype.initPopover = function () {
        this.popoverConfig = {
            title: 'Confirm Deposit',
            type: 'SUCCESS',
            buttons: [tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].CANCEL, { label: 'CANCEL' }), tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, src_app_core_utils_buttons_config__WEBPACK_IMPORTED_MODULE_2__["buttons"].OKAY, { label: 'DEPOSIT' })],
            message: this.data,
        };
    };
    Object.defineProperty(ConfirmDepositPopoverComponent.prototype, "showDepositInstructions", {
        get: function () {
            return (this.popoverConfig.message['billme'] ? this.data.depositReviewBillMe : this.data.depositReviewCredit);
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ConfirmDepositPopoverComponent.prototype, "data", void 0);
    ConfirmDepositPopoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'confirm-deposit-popover',
            template: __webpack_require__(/*! ./confirm-deposit-popover.component.html */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.html"),
            styles: [__webpack_require__(/*! ./confirm-deposit-popover.component.scss */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConfirmDepositPopoverComponent);
    return ConfirmDepositPopoverComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module.ts ***!
  \******************************************************************************************************************/
/*! exports provided: ConfirmDepositPopoverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDepositPopoverModule", function() { return ConfirmDepositPopoverModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./confirm-deposit-popover.component */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.ts");
/* harmony import */ var _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-popover-layout/st-popover-layout.module */ "./src/app/shared/ui-components/st-popover-layout/st-popover-layout.module.ts");
/* harmony import */ var _pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pipes/credit-card-type/credit-card-type.module */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");








var ConfirmDepositPopoverModule = /** @class */ (function () {
    function ConfirmDepositPopoverModule() {
    }
    ConfirmDepositPopoverModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _shared_ui_components_st_popover_layout_st_popover_layout_module__WEBPACK_IMPORTED_MODULE_5__["StPopoverLayoutModule"],
                _shared_pipes__WEBPACK_IMPORTED_MODULE_7__["TransactionUnitsPipeModule"],
                _pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_6__["CreditCardTypeModule"]
            ],
            providers: [],
            declarations: [_confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmDepositPopoverComponent"]],
            exports: [_confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmDepositPopoverComponent"]]
        })
    ], ConfirmDepositPopoverModule);
    return ConfirmDepositPopoverModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/index.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: ConfirmDepositPopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm-deposit-popover.component */ "./src/app/sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmDepositPopoverComponent", function() { return _confirm_deposit_popover_component__WEBPACK_IMPORTED_MODULE_0__["ConfirmDepositPopoverComponent"]; });




/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"deposit-modal__header\">\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-title class=\"deposit-modal__title\">Deposit</ion-title>\r\n  </ion-toolbar>\r\n</header>\r\n\r\n<ion-content>\r\n  <div class=\"deposit-modal__img-wrapper\">\r\n    <img src=\"/assets/images/big_check_deposit.svg\" alt=\"big_check_deposit\" />\r\n  </div>\r\n  <h1 class=\"deposit-modal__title-label\">Success!</h1>\r\n  <section class=\"deposit-modal__sub-title\">\r\n    This transaction was successful. You can review it to make sure everything checks out.\r\n  </section>\r\n  <section class=\"deposit-modal__info-container\">\r\n    <div class=\"deposit-modal__label\">\r\n      Deposit Amount:\r\n      <span class=\"deposit-modal__value\">{{\r\n        data.amount | transactionUnits: data['selectedAccount'].accountType\r\n      }}</span>\r\n    </div>\r\n    <div class=\"deposit-modal__label\">\r\n      Account: <span class=\"deposit-modal__value\">{{ data['selectedAccount'].accountDisplayName }}</span>\r\n    </div>\r\n    <div class=\"deposit-modal__label\">\r\n      Payment Method:\r\n      <span class=\"deposit-modal__value\" *ngIf=\"!data['billme']; else billme\">\r\n        {{ data['sourceAcc'].accountTender | creditCardType }} ending in\r\n        {{ data['sourceAcc'].lastFour }}\r\n      </span>\r\n    </div>\r\n  </section>\r\n</ion-content>\r\n<ion-footer class=\"deposit-modal__footer\" mode=\"ios\">\r\n  <st-button (onClick)=\"onClickedDone()\">DONE</st-button>\r\n</ion-footer>\r\n\r\n<ng-template #billme>\r\n  <span class=\"cdp__value\">Bill me</span>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.scss":
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.scss ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.deposit-modal__header {\n  border-bottom: 1px solid #ebebeb; }\n.deposit-modal__title {\n  font-size: 20px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__title-label {\n  color: #464646;\n  text-align: center;\n  font-size: 32px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__sub-title {\n  color: #464646;\n  text-align: center;\n  padding: 0 40px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__img-wrapper {\n  text-align: center; }\n.deposit-modal__info-container {\n  margin: 10px 0 0;\n  background: #f7f7f7;\n  padding: 16px 20px;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  font-size: 16px;\n  font-family: \"Nunito Regular\", arial, sans-serif; }\n.deposit-modal__label:nth-child(1), .deposit-modal__label:nth-child(2) {\n    margin-bottom: 15px; }\n.deposit-modal__value {\n  text-align: right;\n  font-size: 16px;\n  font-family: \"Nunito Bold\", arial, sans-serif; }\n.deposit-modal__footer {\n  padding: 10px 10px 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvc2hhcmVkL3VpLWNvbXBvbmVudHMvZGVwb3NpdC1tb2RhbC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9hY2NvdW50cy9zaGFyZWQvdWktY29tcG9uZW50cy9kZXBvc2l0LW1vZGFsL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcYWNjb3VudHNcXHNoYXJlZFxcdWktY29tcG9uZW50c1xcZGVwb3NpdC1tb2RhbFxcZGVwb3NpdC1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvc2hhcmVkL3VpLWNvbXBvbmVudHMvZGVwb3NpdC1tb2RhbC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3JFdkI7RUFDRSxnQ0QwR21CLEVBQUE7QUN2R3JCO0VDTkEsZURPaUM7RUNIakMsNkNGNEVrRCxFQUFBO0FDdEVsRDtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUNacEIsZURjaUM7RUNWakMsNkNGNEVrRCxFQUFBO0FDL0RsRDtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsZUFBZTtFQ3BCakIsZURzQm1DO0VDbEJuQyxnREYwRXVELEVBQUE7QUNyRHZEO0VBQ0Usa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQ2hDcEIsZURrQ21DO0VDOUJuQyxnREYwRXVELEVBQUE7QUN6Q3ZEO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2IseUJBQThCO1VBQTlCLDhCQUE4QjtFQ3ZDaEMsZUQ4Q21DO0VDMUNuQyxnREYwRXVELEVBQUE7QUN6Q3REO0lBTUcsbUJBQW1CLEVBQUE7QUFNdkI7RUFDRSxpQkFBaUI7RUNsRG5CLGVEb0RpQztFQ2hEakMsNkNGNEVrRCxFQUFBO0FDekJsRDtFQUNFLHVCQUF1QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvYWNjb3VudHMvc2hhcmVkL3VpLWNvbXBvbmVudHMvZGVwb3NpdC1tb2RhbC9kZXBvc2l0LW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmRlcG9zaXQtbW9kYWwge1xyXG4gICZfX2hlYWRlciB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXNwZXI7XHJcbiAgfVxyXG5cclxuICAmX190aXRsZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgyMHB4KTtcclxuICB9XHJcblxyXG4gICZfX3RpdGxlLWxhYmVsIHtcclxuICAgIGNvbG9yOiAjNDY0NjQ2O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDMycHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fc3ViLXRpdGxlIHtcclxuICAgIGNvbG9yOiAjNDY0NjQ2O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMCA0MHB4O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19pbWctd3JhcHBlciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAmX19pbmZvLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW46IDEwcHggMCAwO1xyXG4gICAgYmFja2dyb3VuZDogI2Y3ZjdmNztcclxuICAgIHBhZGRpbmc6IDE2cHggMjBweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fbGFiZWwge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcbiAgICAmOm50aC1jaGlsZCgxKSxcclxuICAgICY6bnRoLWNoaWxkKDIpIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgIH1cclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDE2cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fdmFsdWUge1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19mb290ZXJ7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggNTBweDtcclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: DepositModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositModalComponent", function() { return DepositModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");



var DepositModalComponent = /** @class */ (function () {
    function DepositModalComponent(modalController) {
        this.modalController = modalController;
    }
    DepositModalComponent.prototype.onClickedDone = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DepositModalComponent.prototype, "data", void 0);
    DepositModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-deposit-modal',
            template: __webpack_require__(/*! ./deposit-modal.component.html */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./deposit-modal.component.scss */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], DepositModalComponent);
    return DepositModalComponent;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module.ts ***!
  \**********************************************************************************************/
/*! exports provided: DepositModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepositModalModule", function() { return DepositModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _deposit_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deposit-modal.component */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.ts");
/* harmony import */ var _pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pipes/credit-card-type/credit-card-type.module */ "./src/app/sections/accounts/shared/pipes/credit-card-type/credit-card-type.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");
/* harmony import */ var _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-button/st-button.module */ "./src/app/shared/ui-components/st-button/st-button.module.ts");








var DepositModalModule = /** @class */ (function () {
    function DepositModalModule() {
    }
    DepositModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _pipes_credit_card_type_credit_card_type_module__WEBPACK_IMPORTED_MODULE_5__["CreditCardTypeModule"],
                _shared_pipes__WEBPACK_IMPORTED_MODULE_6__["TransactionUnitsPipeModule"],
                _shared_ui_components_st_button_st_button_module__WEBPACK_IMPORTED_MODULE_7__["StButtonModule"]
            ],
            providers: [],
            declarations: [_deposit_modal_component__WEBPACK_IMPORTED_MODULE_4__["DepositModalComponent"]],
            exports: [_deposit_modal_component__WEBPACK_IMPORTED_MODULE_4__["DepositModalComponent"]]
        })
    ], DepositModalModule);
    return DepositModalModule;
}());



/***/ }),

/***/ "./src/app/sections/accounts/shared/ui-components/deposit-modal/index.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/accounts/shared/ui-components/deposit-modal/index.ts ***!
  \*******************************************************************************/
/*! exports provided: DepositModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deposit_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deposit-modal.component */ "./src/app/sections/accounts/shared/ui-components/deposit-modal/deposit-modal.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DepositModalComponent", function() { return _deposit_modal_component__WEBPACK_IMPORTED_MODULE_0__["DepositModalComponent"]; });




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
//# sourceMappingURL=pages-deposit-page-deposit-module.js.map