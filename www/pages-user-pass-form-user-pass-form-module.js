(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-user-pass-form-user-pass-form-module"],{

/***/ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/non-authorized/pages/user-pass-form/user-pass-form.module.ts ***!
  \******************************************************************************/
/*! exports provided: UserPassFormPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPassFormPageModule", function() { return UserPassFormPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-button */ "./src/app/shared/ui-components/st-button/index.ts");
/* harmony import */ var _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/ui-components/st-input-floating-label/st-input-floating-label.module */ "./src/app/shared/ui-components/st-input-floating-label/st-input-floating-label.module.ts");
/* harmony import */ var _user_pass_form_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user-pass-form.page */ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.ts");










var routes = [
    {
        path: '',
        component: _user_pass_form_page__WEBPACK_IMPORTED_MODULE_9__["UserPassForm"],
    },
];
var UserPassFormPageModule = /** @class */ (function () {
    function UserPassFormPageModule() {
    }
    UserPassFormPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _shared_ui_components_st_input_floating_label_st_input_floating_label_module__WEBPACK_IMPORTED_MODULE_8__["StInputFloatingLabelModule"],
                _shared_ui_components_st_button__WEBPACK_IMPORTED_MODULE_7__["StButtonModule"],
                _shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_6__["StHeaderModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ],
            declarations: [_user_pass_form_page__WEBPACK_IMPORTED_MODULE_9__["UserPassForm"]],
        })
    ], UserPassFormPageModule);
    return UserPassFormPageModule;
}());



/***/ }),

/***/ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.html":
/*!******************************************************************************!*\
  !*** ./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"login-header\" no-border>\r\n  <ion-toolbar mode=\"ios\" class=\"ion-color\" [style.background-color]=\"nativeHeaderBg$ | async\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button\r\n        class=\"login-header__back-btn\"\r\n        color=\"light\"\r\n        text=\"Back\"\r\n        icon=\"ios-arrow-back\"\r\n        mode=\"ios\"\r\n      ></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content class=\"login\" scrollY=\"false\">\r\n  <div class=\"login__institution\" [ngStyle]=\"{ backgroundColor: nativeHeaderBg$ | async}\">\r\n    <div class=\"login__institution-logo-wrapper\">\r\n      <img\r\n        *ngIf=\"institutionPhoto$ | async\"\r\n        class=\"login__institution-logo\"\r\n        [src]=\"institutionPhoto$ | async\"\r\n        alt=\"institution logo\"\r\n      />\r\n    </div>\r\n    <div class=\"login__institution-name-wrapper\">\r\n      <div *ngIf=\"institutionName$ | async\" class=\"login__institution-name\">\r\n        {{ institutionName$ | async}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"login__form-wrapper\">\r\n    <form class=\"login__form\" [formGroup]=\"loginForm\">\r\n      <st-input-floating-label\r\n        [label]=\"placeholderOfUsername$ | async\"\r\n        [formControlName]=\"controlsNames.username\"\r\n        [control]=\"username\"\r\n        [isError]=\"username.invalid && username.touched\"\r\n        type=\"email\"\r\n        idd=\"username\"\r\n      >\r\n      </st-input-floating-label>\r\n      <br />\r\n      <st-input-floating-label\r\n        [label]=\"'Password'\"\r\n        [formControlName]=\"controlsNames.password\"\r\n        [control]=\"password\"\r\n        [isError]=\"password.invalid && password.touched\"\r\n        type=\"password\"\r\n        idd=\"password\"\r\n      >\r\n      </st-input-floating-label>\r\n      <div class=\"login__form-password\">\r\n        <a class=\"login__form-password-forgot\" (click)=\"redirectToForgotPassword()\">Forgot password?</a>\r\n      </div>\r\n      <div class=\"login__form-btns\">\r\n        <st-button\r\n          buttonModifier=\"border-only-rectangle\"\r\n          class=\"login__form-btns--odd\"\r\n          (click)=\"redirectToWebPage('register.php')\"\r\n        >\r\n          Sign up\r\n        </st-button>\r\n        <st-button buttonModifier=\"rectangle\" (click)=\"authenticateUser(loginForm)\">\r\n          Log in\r\n        </st-button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</ion-content>\r\n<ion-footer mode=\"ios\" class=\"login__footer\">\r\n  <div class=\"login__footer-version\" *ngIf=\"(deviceInfo$ | async)?.platform !== 'web'\">\r\n    Version {{ (deviceInfo$ | async)?.appVersion }}\r\n  </div>\r\n</ion-footer>\r\n"

/***/ }),

/***/ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.scss":
/*!******************************************************************************!*\
  !*** ./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.login-header.header-md:after {\n  background-image: none; }\n.login-header ion-back-button {\n  display: block;\n  --icon-font-size: 25px;\n  margin-left: 10px;\n  margin-top: 24px; }\n.login {\n  position: relative; }\n.login__institution {\n    display: -webkit-box;\n    display: flex;\n    height: 380px;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 55px 20px;\n    border-bottom-right-radius: 171px; }\n.login__institution-logo-wrapper {\n      height: 100px;\n      width: 100px;\n      margin-right: 12px; }\n.login__institution-logo {\n      width: 100%;\n      height: 100%; }\n.login__institution-name-wrapper {\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-align: center;\n              align-items: center;\n      width: 200px;\n      height: 100px; }\n.login__institution-name {\n      color: #fff;\n      line-height: 43px;\n      text-transform: capitalize;\n      font-size: 42px;\n      font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.login__form {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    height: 270px;\n    padding: 15px;\n    border-radius: 16px;\n    background: white;\n    box-shadow: 0px 0px 4px 0px #0000001f, 0px 2px 14px 0px #0000001f; }\n.login__form-wrapper {\n      position: absolute;\n      top: 200px;\n      width: 100%;\n      padding: 20px;\n      border-radius: 16px; }\n.login__form-password {\n      text-align: right; }\n.login__form-password-forgot {\n        text-decoration: none;\n        color: #166dff;\n        font-size: 12px;\n        font-family: \"Nunito Bold\", arial, sans-serif; }\n.login__form-btns {\n      display: -webkit-box;\n      display: flex; }\n.login__form-btns--odd {\n        margin-right: 10px; }\n.login__footer {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 15px; }\n.login__footer-version {\n      font-size: 12px;\n      font-family: \"Nunito SemiBold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm9uLWF1dGhvcml6ZWQvcGFnZXMvdXNlci1wYXNzLWZvcm0vQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvbm9uLWF1dGhvcml6ZWQvcGFnZXMvdXNlci1wYXNzLWZvcm0vQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXG5vbi1hdXRob3JpemVkXFxwYWdlc1xcdXNlci1wYXNzLWZvcm1cXHVzZXItcGFzcy1mb3JtLnBhZ2Uuc2NzcyIsInNyYy9hcHAvbm9uLWF1dGhvcml6ZWQvcGFnZXMvdXNlci1wYXNzLWZvcm0vQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBRUksc0JBQXNCLEVBQUE7QUFGMUI7RUFNSSxjQUFjO0VBQ2Qsc0JBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixnQkFBZ0IsRUFBQTtBQUlwQjtFQUNFLGtCQUFrQixFQUFBO0FBRWxCO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLGlDQUFpQyxFQUFBO0FBRWpDO01BQ0UsYUFBYTtNQUNiLFlBQVk7TUFDWixrQkFBa0IsRUFBQTtBQUdwQjtNQUNFLFdBQVc7TUFDWCxZQUFZLEVBQUE7QUFHZDtNQUNFLG9CQUFhO01BQWIsYUFBYTtNQUNiLHlCQUFtQjtjQUFuQixtQkFBbUI7TUFDbkIsWUFBWTtNQUNaLGFBQWEsRUFBQTtBQUdmO01BQ0UsV0RxRFk7TUNwRFosaUJBQWlCO01BQ2pCLDBCQUEwQjtNQzdDOUIsZURpRHNDO01DN0N0QyxpREYyRXlELEVBQUE7QUMxQnpEO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IsNEJBQXNCO0lBQXRCLDZCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIseUJBQThCO1lBQTlCLDhCQUE4QjtJQUM5QixhQUFhO0lBQ2IsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsaUVBQWlFLEVBQUE7QUFFakU7TUFDRSxrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLFdBQVc7TUFDWCxhQUFhO01BQ2IsbUJBQW1CLEVBQUE7QUFHckI7TUFDRSxpQkFBaUIsRUFBQTtBQUVqQjtRQUNFLHFCQUFxQjtRQUNyQixjRGtCbUI7UUU5RnpCLGVEOEVxQztRQzFFckMsNkNGNEVrRCxFQUFBO0FDRWhEO01BQ0Usb0JBQWE7TUFBYixhQUFhLEVBQUE7QUFFYjtRQUNFLGtCQUFrQixFQUFBO0FBS3hCO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2Isd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2QixhQUFhLEVBQUE7QUFFYjtNQ2hHRixlRGlHc0M7TUM3RnRDLGlERjJFeUQsRUFBQSIsImZpbGUiOiJzcmMvYXBwL25vbi1hdXRob3JpemVkL3BhZ2VzL3VzZXItcGFzcy1mb3JtL3VzZXItcGFzcy1mb3JtLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xyXG46cm9vdCB7XHJcbiAgLyoqIHByaW1hcnkgKiovXHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzAwNWNiOTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXJnYjogMCwgOTIsIDE4NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMDUxYTM7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjMWE2Y2MwO1xyXG5cclxuICAvKiogc2Vjb25kYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzBjZDFlODtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktcmdiOiAxMiwgMjA5LCAyMzI7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXNoYWRlOiAjMGJiOGNjO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjMjRkNmVhO1xyXG5cclxuICAvKiogdGVydGlhcnkgKiovXHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICM3MDQ0ZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiAxMTIsIDY4LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNjMzY2UwO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM3ZTU3ZmY7XHJcblxyXG4gIC8qKiBzdWNjZXNzICoqL1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMxMGRjNjA7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2I6IDE2LCAyMjAsIDk2O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzBlYzI1NDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICMyOGUwNzA7XHJcblxyXG4gIC8qKiB3YXJuaW5nICoqL1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmNlMDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1yZ2I6IDI1NSwgMjA2LCAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1zaGFkZTogI2UwYjUwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmQzMWE7XHJcblxyXG4gIC8qKiBkYW5nZXIgKiovXHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZjA0MTQxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDI0NSwgNjEsIDYxO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2QzMzkzOTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItdGludDogI2YyNTQ1NDtcclxuXHJcbiAgLyoqIGRhcmsgKiovXHJcbiAgLS1pb24tY29sb3ItZGFyazogIzIyMjQyODtcclxuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM0LCAzNDtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XHJcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xyXG5cclxuICAvKiogbWVkaXVtICoqL1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzk4OWFhMjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tcmdiOiAxNTIsIDE1NCwgMTYyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZTogIzg2ODg4ZjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogI2EyYTRhYjtcclxuXHJcbiAgLyoqIGxpZ2h0ICoqL1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDQsIDI0NDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdDogIzAwMDAwMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtdGludDogI2Y1ZjZmOTtcclxuXHJcbiAgLy8gLS1pb24tZ3JpZC13aWR0aC1zbTogMHB4O1xyXG59XHJcblxyXG4vLyBGT05UU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiRmb250LW51bml0by1yZWd1bGFyOiAnTnVuaXRvIFJlZ3VsYXInLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLXNlbWlib2xkOiAnTnVuaXRvIFNlbWlCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1oZWF2eTogJ051bml0byBCb2xkJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcblxyXG4vLyBDT0xPUlNcclxuXHJcbiRjb2xvci12ZXJ5LWxpZ2h0LWdyYXk6ICNjY2M7XHJcbiRjb2xvci1saW5rLXdhdGVyOiAjZDRkNmQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2U5ZTllOTtcclxuJGNvbG9yLWRhcmstZ3JheTogI2FhYTtcclxuJGNvbG9yLWR1c3R5LWdyYXk6ICM5Nzk3OTc7XHJcbiRjb2xvci1kaW0tZ3JheTogIzZlNmU2ZTtcclxuJGNvbG9yLXNvbGl0dWRlOiAjRUNGMUY4O1xyXG4kY29sb3ItbmlnaHQtcmlkZXI6ICMzMzM7XHJcbiRjb2xvci1uYXZ5LWJsdWU6ICMwMDU2ZTY7XHJcbiRjb2xvci1kZW5pbTogIzEzNjBlMDtcclxuJGNvbG9yLWRvZGdlci1ibHVlOiAjMTY2ZGZmO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWUtbGlnaHRlcjogIzJkN2NmZjtcclxuJGNvbG9yLXdoaXRlOiAjZmZmO1xyXG4kY29sb3ItYmxhY2s6ICMwMDA7XHJcbiRjb2xvci13aGl0ZS1zbW9rZTogI2YzZjNmMztcclxuJGNvbG9yLWRlZXAtc2t5LWJsdWU6ICMwMGEwZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzhiYjdmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjODhjOGZmO1xyXG4kY29sb3Itc3Ryb25nLWJsdWU6ICMwMDQzYjM7XHJcbiRjb2xvci1hbGljZS1ibHVlOiAjZjBmM2Y1O1xyXG4kY29sb3Itc2lsdmVyOiAjYzRjNGM0O1xyXG4kY29sb3ItbWF0dGVyaG9ybjogIzUxNTE1MTtcclxuJGNvbG9yLXZlcnktZGFyay1ncmF5OiAjNjI2MjYyO1xyXG4kY29sb3ItbWVyY3VyeTogI2U3ZTdlNztcclxuJGNvbG9yLWxpZ2h0LWdyYXk6ICNkOGQ4ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZWJlYmViO1xyXG4kY29sb3ItYWxpemFyaW46ICNlMjI5NDI7XHJcbiRjb2xvci1mbGFtZS1yZWQ6ICM4ODE5Mjg7XHJcbiRjb2xvci1jaGFyY29hbDogIzQ2NDY0NjtcclxuJGNvbG9yLWRlZXAtc2VhOiAjMTQ3ZDYzO1xyXG4kY29sb3ItY2FyZGluYWw6ICNiNTIxMzU7XHJcbiRjb2xvci1nb2QtZ3JheTogIzE2MTYxNjtcclxuJGNvbG9yLWhvdC1jdXJyeTogIzdjNWQyMztcclxuJGNvbG9yLWNhc2FibGFuY2E6ICNmN2JhNDU7XHJcbiRjb2xvci1hbGFiYXN0ZXI6ICNmN2Y3Zjc7XHJcbiRwb3JjZWxhaW46ICNlNmU5ZWI7XHJcbiRjb2xvci1oYXJsZXktZGF2aWRzb24tb3JhbmdlOiAjRDA0MzFBO1xyXG4kY29sb3ItcGF0dGVucy1ibHVlOiAjZTBlM2U1O1xyXG5cclxuLy8vIFNpemVcclxuJGJvdHRvbS1uYXZpZ2F0aW9uLWJhci1oZWlnaHQ6IDUwcHg7XHJcbiIsIkBpbXBvcnQgJ3Rvb2xzJztcclxuXHJcbi5sb2dpbi1oZWFkZXIge1xyXG4gICYuaGVhZGVyLW1kOmFmdGVyIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XHJcbiAgfVxyXG5cclxuICBpb24tYmFjay1idXR0b24ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAtLWljb24tZm9udC1zaXplOiAyNXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmxvZ2luIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICZfX2luc3RpdHV0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBoZWlnaHQ6IDM4MHB4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1NXB4IDIwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTcxcHg7XHJcblxyXG4gICAgJi1sb2dvLXdyYXBwZXIge1xyXG4gICAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcclxuICAgIH1cclxuXHJcbiAgICAmLWxvZ28ge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgfVxyXG5cclxuICAgICYtbmFtZS13cmFwcGVyIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgfVxyXG5cclxuICAgICYtbmFtZSB7XHJcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiA0M3B4O1xyXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuICAgICAgLy8gZm9udC1zaXplOiA0MnB4O1xyXG4gICAgICAvLyBmb250LWZhbWlseTogJ1RpbWVzIE5ldyBSb21hbicsIFRpbWVzLCBzZXJpZjtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDQycHgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGhlaWdodDogMjcwcHg7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA0cHggMHB4ICMwMDAwMDAxZiwgMHB4IDJweCAxNHB4IDBweCAjMDAwMDAwMWY7XHJcblxyXG4gICAgJi13cmFwcGVyIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB0b3A6IDIwMHB4O1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICAgIH1cclxuXHJcbiAgICAmLXBhc3N3b3JkIHtcclxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcblxyXG4gICAgICAmLWZvcmdvdCB7XHJcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgIGNvbG9yOiAkY29sb3ItZG9kZ2VyLWJsdWU7XHJcblxyXG4gICAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDEycHgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJi1idG5zIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuXHJcbiAgICAgICYtLW9kZCB7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19mb290ZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuXHJcbiAgICAmLXZlcnNpb24ge1xyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxMnB4KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.ts":
/*!****************************************************************************!*\
  !*** ./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.ts ***!
  \****************************************************************************/
/*! exports provided: UserPassForm, USERFORM_CONTROL_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPassForm", function() { return UserPassForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERFORM_CONTROL_NAMES", function() { return USERFORM_CONTROL_NAMES; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var src_app_content_strings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/facades/identity/identity.facade.service */ "./src/app/core/facades/identity/identity.facade.service.ts");


















var UserPassForm = /** @class */ (function () {
    function UserPassForm(institutionFacadeService, settingsFacadeService, contentStringsFacadeService, authFacadeService, loadingService, activatedRoute, router, sanitizer, toastController, identityFacadeService, fb, cdRef, appBrowser) {
        this.institutionFacadeService = institutionFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.contentStringsFacadeService = contentStringsFacadeService;
        this.authFacadeService = authFacadeService;
        this.loadingService = loadingService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.sanitizer = sanitizer;
        this.toastController = toastController;
        this.identityFacadeService = identityFacadeService;
        this.fb = fb;
        this.cdRef = cdRef;
        this.appBrowser = appBrowser;
    }
    Object.defineProperty(UserPassForm.prototype, "username", {
        get: function () {
            return this.loginForm.get(this.controlsNames.username);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPassForm.prototype, "password", {
        get: function () {
            return this.loginForm.get(this.controlsNames.password);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserPassForm.prototype, "controlsNames", {
        get: function () {
            return USERFORM_CONTROL_NAMES;
        },
        enumerable: true,
        configurable: true
    });
    UserPassForm.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var id, sessionId;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initForm();
                        return [4 /*yield*/, this.setLocalInstitutionInfo()];
                    case 1:
                        _a.sent();
                        id = this.institutionInfo.id;
                        return [4 /*yield*/, this.authFacadeService
                                .getAuthSessionToken$()
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                                .toPromise()];
                    case 2:
                        sessionId = _a.sent();
                        this.placeholderOfUsername$ = this.getPlaceholderForUsername(sessionId);
                        this.institutionPhoto$ = this.getInstitutionPhoto(id, sessionId);
                        this.institutionName$ = this.getInstitutionName(id, sessionId);
                        this.nativeHeaderBg$ = this.getNativeHeaderBg(id, sessionId);
                        this.deviceInfo$ = this.fetchDeviceInfo();
                        this.cdRef.markForCheck();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserPassForm.prototype.redirectToWebPage = function (url) {
        window.open(_environment__WEBPACK_IMPORTED_MODULE_13__["Environment"].getSitesURL() + "/" + this.institutionInfo.shortName + "/full/" + url);
    };
    UserPassForm.prototype.redirectToForgotPassword = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var shortName, url;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.institutionFacadeService.cachedInstitutionInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).toPromise()];
                    case 1:
                        shortName = (_a.sent()).shortName;
                        url = _environment__WEBPACK_IMPORTED_MODULE_13__["Environment"].getSitesURL() + "/" + shortName + "/full/login.php?password=forgot";
                        this.appBrowser.create(url);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserPassForm.prototype.authenticateUser = function (form) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, username, password, id, sessionId, e_1, loginState, _b, e_2, supportedBiometricType, biometricConfig;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (form.invalid) {
                            this.presentToast('Login failed, invalid user name and/or password');
                            return [2 /*return*/];
                        }
                        _a = form.value, username = _a.username, password = _a.password;
                        id = this.institutionInfo.id;
                        return [4 /*yield*/, this.loadingService.showSpinner()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, 5, 7]);
                        return [4 /*yield*/, this.authenticateUsernamePassword(username, password, id)];
                    case 3:
                        sessionId = _c.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        e_1 = _c.sent();
                        console.log('authUser error', e_1);
                        this.presentToast('Login failed, invalid user name and/or password');
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, this.loadingService.closeSpinner()];
                    case 6:
                        _c.sent();
                        return [7 /*endfinally*/];
                    case 7: return [4 /*yield*/, this.identityFacadeService.determinePostLoginState(sessionId, id)];
                    case 8:
                        loginState = _c.sent();
                        console.log('UserPass - Login State:', loginState);
                        _b = loginState;
                        switch (_b) {
                            case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["LoginState"].PIN_SET: return [3 /*break*/, 9];
                            case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["LoginState"].BIOMETRIC_SET: return [3 /*break*/, 14];
                            case _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["LoginState"].DONE: return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 18];
                    case 9:
                        _c.trys.push([9, 11, 12, 13]);
                        return [4 /*yield*/, this.identityFacadeService.pinOnlyLoginSetup()];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        e_2 = _c.sent();
                        console.log('UPF - pin set error', e_2);
                        this.presentToast('Login failed, invalid user name and/or password');
                        return [3 /*break*/, 13];
                    case 12:
                        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_1__["PATRON_NAVIGATION"].dashboard]);
                        return [7 /*endfinally*/];
                    case 13: return [3 /*break*/, 18];
                    case 14: return [4 /*yield*/, this.identityFacadeService.getAvailableBiometricHardware()];
                    case 15:
                        supportedBiometricType = _c.sent();
                        biometricConfig = this.configureBiometricsConfig(supportedBiometricType);
                        return [4 /*yield*/, this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_1__["PATRON_NAVIGATION"].biometric], { state: { biometricConfig: biometricConfig } })];
                    case 16:
                        _c.sent();
                        return [3 /*break*/, 18];
                    case 17:
                        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_1__["PATRON_NAVIGATION"].dashboard]);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    UserPassForm.prototype.initForm = function () {
        var _a;
        this.loginForm = this.fb.group((_a = {},
            _a[this.controlsNames.username] = ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            _a[this.controlsNames.password] = ['', _angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required],
            _a));
    };
    UserPassForm.prototype.authenticateUsernamePassword = function (username, password, id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.authFacadeService
                        .authenticateUser$({
                        userName: username,
                        password: password,
                        domain: null,
                        institutionId: id,
                    })
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.isPinEnabled = function (id, sessionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.settingsFacadeService
                        .getSetting(_app_global__WEBPACK_IMPORTED_MODULE_1__["Settings"].Setting.PIN_ENABLED, sessionId, id)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                        var value = _a.value;
                        return parseInt(value) === 1;
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.fetchDeviceInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, _capacitor_core__WEBPACK_IMPORTED_MODULE_16__["Device"].getInfo()];
            });
        });
    };
    UserPassForm.prototype.getPlaceholderForUsername = function (sessionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.contentStringsFacadeService
                        .resolveContentString$(src_app_content_strings__WEBPACK_IMPORTED_MODULE_12__["CONTENT_STINGS_DOMAINS"].get_web_gui, src_app_content_strings__WEBPACK_IMPORTED_MODULE_12__["CONTENT_STINGS_CATEGORIES"].login_screen, 'email_username', sessionId, false)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                        var value = _a.value;
                        return value;
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.configureBiometricsConfig = function (supportedBiometricType) {
        if (supportedBiometricType.includes('fingerprint')) {
            return { type: 'fingerprint', name: 'Figerprint' };
        }
        else if (supportedBiometricType.includes('face')) {
            return { type: 'face', name: 'Face ID' };
        }
        else if (supportedBiometricType.includes('iris')) {
            return { type: 'iris', name: 'Iris' };
        }
    };
    UserPassForm.prototype.getNativeHeaderBg = function (id, sessionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.settingsFacadeService
                        .getSetting(_app_global__WEBPACK_IMPORTED_MODULE_1__["Settings"].Setting.MOBILE_HEADER_COLOR, sessionId, id)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                        var value = _a.value;
                        if (value === null)
                            return;
                        var siteColors = JSON.parse(value);
                        var nativeHeaderBg = siteColors['native-header-bg'];
                        return nativeHeaderBg ? '#' + nativeHeaderBg : '#166dff';
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.setLocalInstitutionInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.institutionFacadeService
                        .cachedInstitutionInfo$
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (institutionInfo) { return (_this.institutionInfo = institutionInfo); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.getInstitutionName = function (id, sessionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.institutionFacadeService
                        .getInstitutionDataById$(id, sessionId, false)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (institutionInfo) { return (_this.institutionInfo = institutionInfo); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
                        var name = _a.name;
                        return name + " university";
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.getInstitutionPhoto = function (id, sessionId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.institutionFacadeService
                        .getInstitutionPhotoById$(id, sessionId, false)
                        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["skipWhile"])(function (d) { return !d || d === null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
                        var data = res.data, mimeType = res.mimeType;
                        return "data:" + mimeType + ";base64," + data;
                    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return _this.sanitizer.bypassSecurityTrustResourceUrl(response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function () { return _this.cdRef.markForCheck(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
                        .toPromise()];
            });
        });
    };
    UserPassForm.prototype.presentToast = function (message) {
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
    UserPassForm.prototype.getIsWeb = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var operatingSystem;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _capacitor_core__WEBPACK_IMPORTED_MODULE_16__["Device"].getInfo()];
                    case 1:
                        operatingSystem = (_a.sent()).operatingSystem;
                        return [2 /*return*/, !(operatingSystem === 'ios' || operatingSystem === 'android')];
                }
            });
        });
    };
    UserPassForm = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'user-pass-form',
            template: __webpack_require__(/*! ./user-pass-form.page.html */ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./user-pass-form.page.scss */ "./src/app/non-authorized/pages/user-pass-form/user-pass-form.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_4__["InstitutionFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_15__["SettingsFacadeService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_11__["ContentStringsFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_7__["AuthFacadeService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_10__["LoadingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"],
            _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_17__["IdentityFacadeService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"],
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_14__["InAppBrowser"]])
    ], UserPassForm);
    return UserPassForm;
}());

var USERFORM_CONTROL_NAMES;
(function (USERFORM_CONTROL_NAMES) {
    USERFORM_CONTROL_NAMES["username"] = "username";
    USERFORM_CONTROL_NAMES["password"] = "password";
})(USERFORM_CONTROL_NAMES || (USERFORM_CONTROL_NAMES = {}));


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



/***/ })

}]);
//# sourceMappingURL=pages-user-pass-form-user-pass-form-module.js.map