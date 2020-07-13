(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/core/model/rewards/rewards.model.ts":
/*!*****************************************************!*\
  !*** ./src/app/core/model/rewards/rewards.model.ts ***!
  \*****************************************************/
/*! exports provided: OPT_IN_STATUS, PopupTypes, LEVEL_STATUS, CLAIM_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPT_IN_STATUS", function() { return OPT_IN_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupTypes", function() { return PopupTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_STATUS", function() { return LEVEL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLAIM_STATUS", function() { return CLAIM_STATUS; });
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

/***/ "./src/app/core/service/rewards/rewards-api.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/core/service/rewards/rewards-api.service.ts ***!
  \*************************************************************/
/*! exports provided: RewardsApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsApiService", function() { return RewardsApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");







var RewardsApiService = /** @class */ (function () {
    function RewardsApiService(http, toastController, platform) {
        this.http = http;
        this.toastController = toastController;
        this.platform = platform;
        this.serviceUrl = '/json/rewards';
    }
    RewardsApiService.prototype.getUserRewardTrackInfo = function (headerOnly, showToastOnError) {
        if (headerOnly === void 0) { headerOnly = false; }
        if (showToastOnError === void 0) { showToastOnError = true; }
        var postParams = { headerOnly: headerOnly };
        var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('retrieveUserRewardTrackInfo', postParams, true);
        return this.http.post(this.serviceUrl, queryConfig).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return Array.isArray(response) && response.length ? response[0] : null;
        }), this.onErrorHandler(showToastOnError));
    };
    RewardsApiService.prototype.isPlatform = function (name) {
        return this.platform.is(name);
    };
    RewardsApiService.prototype.onErrorHandler = function (showToastOnError) {
        var _this = this;
        if (showToastOnError === void 0) { showToastOnError = true; }
        return function (source) {
            return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (err) {
                showToastOnError && _this.presentToast();
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err);
            }));
        };
    };
    RewardsApiService.prototype.presentToast = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var message, isNativeDevicesEnv, toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = "something went wrong, try again later";
                        isNativeDevicesEnv = this.isPlatform('android') || this.isPlatform('ios');
                        return [4 /*yield*/, this.toastController.create({
                                message: message,
                                duration: 3000,
                                cssClass: 'exception-toast',
                                position: isNativeDevicesEnv ? 'bottom' : 'top',
                                closeButtonText: 'DISMISS',
                                showCloseButton: true,
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
    RewardsApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"]])
    ], RewardsApiService);
    return RewardsApiService;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header class=\"edit-home__header\" mode=\"ios\">\r\n  <ion-toolbar mode=\"ios\">\r\n    <ion-buttons slot=\"start\" mode=\"ios\">\r\n      <ion-button mode=\"ios\" class=\"edit-home__header-back-btn\" (click)=\"onClickedClose()\">\r\n        <ion-icon name=\"close\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-title mode=\"ios\" class=\"edit-home__header-title\">Edit Home Page</ion-title>\r\n<!--    <ion-buttons slot=\"end\" mode=\"ios\">-->\r\n<!--      <ion-button mode=\"ios\" class=\"edit-home__header-done-btn\" (click)=\"onClickedDone()\">Done</ion-button>-->\r\n<!--    </ion-buttons>-->\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"edit-home__content-container\">\r\n  <div class=\"edit-home__description-wrapper\">\r\n    <p class=\"edit-home__description\">\r\n      Hold and drag cards to reorder your Home Page.\r\n      <br/>\r\n      <!-- Toggle cards On or Off to Show or Hide them. -->\r\n    </p>\r\n  </div>\r\n\r\n  <ion-list class=\"edit-home__reorder-list\">\r\n    <ion-list-header class=\"edit-home__reorder-header\">\r\n      <img class=\"edit-home__reorder-header-icon\" src=\"/assets/icon/dashboard.svg\"/>\r\n      <div class=\"edit-home__reorder-header-title\">Home Page</div>\r\n    </ion-list-header>\r\n    <ion-reorder-group (ionItemReorder)=\"doReorder($event)\" [disabled]=\"false\" mode=\"md\">\r\n      <ion-item *ngFor=\"let tileConfig of homeConfigList$ | async\" class=\"edit-home__reorder-item\">\r\n        <ion-label class=\"edit-home__reorder-label\">\r\n          {{ tileConfig.title }}\r\n        </ion-label>\r\n<!--        <ion-toggle-->\r\n<!--                value=\"{{ tileConfig.title }}\"-->\r\n<!--                class=\"edit-home__reorder-toggle\"-->\r\n<!--                (ionChange)=\"onToggle($event)\"-->\r\n<!--                mode=\"ios\"-->\r\n<!--                checked=\"{{ tileConfig.isEnable }}\"-->\r\n<!--        ></ion-toggle>-->\r\n        <ion-reorder>\r\n          <ion-icon class=\"edit-home__reorder-icon\" name=\"md-reorder\"></ion-icon>\r\n        </ion-reorder>\r\n      </ion-item>\r\n    </ion-reorder-group>\r\n  </ion-list>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.scss":
/*!********************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.edit-home__content-container {\n  --background: #f3f3f3; }\n.edit-home__header-back-btn {\n  color: #000;\n  font-size: 22px; }\n.edit-home__header-done-btn {\n  font-weight: 600; }\n.edit-home__description-wrapper {\n  margin: 20px 0;\n  padding: 20px;\n  background: #fff;\n  color: #6e6e6e;\n  font-size: 12px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.edit-home__description {\n  margin: 0;\n  padding: 0; }\n.edit-home__reorder-list {\n  padding: 0; }\n.edit-home__reorder-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: start;\n          justify-content: flex-start; }\n.edit-home__reorder-header-title {\n  margin-left: 10px;\n  color: #6e6e6e;\n  text-transform: uppercase;\n  font-size: 13px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.edit-home__reorder-label {\n  font-size: 15px;\n  font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.edit-home__reorder-toggle {\n  --background-checked: #166dff;\n  zoom: 0.7;\n  margin-right: 20px; }\n.edit-home__reorder-icon {\n  color: #6e6e6e;\n  font-size: 30px;\n  vertical-align: middle; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbXBvbmVudHMvZWRpdC1ob21lLXBhZ2UtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbXBvbmVudHMvZWRpdC1ob21lLXBhZ2UtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxkYXNoYm9hcmRcXGNvbXBvbmVudHNcXGVkaXQtaG9tZS1wYWdlLW1vZGFsXFxlZGl0LWhvbWUtcGFnZS1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbXBvbmVudHMvZWRpdC1ob21lLXBhZ2UtbW9kYWwvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUNyRXZCO0VBQ0UscUJBQWEsRUFBQTtBQUdmO0VBQ0UsV0QwRmM7RUN6RmQsZUFBZSxFQUFBO0FBR2pCO0VBQ0UsZ0JBQWdCLEVBQUE7QUFHbEI7RUFDRSxjQUFjO0VBQ2QsYUFBYTtFQUNiLGdCRDhFYztFQzdFZCxjRHNFb0I7RUV6RnRCLGVEcUJvQztFQ2pCcEMsaURGMkV5RCxFQUFBO0FDdkR6RDtFQUNFLFNBQVM7RUFDVCxVQUFVLEVBQUE7QUFHWjtFQUNFLFVBQVUsRUFBQTtBQUdaO0VBQ0Usb0JBQWE7RUFBYixhQUFhO0VBQ2IsdUJBQTJCO1VBQTNCLDJCQUEyQixFQUFBO0FBRzdCO0VBQ0UsaUJBQWlCO0VBQ2pCLGNEaURvQjtFQ2hEcEIseUJBQXlCO0VDekMzQixlRDJDb0M7RUN2Q3BDLGlERjJFeUQsRUFBQTtBQ2pDekQ7RUM5Q0EsZUQrQ29DO0VDM0NwQyxpREYyRXlELEVBQUE7QUM3QnpEO0VBQ0UsNkJBQXFCO0VBRXJCLFNBQVM7RUFDVCxrQkFBa0IsRUFBQTtBQUdwQjtFQUNFLGNEK0JvQjtFQzlCcEIsZUFBZTtFQUNmLHNCQUFzQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbXBvbmVudHMvZWRpdC1ob21lLXBhZ2UtbW9kYWwvZWRpdC1ob21lLXBhZ2UtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uZWRpdC1ob21lIHtcclxuICAmX19jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICNmM2YzZjM7XHJcbiAgfVxyXG5cclxuICAmX19oZWFkZXItYmFjay1idG4ge1xyXG4gICAgY29sb3I6ICRjb2xvci1ibGFjaztcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICB9XHJcblxyXG4gICZfX2hlYWRlci1kb25lLWJ0biB7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gIH1cclxuXHJcbiAgJl9fZGVzY3JpcHRpb24td3JhcHBlciB7XHJcbiAgICBtYXJnaW46IDIwcHggMDtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgICBjb2xvcjogJGNvbG9yLWRpbS1ncmF5O1xyXG5cclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDEycHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fZGVzY3JpcHRpb24ge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICB9XHJcblxyXG4gICZfX3Jlb3JkZXItbGlzdCB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuXHJcbiAgJl9fcmVvcmRlci1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICB9XHJcblxyXG4gICZfX3Jlb3JkZXItaGVhZGVyLXRpdGxlIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gICAgY29sb3I6ICRjb2xvci1kaW0tZ3JheTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTNweCk7XHJcbiAgfVxyXG5cclxuICAmX19yZW9yZGVyLWxhYmVsIHtcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE1cHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fcmVvcmRlci10b2dnbGUge1xyXG4gICAgLS1iYWNrZ3JvdW5kLWNoZWNrZWQ6ICMxNjZkZmY7XHJcblxyXG4gICAgem9vbTogMC43O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fcmVvcmRlci1pY29uIHtcclxuICAgIGNvbG9yOiAkY29sb3ItZGltLWdyYXk7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: EditHomePageModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditHomePageModalComponent", function() { return EditHomePageModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/dashboard/tile-config-facade.service */ "./src/app/sections/dashboard/tile-config-facade.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/st-global-navigation/services/global-nav.service */ "./src/app/shared/ui-components/st-global-navigation/services/global-nav.service.ts");






var EditHomePageModalComponent = /** @class */ (function () {
    function EditHomePageModalComponent(modalController, tileConfigFacadeService, globalNavService) {
        this.modalController = modalController;
        this.tileConfigFacadeService = tileConfigFacadeService;
        this.globalNavService = globalNavService;
    }
    EditHomePageModalComponent.prototype.ngOnInit = function () {
        this.globalNavService.hideNavBar();
        this.homeConfigList$ = this.tileConfigFacadeService.tileSettings$;
    };
    EditHomePageModalComponent.prototype.ngOnDestroy = function () {
        this.globalNavService.showNavBar();
    };
    EditHomePageModalComponent.prototype.onToggle = function (_a) {
        var _b = _a.detail, value = _b.value, checked = _b.checked;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.homeConfigList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise()];
                    case 1:
                        config = _c.sent();
                        config = config.map(function (cfg) { return cfg.title === value ? tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, cfg, { isEnable: checked }) : cfg; });
                        this.tileConfigFacadeService.updateConfigState(config);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditHomePageModalComponent.prototype.doReorder = function (_a) {
        var _b = _a.detail, from = _b.from, to = _b.to, detail = _a.detail;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var config, movedElement;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.homeConfigList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).toPromise()];
                    case 1:
                        config = _c.sent();
                        movedElement = config.splice(from, 1)[0];
                        config.splice(to, 0, movedElement);
                        return [4 /*yield*/, this.tileConfigFacadeService.updateConfigState(config)];
                    case 2:
                        _c.sent();
                        detail.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditHomePageModalComponent.prototype.onClickedClose = function () {
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
    EditHomePageModalComponent.prototype.onClickedDone = function () {
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonReorderGroup"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonReorderGroup"])
    ], EditHomePageModalComponent.prototype, "reorderGroup", void 0);
    EditHomePageModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-edit-home-page-modal',
            template: __webpack_require__(/*! ./edit-home-page-modal.component.html */ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./edit-home-page-modal.component.scss */ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_3__["TileConfigFacadeService"],
            _shared_ui_components_st_global_navigation_services_global_nav_service__WEBPACK_IMPORTED_MODULE_5__["GlobalNavService"]])
    ], EditHomePageModalComponent);
    return EditHomePageModalComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/components/edit-home-page-modal/index.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sections/dashboard/components/edit-home-page-modal/index.ts ***!
  \*****************************************************************************/
/*! exports provided: EditHomePageModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_home_page_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-home-page-modal.component */ "./src/app/sections/dashboard/components/edit-home-page-modal/edit-home-page-modal.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditHomePageModalComponent", function() { return _edit_home_page_modal_component__WEBPACK_IMPORTED_MODULE_0__["EditHomePageModalComponent"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/access-card/access-card.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/access-card/access-card.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" [ngStyle]=\"{'background-color': (institutionColor$ | async)}\">\r\n  <ion-grid class=\"ion-no-padding\">\r\n    <ion-row class=\"card__header\">\r\n      <ion-col class=\"card__header-logo-wrapper\" size=\"2\">\r\n        <img\r\n                *ngIf=\"(institutionPhoto$ | async)\"\r\n                class=\"card__header-logo\"\r\n                [src]=\"institutionPhoto$ | async\"\r\n                alt=\"institution logo\"\r\n        />\r\n      </ion-col>\r\n      <ion-col class=\"card__header-title-wrapper\" size=\"9\">\r\n        <div *ngIf=\"(institutionName$ | async)\"\r\n             class=\"card__header-title left\">{{ institutionName$ | async }}</div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"card__campus-container\">\r\n      <ion-col class=\"card__campus-wrapper\">\r\n        <ng-container\r\n                *ngIf=\"(institutionBackgroundImage$ | async); then campusBackground; else defaultBackground\">\r\n        </ng-container>\r\n        <ng-template #defaultBackground>\r\n          <img\r\n                  class=\"card__campus-background\"\r\n                  src=\"/assets/images/card_background_illustration.svg\"\r\n                  alt=\"background photo\"\r\n          />\r\n        </ng-template>\r\n        <ng-template #campusBackground>\r\n          <img class=\"card__campus-background\" [src]=\"institutionBackgroundImage$ | async\"\r\n               alt=\"campus photo\"/>\r\n        </ng-template>\r\n        <div class=\"card__campus-student-avatar-wrapper\">\r\n          <img *ngIf=\"!isLoadingPhoto\"\r\n               class=\"card__campus-student-avatar\"\r\n               [src]=\"userPhoto\"\r\n               alt=\"user photo\"\r\n          />\r\n          <img *ngIf=\"isLoadingPhoto || !userPhoto\" class=\"card__campus-empty-photo\" src=\"/assets/images/no_photo.svg\"\r\n               alt=\"no photo icon\">\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"card__student-container\">\r\n      <ion-col class=\"card__student-name-wrapper\" [size]=\"appleWalletEnabled ? 8 : 'auto'\">\r\n        <div *ngIf=\"(userName$ | async)\" class=\"card__student-name\">{{ userName$ | async }}</div>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"appleWalletEnabled\" size=\"4\">\r\n        <div class=\"card__student-wallet\">\r\n          <img *ngIf=\"appleWalletMessageImage\"\r\n               class=\"card__wallet-icon\"\r\n               src=\"/assets/images/{{appleWalletMessageImage}}.png\"\r\n               alt=\"{{ appleWalletMessage }}\"\r\n          />\r\n          <div class=\"card__student-wallet-text\">{{ appleWalletMessage }}</div>\r\n        </div>\r\n      </ion-col>\r\n    </ion-row>\r\n    <ion-row class=\"card__quick-actions-container\">\r\n      <ion-col class=\"card__quick-actions-wrapper\" *ngIf=\"(getMyCardEnabled$ | async)\">\r\n        <ion-button mode=\"ios\" class=\"card__quick-actions-btn\" (click)=\"onScanCardClick()\">\r\n          <div class=\"card__quick-actions-btn-wrapper\">\r\n            <img class=\"card__icon\" src=\"/assets/icon/barcode.svg\" alt=\"barcode\"/>\r\n            <div class=\"card__icon-title\">Scan Card</div>\r\n          </div>\r\n        </ion-button>\r\n      </ion-col>\r\n      <ion-col class=\"card__quick-actions-wrapper\" *ngIf=\"isMobileAccessButtonEnabled$ | async\">\r\n        <ion-button mode=\"ios\" class=\"card__quick-actions-btn\" (click)=\"onMobileAccessClick()\">\r\n          <div class=\"card__quick-actions-btn-wrapper\">\r\n            <img class=\"card__icon\" src=\"/assets/icon/mobile-access.svg\" alt=\"mobile access\"/>\r\n            <div class=\"card__icon-title\">Mobile Access</div>\r\n          </div>\r\n        </ion-button>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"!appleWalletButtonHidden\" class=\"card__quick-actions-wrapper\">\r\n        <ion-button mode=\"ios\" class=\"card__apple-wallet-btn\" (click)=\"addToAppleWallet()\"\r\n        ><img src=\"/assets/icon/Add_to_Apple_Wallet_rgb_US-UK.svg\"/>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/access-card/access-card.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/access-card/access-card.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.card {\n  margin: 5px;\n  border-radius: 15px;\n  background: #166dff;\n  height: 280px; }\n.card__header {\n    height: 45px;\n    -webkit-box-align: center;\n            align-items: center; }\n.card__header-logo-wrapper {\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n              align-items: center;\n      padding: 0; }\n.card__header-logo {\n      height: 35px;\n      width: 35px; }\n.card__header-title-wrapper {\n      padding: 0; }\n.card__header-title {\n      color: #fff;\n      font-size: 20px;\n      font-family: \"Nunito Regular\", arial, sans-serif; }\n.card__header-dots-btn-wrapper {\n      display: -webkit-box;\n      display: flex;\n      -webkit-box-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n              align-items: center;\n      padding: 0; }\n.card__header-dots-btn {\n      --border-radius: 15px;\n      --background: none;\n      --padding-start: 0;\n      --padding-end: 0;\n      font-size: 15px; }\n.card__campus-container {\n    height: 85px; }\n.card__campus-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    padding: 0; }\n.card__campus-background {\n    width: 100%;\n    max-height: 110px; }\n.card__campus-student-avatar-wrapper {\n    background: #fff;\n    position: absolute;\n    border-radius: 50%;\n    height: 100px;\n    width: 100px;\n    top: 35px;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center; }\n.card__campus-empty-photo {\n    width: 80%;\n    height: 80%;\n    padding-left: 5px; }\n.card__campus-student-avatar {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 50%;\n    border: 1px solid #fff; }\n.card__student-container {\n    height: 90px;\n    -webkit-box-align: end;\n            align-items: flex-end;\n    padding: 0 10px; }\n.card__student-name-wrapper {\n    padding: 0; }\n.card__student-name {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    color: #fff;\n    line-height: 20px;\n    height: 40px;\n    font-size: 5.2vw;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.card__student-wallet {\n    color: #fff;\n    text-align: right; }\n.card__student-wallet-text {\n      font-size: 12px;\n      font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.card__quick-actions-container {\n    height: 60px;\n    border-top: 1px solid #ffffff1f;\n    margin: 0 8px; }\n.card__quick-actions-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    padding: 4px; }\n.card__quick-actions-btn {\n    --background: #0000001f;\n    --padding-start: 0;\n    --padding-end: 0;\n    --border-radius: 12px;\n    width: 100%;\n    height: 48px;\n    margin: 0; }\n.card__quick-actions-btn-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    margin: 0; }\n.card__icon {\n    height: 28px;\n    width: 28px; }\n.card__wallet-icon {\n    height: 20%;\n    width: 20%; }\n.card__icon-title {\n    color: #f3f3f3;\n    font-size: 10px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.card__apple-wallet-btn {\n    --background: none;\n    --padding-start: 0;\n    --padding-end: 0;\n    --background-activated: none;\n    width: 111px;\n    margin: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvYWNjZXNzLWNhcmQvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvYWNjZXNzLWNhcmQvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxkYXNoYm9hcmRcXGNvbnRhaW5lcnNcXGFjY2Vzcy1jYXJkXFxhY2Nlc3MtY2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvYWNjZXNzLWNhcmQvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixtQkQwRnlCO0VDekZ6QixhQUFhLEVBQUE7QUFFYjtJQUNFLFlBQVk7SUFDWix5QkFBbUI7WUFBbkIsbUJBQW1CLEVBQUE7QUFFbkI7TUFDRSxvQkFBYTtNQUFiLGFBQWE7TUFDYix3QkFBdUI7Y0FBdkIsdUJBQXVCO01BQ3ZCLHlCQUFtQjtjQUFuQixtQkFBbUI7TUFDbkIsVUFBVSxFQUFBO0FBR1o7TUFDRSxZQUFZO01BQ1osV0FBVyxFQUFBO0FBR2I7TUFDRSxVQUFVLEVBQUE7QUFHWjtNQUNFLFdEb0VZO01FaEdoQixlRDhCcUM7TUMxQnJDLGdERjBFdUQsRUFBQTtBQzdDckQ7TUFDRSxvQkFBYTtNQUFiLGFBQWE7TUFDYix3QkFBdUI7Y0FBdkIsdUJBQXVCO01BQ3ZCLHlCQUFtQjtjQUFuQixtQkFBbUI7TUFDbkIsVUFBVSxFQUFBO0FBR1o7TUFDRSxxQkFBZ0I7TUFDaEIsa0JBQWE7TUFDYixrQkFBZ0I7TUFDaEIsZ0JBQWM7TUFFZCxlQUFlLEVBQUE7QUFJbkI7SUFDRSxZQUFZLEVBQUE7QUFHZDtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixVQUFVLEVBQUE7QUFHWjtJQUNFLFdBQVc7SUFDWCxpQkFBaUIsRUFBQTtBQUduQjtJQUNFLGdCRDZCYztJQzVCZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixZQUFZO0lBQ1osU0FBUztJQUNULG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIseUJBQW1CO1lBQW5CLG1CQUFtQixFQUFBO0FBR3JCO0lBQ0UsVUFBVTtJQUNWLFdBQVc7SUFDWCxpQkFBaUIsRUFBQTtBQUduQjtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0JBQWlCO09BQWpCLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsc0JET2MsRUFBQTtBQ0poQjtJQUNFLFlBQVk7SUFDWixzQkFBcUI7WUFBckIscUJBQXFCO0lBQ3JCLGVBQWUsRUFBQTtBQUdqQjtJQUNFLFVBQVUsRUFBQTtBQUdaO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixXRFRjO0lDVWQsaUJBQWlCO0lBQ2pCLFlBQVk7SUMzR2QsZ0JENkdxQztJQ3pHckMsaURGMkV5RCxFQUFBO0FDaUN6RDtJQUNFLFdEakJjO0lDa0JkLGlCQUFpQixFQUFBO0FBRWpCO01DcEhGLGVEcUhzQztNQ2pIdEMsaURGMkV5RCxFQUFBO0FDMEN6RDtJQUNFLFlBQVk7SUFDWiwrQkFBK0I7SUFDL0IsYUFBYSxFQUFBO0FBR2Y7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLFlBQVksRUFBQTtBQUdkO0lBQ0UsdUJBQWE7SUFDYixrQkFBZ0I7SUFDaEIsZ0JBQWM7SUFDZCxxQkFBZ0I7SUFFaEIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTLEVBQUE7QUFHWDtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLDRCQUFzQjtJQUF0Qiw2QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixTQUFTLEVBQUE7QUFHWDtJQUNFLFlBQVk7SUFDWixXQUFXLEVBQUE7QUFHYjtJQUNFLFdBQVc7SUFDWCxVQUFVLEVBQUE7QUFHWjtJQUNFLGNEakV1QjtJRWxHekIsZURxS29DO0lDaktwQyxpREYyRXlELEVBQUE7QUN5RnpEO0lBQ0Usa0JBQWE7SUFDYixrQkFBZ0I7SUFDaEIsZ0JBQWM7SUFDZCw0QkFBdUI7SUFFdkIsWUFBWTtJQUNaLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2FjY2Vzcy1jYXJkL2FjY2Vzcy1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmNhcmQge1xyXG4gIG1hcmdpbjogNXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLWRvZGdlci1ibHVlO1xyXG4gIGhlaWdodDogMjgwcHg7XHJcblxyXG4gICZfX2hlYWRlciB7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICYtbG9nby13cmFwcGVyIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgJi1sb2dvIHtcclxuICAgICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgICB3aWR0aDogMzVweDtcclxuICAgIH1cclxuXHJcbiAgICAmLXRpdGxlLXdyYXBwZXIge1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG5cclxuICAgICYtdGl0bGUge1xyXG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xyXG5cclxuICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigyMHB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmLWRvdHMtYnRuLXdyYXBwZXIge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgcGFkZGluZzogMDtcclxuICAgIH1cclxuXHJcbiAgICAmLWRvdHMtYnRuIHtcclxuICAgICAgLS1ib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gICAgICAtLWJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICAgIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAgICAgLS1wYWRkaW5nLWVuZDogMDtcclxuXHJcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICZfX2NhbXB1cy1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA4NXB4O1xyXG4gIH1cclxuXHJcbiAgJl9fY2FtcHVzLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5cclxuICAmX19jYW1wdXMtYmFja2dyb3VuZCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC1oZWlnaHQ6IDExMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fY2FtcHVzLXN0dWRlbnQtYXZhdGFyLXdyYXBwZXIge1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHRvcDogMzVweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAmX19jYW1wdXMtZW1wdHktcGhvdG8ge1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIGhlaWdodDogODAlO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7XHJcbiAgfVxyXG5cclxuICAmX19jYW1wdXMtc3R1ZGVudC1hdmF0YXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci13aGl0ZTtcclxuICB9XHJcblxyXG4gICZfX3N0dWRlbnQtY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogOTBweDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxuICAgIHBhZGRpbmc6IDAgMTBweDtcclxuICB9XHJcblxyXG4gICZfX3N0dWRlbnQtbmFtZS13cmFwcGVyIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5cclxuICAmX19zdHVkZW50LW5hbWUge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoNS4ydncpO1xyXG4gIH1cclxuXHJcbiAgJl9fc3R1ZGVudC13YWxsZXQge1xyXG4gICAgY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG5cclxuICAgICYtdGV4dCB7XHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDEycHgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fcXVpY2stYWN0aW9ucy1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmZmZmYxZjtcclxuICAgIG1hcmdpbjogMCA4cHg7XHJcbiAgfVxyXG5cclxuICAmX19xdWljay1hY3Rpb25zLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA0cHg7XHJcbiAgfVxyXG5cclxuICAmX19xdWljay1hY3Rpb25zLWJ0biB7XHJcbiAgICAtLWJhY2tncm91bmQ6ICMwMDAwMDAxZjtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDA7XHJcbiAgICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XHJcblxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfVxyXG5cclxuICAmX19xdWljay1hY3Rpb25zLWJ0bi13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuXHJcbiAgJl9faWNvbiB7XHJcbiAgICBoZWlnaHQ6IDI4cHg7XHJcbiAgICB3aWR0aDogMjhweDtcclxuICB9XHJcblxyXG4gICZfX3dhbGxldC1pY29uIHtcclxuICAgIGhlaWdodDogMjAlO1xyXG4gICAgd2lkdGg6IDIwJTtcclxuICB9XHJcblxyXG4gICZfX2ljb24tdGl0bGUge1xyXG4gICAgY29sb3I6ICRjb2xvci13aGl0ZS1zbW9rZTtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxMHB4KTtcclxuICB9XHJcblxyXG4gICZfX2FwcGxlLXdhbGxldC1idG4ge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gICAgLS1wYWRkaW5nLWVuZDogMDtcclxuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IG5vbmU7XHJcblxyXG4gICAgd2lkdGg6IDExMXB4O1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/access-card/access-card.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/access-card/access-card.component.ts ***!
  \************************************************************************************/
/*! exports provided: AccessCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessCardComponent", function() { return AccessCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_access_card_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/access-card.service */ "./src/app/sections/dashboard/containers/access-card/services/access-card.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_dashboard_dashboard_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/dashboard/dashboard.config */ "./src/app/sections/dashboard/dashboard.config.ts");
/* harmony import */ var _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/provider/native-provider/native.provider */ "./src/app/core/provider/native-provider/native.provider.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");













var IOSDevice = _capacitor_core__WEBPACK_IMPORTED_MODULE_12__["Plugins"].IOSDevice;
var AccessCardComponent = /** @class */ (function () {
    function AccessCardComponent(accessCardService, sanitizer, router, changeRef, nativeProvider, userFacadeService, authFacadeService) {
        this.accessCardService = accessCardService;
        this.sanitizer = sanitizer;
        this.router = router;
        this.changeRef = changeRef;
        this.nativeProvider = nativeProvider;
        this.userFacadeService = userFacadeService;
        this.authFacadeService = authFacadeService;
        this.appleWalletEnabled = false;
        this.appleWalletButtonHidden = true;
        this.isLoadingPhoto = true;
    }
    AccessCardComponent.prototype.ngOnInit = function () {
        this.setInstitutionData();
        this.getFeaturesEnabled();
        this.getUserData();
        this.getUserName();
    };
    AccessCardComponent.prototype.ionViewWillEnter = function () {
        if (this.nativeProvider.isIos() && this.userFacadeService.isAppleWalletEnabled$()) {
            this.enableAppleWallet();
            this.enableAppleWalletEvents();
        }
    };
    AccessCardComponent.prototype.getUserData = function () {
        var _this = this;
        this.userName$ = this.accessCardService.getUserName();
        this.accessCardService
            .getUserPhoto()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (photo) {
            _this.isLoadingPhoto = false;
            _this.userPhoto = photo;
            _this.changeRef.detectChanges();
        });
    };
    AccessCardComponent.prototype.setInstitutionData = function () {
        var _this = this;
        this.institutionColor$ = this.accessCardService
            .getInstitutionColor()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (v) { return '#' + (JSON.parse(v) ? JSON.parse(v)['native-header-bg'] : ''); }));
        this.institutionName$ = this.accessCardService.getInstitutionName();
        this.institutionPhoto$ = this.accessCardService
            .getInstitutionImage()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) { return _this.sanitizer.bypassSecurityTrustResourceUrl(response); }));
        this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
    };
    AccessCardComponent.prototype.getFeaturesEnabled = function () {
        this.getMyCardEnabled$ = this.accessCardService.isGETMyCardEnabled();
        this.isMobileAccessButtonEnabled$ = this.accessCardService.isMobileAccessEnable();
    };
    AccessCardComponent.prototype.onMobileAccessClick = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var color;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.institutionColor$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        color = _a.sent();
                        return [4 /*yield*/, this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_7__["PATRON_NAVIGATION"].mobileAccess], { queryParams: { color: color } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccessCardComponent.prototype.onScanCardClick = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var color;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.institutionColor$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).toPromise()];
                    case 1:
                        color = _a.sent();
                        return [4 /*yield*/, this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_7__["PATRON_NAVIGATION"].dashboard, _sections_dashboard_dashboard_config__WEBPACK_IMPORTED_MODULE_8__["DASHBOARD_NAVIGATE"].scanCard], {
                                queryParams: { color: color },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AccessCardComponent.prototype.setAppleWalletMessage = function () {
        if (this.appleWalletInfo && this.appleWalletInfo.isAppleWalletEnabled && this.appleWalletInfo.canAddPass) {
            this.appleWalletEnabled = this.appleWalletInfo.isAppleWalletEnabled;
            var isIPhoneAlreadyProvisioned = this.appleWalletInfo.iPhoneProvisioned;
            var isWatchPaired = this.appleWalletInfo.watchPaired;
            var isIWatchAlreadyProvisioned = this.appleWalletInfo.watchProvisioned;
            var watchCredStatus = this.appleWalletInfo.watchCredStatus;
            var iPhoneCredStatus = this.appleWalletInfo.iPhoneCredStatus;
            /// code ported from iOS with some unused parts left commented out, which we might use later
            if (isIPhoneAlreadyProvisioned && !isWatchPaired) {
                //no watch, only phone
                this.appleWalletMessageImage = 'iphonex';
                this.appleWalletMessage = 'Added to iPhone';
                // this.appleWalletMessageImageHidden = false;
                this.appleWalletButtonHidden = true;
            }
            else if (isIPhoneAlreadyProvisioned && isWatchPaired && !isIWatchAlreadyProvisioned) {
                this.appleWalletMessageImage = 'iphonex';
                this.appleWalletMessage = 'Added to iPhone';
                // this.appleWalletMessageImageHidden =  false;
                this.appleWalletButtonHidden = watchCredStatus == _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_9__["AppleWalletCredentialStatus"].Disabled;
            }
            else if (isWatchPaired && isIWatchAlreadyProvisioned && !isIPhoneAlreadyProvisioned) {
                this.appleWalletMessageImage = 'applewatch';
                this.appleWalletMessage = 'Added to Watch';
                // this.appleWalletMessageImageHidden = false;
                this.appleWalletButtonHidden = iPhoneCredStatus == _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_9__["AppleWalletCredentialStatus"].Disabled;
            }
            else if (isIPhoneAlreadyProvisioned && isIWatchAlreadyProvisioned && isWatchPaired) {
                this.appleWalletMessage = 'Added to iPhone and Watch';
                this.appleWalletMessageImage = 'iphonex_applewatch';
                // this.appleWalletMessageImageHidden = false;
                this.appleWalletButtonHidden = true;
            }
            else {
                this.appleWalletMessage = 'Card not added to Wallet';
                this.appleWalletMessageImage = null;
                // this.appleWalletMessageImageHidden = true;
                this.appleWalletButtonHidden = false;
            }
        }
        else {
            this.appleWalletMessage = null;
            this.appleWalletMessageImage = null;
            // this.appleWalletMessageImageHidden = true;
            this.appleWalletButtonHidden = true;
            this.appleWalletEnabled = false;
        }
        this.changeRef.detectChanges();
    };
    AccessCardComponent.prototype.addToAppleWallet = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, IOSDevice.addToAppleWallet({ user: this.userInfo })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AccessCardComponent.prototype.getUserName = function () {
        var _this = this;
        this.userFacadeService
            .getUser$()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .subscribe(function (response) {
            _this.userInfo = JSON.stringify(response);
        });
    };
    AccessCardComponent.prototype.enableAppleWallet = function () {
        var _this = this;
        this.authFacadeService.cachedAuthSessionToken$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (sessionId) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(IOSDevice.getAppleWalletInfo({ sessionId: sessionId })); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .subscribe(function (appleWalletInfo) {
            if (appleWalletInfo) {
                _this.appleWalletInfo = appleWalletInfo;
                _this.setAppleWalletMessage();
            }
        });
    };
    AccessCardComponent.prototype.enableAppleWalletEvents = function () {
        var _this = this;
        IOSDevice.addListener('AppleWalletEvent', function (info) {
            _this.enableAppleWallet();
        });
    };
    AccessCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'st-access-card',
            template: __webpack_require__(/*! ./access-card.component.html */ "./src/app/sections/dashboard/containers/access-card/access-card.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./access-card.component.scss */ "./src/app/sections/dashboard/containers/access-card/access-card.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_access_card_service__WEBPACK_IMPORTED_MODULE_5__["AccessCardService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"],
            _core_provider_native_provider_native_provider__WEBPACK_IMPORTED_MODULE_9__["NativeProvider"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_10__["UserFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_11__["AuthFacadeService"]])
    ], AccessCardComponent);
    return AccessCardComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/access-card/access-card.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/access-card/access-card.module.ts ***!
  \*********************************************************************************/
/*! exports provided: AccessCardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessCardModule", function() { return AccessCardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _access_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./access-card.component */ "./src/app/sections/dashboard/containers/access-card/access-card.component.ts");
/* harmony import */ var _services_access_card_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/access-card.service */ "./src/app/sections/dashboard/containers/access-card/services/access-card.service.ts");






var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
var declarations = [_access_card_component__WEBPACK_IMPORTED_MODULE_4__["AccessCardComponent"]];
var providers = [_services_access_card_service__WEBPACK_IMPORTED_MODULE_5__["AccessCardService"]];
var exports = [_access_card_component__WEBPACK_IMPORTED_MODULE_4__["AccessCardComponent"]];
var AccessCardModule = /** @class */ (function () {
    function AccessCardModule() {
    }
    AccessCardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers,
            exports: exports
        })
    ], AccessCardModule);
    return AccessCardModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/access-card/index.ts":
/*!********************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/access-card/index.ts ***!
  \********************************************************************/
/*! exports provided: AccessCardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _access_card_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./access-card.module */ "./src/app/sections/dashboard/containers/access-card/access-card.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessCardModule", function() { return _access_card_module__WEBPACK_IMPORTED_MODULE_0__["AccessCardModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"accounts\" [ngClass]=\"{'accounts--auto-height': !isLoading}\">\r\n  <ion-slides *ngIf=\"!isLoading && slides.length\"\r\n              class=\"accounts__slides\"\r\n              [pager]=\"true\" mode=\"ios\"\r\n              [options]=\"slideOpts\">\r\n    <ion-slide class=\"accounts__slide\" *ngFor=\"let accountsByOneSlide of slides\">\r\n      <div class=\"accounts__item\" *ngFor=\"let account of accountsByOneSlide\" (click)=\"goToAccountHistory(account.id)\">\r\n        <div class=\"accounts__title\">{{ account.accountDisplayName }}</div>\r\n        <div class=\"accounts__total\">{{ account.balance | transactionUnits: account.accountType }}</div>\r\n      </div>\r\n    </ion-slide>\r\n  </ion-slides>\r\n\r\n  <ion-list *ngIf=\"isLoading\">\r\n    <ion-item lines=\"none\">\r\n      <ion-label>\r\n        <p class=\"accounts__skeleton-row\">\r\n          <ion-skeleton-text class=\"accounts__skeleton-account-card\" animated></ion-skeleton-text>\r\n          <ion-skeleton-text class=\"accounts__skeleton-account-card\" animated></ion-skeleton-text>\r\n          <ion-skeleton-text class=\"accounts__skeleton-account-card\" animated></ion-skeleton-text>\r\n          <ion-skeleton-text class=\"accounts__skeleton-account-card\" animated></ion-skeleton-text>\r\n        </p>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.accounts {\n  width: 100%;\n  min-height: 180px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.accounts--auto-height {\n    min-height: 0; }\n.accounts__slides {\n    --bullet-background-active: #000;\n    padding-left: 5px;\n    height: 170px; }\n.accounts__slide {\n    display: -webkit-box;\n    display: flex;\n    flex-wrap: wrap;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n    margin: 10px 0; }\n.accounts__item {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    text-align: left;\n    width: 160px;\n    height: 55px;\n    margin: 5px;\n    padding: 5px;\n    border-radius: 8px;\n    background: #f3f3f3; }\n.accounts__title {\n    color: #6e6e6e;\n    font-size: 12px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.accounts__total {\n    color: #000;\n    font-size: 20px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.accounts__skeleton-row {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    flex-wrap: wrap; }\n.accounts__skeleton-account-card {\n    width: 48%;\n    height: 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvYWNjb3VudHMtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9hY2NvdW50cy10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcZGFzaGJvYXJkXFxjb250YWluZXJzXFxhY2NvdW50cy10aWxlXFxhY2NvdW50cy10aWxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9hY2NvdW50cy10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNJLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsK0JBQXVCO0VBQXZCLHVCQUF1QixFQUFBO0FBRXZCO0lBQ0ksYUFBYSxFQUFBO0FBR2pCO0lBQ0ksZ0NBQTJCO0lBRTNCLGlCQUFpQjtJQUNqQixhQUFhLEVBQUE7QUFHakI7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYixlQUFlO0lBQ2YsdUJBQTJCO1lBQTNCLDJCQUEyQjtJQUMzQixjQUFjLEVBQUE7QUFHbEI7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYiw0QkFBc0I7SUFBdEIsNkJBQXNCO1lBQXRCLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFlBQVk7SUFDWixXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixtQkRpRW1CLEVBQUE7QUM5RHRCO0lBQ0ksY0RvRGU7SUV6RnRCLGVEdUN5QztJQ25DekMsaURGMkV5RCxFQUFBO0FDckN0RDtJQUNJLFdEc0RTO0lFakdoQixlRDZDc0M7SUN6Q3RDLDZDRjRFa0QsRUFBQTtBQ2hDaEQ7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBOEI7WUFBOUIsOEJBQThCO0lBQzlCLGVBQWUsRUFBQTtBQUduQjtJQUNJLFVBQVU7SUFDVixZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9hY2NvdW50cy10aWxlL2FjY291bnRzLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uYWNjb3VudHMge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtaW4taGVpZ2h0OiAxODBweDtcclxuICAgIHRyYW5zaXRpb246IDFzIGVhc2Utb3V0O1xyXG5cclxuICAgICYtLWF1dG8taGVpZ2h0IHtcclxuICAgICAgICBtaW4taGVpZ2h0OiAwO1xyXG4gICAgfVxyXG5cclxuICAgICZfX3NsaWRlcyB7XHJcbiAgICAgICAgLS1idWxsZXQtYmFja2dyb3VuZC1hY3RpdmU6ICMwMDA7XHJcblxyXG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG4gICAgICAgIGhlaWdodDogMTcwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fc2xpZGUge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBtYXJnaW46IDEwcHggMDtcclxuICAgIH1cclxuXHJcbiAgICAmX19pdGVtIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICB3aWR0aDogMTYwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA1NXB4O1xyXG4gICAgICAgIG1hcmdpbjogNXB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDVweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlLXNtb2tlO1xyXG4gICAgfVxyXG5cclxuICAgICAmX190aXRsZSB7XHJcbiAgICAgICAgIGNvbG9yOiAkY29sb3ItZGltLWdyYXk7XHJcblxyXG4gICAgICAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxMnB4KVxyXG4gICAgIH1cclxuXHJcbiAgICAgJl9fdG90YWwge1xyXG4gICAgICAgICBjb2xvcjogJGNvbG9yLWJsYWNrO1xyXG5cclxuICAgICAgICAgQGluY2x1ZGUgZm9udC1udW5pdG8taGVhdnkoMjBweClcclxuICAgICB9XHJcblxyXG4gICAgJl9fc2tlbGV0b24tcm93IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fc2tlbGV0b24tYWNjb3VudC1jYXJkIHtcclxuICAgICAgICB3aWR0aDogNDglO1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AccountsTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountsTileComponent", function() { return AccountsTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_dashboard_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/dashboard/services */ "./src/app/sections/dashboard/services/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");







var AccountsTileComponent = /** @class */ (function () {
    function AccountsTileComponent(accountsService, router, cdRef) {
        this.accountsService = accountsService;
        this.router = router;
        this.cdRef = cdRef;
        this.slideOpts = {
            initialSlide: 0,
            spaceBetween: 0,
            speed: 400,
            width: 350,
            autoHeight: true,
        };
        this.itemsPerSlide = 4;
        this.slides = [];
        this.isLoading = true;
    }
    AccountsTileComponent.prototype.ngOnInit = function () {
        this.initUserAccounts();
    };
    AccountsTileComponent.prototype.initUserAccounts = function () {
        var _this = this;
        this.accountsService
            .getAccountsFilteredByDisplayTenders()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
            _this.isLoading = false;
            _this.cdRef.detectChanges();
        }))
            .subscribe(function (accounts) {
            while (accounts.length > 0) {
                _this.slides.push(accounts.splice(0, _this.itemsPerSlide));
            }
        });
    };
    AccountsTileComponent.prototype.goToAccountHistory = function (id) {
        this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_5__["PATRON_NAVIGATION"].accounts + "/" + _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].accountDetailsM + "/" + id]);
    };
    AccountsTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-accounts-tile',
            template: __webpack_require__(/*! ./accounts-tile.component.html */ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./accounts-tile.component.scss */ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_dashboard_services__WEBPACK_IMPORTED_MODULE_2__["AccountsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], AccountsTileComponent);
    return AccountsTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.module.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.module.ts ***!
  \*************************************************************************************/
/*! exports provided: AccountsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountsTileModule", function() { return AccountsTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _accounts_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accounts-tile.component */ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.component.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");






var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_pipes__WEBPACK_IMPORTED_MODULE_5__["TransactionUnitsPipeModule"]];
var declarations = [_accounts_tile_component__WEBPACK_IMPORTED_MODULE_4__["AccountsTileComponent"]];
var exports = [_accounts_tile_component__WEBPACK_IMPORTED_MODULE_4__["AccountsTileComponent"]];
var AccountsTileModule = /** @class */ (function () {
    function AccountsTileModule() {
    }
    AccountsTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                imports,
                _shared_pipes__WEBPACK_IMPORTED_MODULE_5__["TransactionUnitsPipeModule"],
            ],
            exports: exports,
        })
    ], AccountsTileModule);
    return AccountsTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/accounts-tile/index.ts":
/*!**********************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/accounts-tile/index.ts ***!
  \**********************************************************************/
/*! exports provided: AccountsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accounts_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accounts-tile.module */ "./src/app/sections/dashboard/containers/accounts-tile/accounts-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccountsTileModule", function() { return _accounts_tile_module__WEBPACK_IMPORTED_MODULE_0__["AccountsTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"conversations\" [ngClass]=\"{'conversations--auto-height': !isLoading}\">\r\n  <ion-list class=\"conversations__sender-list\" *ngIf=\"lastTwoMessagesArray.length && !isLoading\">\r\n    <ion-item\r\n            *ngFor=\"let message of lastTwoMessagesArray\"\r\n            class=\"conversations__sender-item\"\r\n            lines=\"none\">\r\n      <ion-avatar *ngIf=\"showTextAvatar\" class=\"conversations__sender-avatar-wrapper\">\r\n        <div class=\"conversations__sender-avatar-text\">\r\n          {{ getConversationGroupInitial(message.recipient.name) }}\r\n        </div>\r\n      </ion-avatar>\r\n      <div class=\"conversations__sender-info\">\r\n        <div class=\"conversations__sender-name-time-wrapper\">\r\n          <div\r\n                  class=\"conversations__sender-name\"\r\n                  [ngClass]=\"{\r\n              'conversations__sender-name--unread': !message.read_date && message.sender.type !== 'patron'\r\n            }\"\r\n          >\r\n            {{ message.recipient.name }}\r\n          </div>\r\n          <div class=\"conversations__sender-recent-time\">{{ message | messageDate }}</div>\r\n        </div>\r\n        <div class=\"conversations__sender-recent-message\">\r\n          <span *ngIf=\"message.sender.type === 'patron'\">You: </span>{{ message.body }}\r\n        </div>\r\n      </div>\r\n      <ng-container *ngIf=\"!message.read_date && message.sender.type !== 'patron'\"\r\n      >\r\n        <div class=\"conversations__sender-message-indicator-wrapper\">\r\n          <span class=\"indicator\"></span></div\r\n        >\r\n      </ng-container>\r\n    </ion-item>\r\n  </ion-list>\r\n\r\n  <ion-list *ngIf=\"isLoading\">\r\n    <ion-item *ngFor=\"let a of conversationSkeletonArray\">\r\n      <ion-label>\r\n        <div class=\"conversations__skeleton-conversation\">\r\n          <p>\r\n            <ion-skeleton-text animated class=\"conversations__skeleton-avatar\" slot=\"start\"></ion-skeleton-text>\r\n          </p>\r\n          <p class=\"conversations__skeleton-body\">\r\n            <ion-skeleton-text class=\"conversations__skeleton-name\" animated></ion-skeleton-text>\r\n            <ion-skeleton-text class=\"conversations__skeleton-time\" animated></ion-skeleton-text>\r\n            <ion-skeleton-text class=\"conversations__skeleton-msg\" animated></ion-skeleton-text>\r\n          </p>\r\n        </div>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.scss":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.conversations {\n  min-height: 150px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.conversations--auto-height {\n    min-height: 0; }\n.conversations__sender-list {\n    margin: 0;\n    padding: 0; }\n.conversations__sender-item {\n    --padding-start: 0;\n    --inner-padding-start: 0;\n    --inner-padding-end: 0;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n            align-items: center;\n    padding: 10px 0;\n    margin: 0 15px; }\n.conversations__sender-item:first-child {\n      border-bottom: 1px solid #f3f3f3; }\n.conversations__sender-info {\n    width: 100%;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    -webkit-box-align: start;\n            align-items: flex-start;\n    margin-left: 15px; }\n.conversations__sender-avatar-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    min-width: 45px;\n    min-height: 45px; }\n.conversations__sender-avatar-text {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    color: #fff;\n    background: #D0431A;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.conversations__sender-name-time-wrapper {\n    width: 100%;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    flex-wrap: nowrap;\n    -webkit-box-align: center;\n            align-items: center; }\n.conversations__sender-name {\n    max-width: 170px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.conversations__sender-name--unread {\n      font-size: 16px;\n      font-family: \"Nunito Bold\", arial, sans-serif; }\n.conversations__sender-recent-message {\n    width: 100%;\n    color: rgba(0, 0, 0, 0.6);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 12px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.conversations__sender-recent-time {\n    color: rgba(0, 0, 0, 0.6);\n    font-size: 12px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.conversations__sender-message-indicator-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: end;\n            justify-content: flex-end;\n    -webkit-box-align: end;\n            align-items: flex-end;\n    margin-left: 15px; }\n.conversations__skeleton-conversation {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center; }\n.conversations__skeleton-avatar {\n    width: 45px;\n    height: 45px;\n    border-radius: 50%;\n    margin-right: 10px; }\n.conversations__skeleton-body {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    flex-wrap: wrap;\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n    -webkit-box-align: end;\n            align-items: flex-end; }\n.conversations__skeleton-name {\n    height: 20px;\n    width: 40%; }\n.conversations__skeleton-time {\n    width: 20%;\n    height: 12px; }\n.conversations__skeleton-msg {\n    width: 100%;\n    height: 12px; }\n.indicator {\n  background: #166dff;\n  border-radius: 50%;\n  width: 10px;\n  height: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvY29udmVyc2F0aW9ucy10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2NvbnZlcnNhdGlvbnMtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcY29udGFpbmVyc1xcY29udmVyc2F0aW9ucy10aWxlXFxjb252ZXJzYXRpb25zLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2NvbnZlcnNhdGlvbnMtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSxpQkFBaUI7RUFDakIsK0JBQXVCO0VBQXZCLHVCQUF1QixFQUFBO0FBRXZCO0lBQ0ksYUFBYSxFQUFBO0FBR2pCO0lBQ0UsU0FBUztJQUNULFVBQVUsRUFBQTtBQUdaO0lBQ0Usa0JBQWdCO0lBQ2hCLHdCQUFzQjtJQUN0QixzQkFBb0I7SUFFcEIsb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQThCO1lBQTlCLDhCQUE4QjtJQUM5Qix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixjQUFjLEVBQUE7QUFUZjtNQVlHLGdDRHdFcUIsRUFBQTtBQ3BFekI7SUFDRSxXQUFXO0lBQ1gsb0JBQWE7SUFBYixhQUFhO0lBQ2IsNEJBQXNCO0lBQXRCLDZCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIsd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2QixpQkFBaUIsRUFBQTtBQUduQjtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsZ0JBQWdCLEVBQUE7QUFHbEI7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0QyQ2M7SUMxQ2QsbUJEa0VrQztJRXhIcEMsZUR3RG9DO0lDcERwQyxpREYyRXlELEVBQUE7QUNwQnpEO0lBQ0UsV0FBVztJQUNYLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUE4QjtZQUE5Qiw4QkFBOEI7SUFDOUIsaUJBQWlCO0lBQ2pCLHlCQUFtQjtZQUFuQixtQkFBbUIsRUFBQTtBQUdyQjtJQUNFLGdCQUFnQjtJQ2ZsQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQXZEbkIsZUR1RW9DO0lDbkVwQyxpREYyRXlELEVBQUE7QUNOdkQ7TUN6RUYsZUQwRW1DO01DdEVuQyw2Q0Y0RWtELEVBQUE7QUNGbEQ7SUFDRSxXQUFXO0lBQ1gseUJEaUJjO0lFNUNoQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQXZEbkIsZURtRm1DO0lDL0VuQyxnREYwRXVELEVBQUE7QUNRdkQ7SUFDRSx5QkRVYztJRWpHaEIsZUR5Rm1DO0lDckZuQyxnREYwRXVELEVBQUE7QUNjdkQ7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYixxQkFBeUI7WUFBekIseUJBQXlCO0lBQ3pCLHNCQUFxQjtZQUFyQixxQkFBcUI7SUFDckIsaUJBQWlCLEVBQUE7QUFJbkI7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBbUI7WUFBbkIsbUJBQW1CLEVBQUE7QUFHckI7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0IsRUFBQTtBQUdwQjtJQUNFLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUE4QjtZQUE5Qiw4QkFBOEI7SUFDOUIsZUFBZTtJQUNmLG1CQUFZO1lBQVosWUFBWTtJQUNaLHNCQUFxQjtZQUFyQixxQkFBcUIsRUFBQTtBQUd2QjtJQUNFLFlBQVk7SUFDWixVQUFVLEVBQUE7QUFHWjtJQUNFLFVBQVU7SUFDVixZQUFZLEVBQUE7QUFHZDtJQUNFLFdBQVc7SUFDWCxZQUFZLEVBQUE7QUFJaEI7RUFDRSxtQkQzQ3lCO0VDNEN6QixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2NvbnZlcnNhdGlvbnMtdGlsZS9jb252ZXJzYXRpb25zLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4uY29udmVyc2F0aW9ucyB7XHJcbiAgbWluLWhlaWdodDogMTUwcHg7XHJcbiAgdHJhbnNpdGlvbjogMXMgZWFzZS1vdXQ7XHJcblxyXG4gICYtLWF1dG8taGVpZ2h0IHtcclxuICAgICAgbWluLWhlaWdodDogMDtcclxuICB9XHJcblxyXG4gICZfX3NlbmRlci1saXN0IHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5cclxuICAmX19zZW5kZXItaXRlbSB7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xyXG5cclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTBweCAwO1xyXG4gICAgbWFyZ2luOiAwIDE1cHg7XHJcblxyXG4gICAgJjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3Itd2hpdGUtc21va2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19zZW5kZXItaW5mbyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMTVweDtcclxuICB9XHJcblxyXG4gICZfX3NlbmRlci1hdmF0YXItd3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWluLXdpZHRoOiA0NXB4O1xyXG4gICAgbWluLWhlaWdodDogNDVweDtcclxuICB9XHJcblxyXG4gICZfX3NlbmRlci1hdmF0YXItdGV4dCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19zZW5kZXItbmFtZS10aW1lLXdyYXBwZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fc2VuZGVyLW5hbWUge1xyXG4gICAgbWF4LXdpZHRoOiAxNzBweDtcclxuXHJcbiAgICBAaW5jbHVkZSBlbGxpcHNpcztcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE2cHgpO1xyXG5cclxuICAgICYtLXVucmVhZCB7XHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDE2cHgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fc2VuZGVyLXJlY2VudC1tZXNzYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY29sb3I6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjYpO1xyXG5cclxuICAgIEBpbmNsdWRlIGVsbGlwc2lzO1xyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxMnB4KTtcclxuICB9XHJcblxyXG4gICZfX3NlbmRlci1yZWNlbnQtdGltZSB7XHJcbiAgICBjb2xvcjogcmdiYSgkY29sb3ItYmxhY2ssIDAuNik7XHJcblxyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tcmVndWxhcigxMnB4KTtcclxuICB9XHJcblxyXG4gICZfX3NlbmRlci1tZXNzYWdlLWluZGljYXRvci13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgJl9fc2tlbGV0b24tY29udmVyc2F0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tYXZhdGFyIHtcclxuICAgIHdpZHRoOiA0NXB4O1xyXG4gICAgaGVpZ2h0OiA0NXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgZmxleC1ncm93OiAxO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tbmFtZSB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tdGltZSB7XHJcbiAgICB3aWR0aDogMjAlO1xyXG4gICAgaGVpZ2h0OiAxMnB4O1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tbXNnIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMnB4O1xyXG4gIH1cclxufVxyXG5cclxuLmluZGljYXRvciB7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLWRvZGdlci1ibHVlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB3aWR0aDogMTBweDtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: ConversationsTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversationsTileComponent", function() { return ConversationsTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/secure-messaging.service */ "./src/app/sections/dashboard/containers/conversations-tile/services/secure-messaging.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





var ConversationsTileComponent = /** @class */ (function () {
    function ConversationsTileComponent(secureMessagingService, cdRef) {
        this.secureMessagingService = secureMessagingService;
        this.cdRef = cdRef;
        this.messagesArray = [];
        this.sourceSub = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subscription"]();
        this.lastTwoMessagesArray = [];
        this.showTextAvatar = true;
        this.conversationDisplayedAmount = 2;
        this.conversationSkeletonArray = new Array(this.conversationDisplayedAmount);
        this.isLoading = true;
    }
    ConversationsTileComponent.prototype.ngOnInit = function () {
        this.initializePage();
    };
    ConversationsTileComponent.prototype.ngOnDestroy = function () {
        this.sourceSub.unsubscribe();
    };
    ConversationsTileComponent.prototype.getConversationGroupInitial = function (groupName) {
        return groupName == null || groupName.length < 1 ? 'U' : groupName[0];
    };
    ConversationsTileComponent.prototype.initializePage = function () {
        var _this = this;
        this.secureMessagingService
            .getInitialData()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
            _this.isLoading = false;
            _this.cdRef.detectChanges();
        }))
            .subscribe(function (_a) {
            var _b = _a[0], smGroupArray = _b === void 0 ? [] : _b, _c = _a[1], smMessageArray = _c === void 0 ? [] : _c;
            _this.groupsArray = smGroupArray;
            _this.messagesArray = smMessageArray;
            _this.createConversations();
            _this.pollForData();
        });
    };
    ConversationsTileComponent.prototype.pollForData = function () {
        var _this = this;
        this.secureMessagingService
            .pollForData()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
            .subscribe(function (_a) {
            var smGroupArray = _a[0], smMessageArray = _a[1];
            /// if there are new groups, update the list
            if (_this.messagesArray.length !== smGroupArray.length) {
                _this.messagesArray = smMessageArray;
            }
        });
    };
    ConversationsTileComponent.prototype.createConversations = function () {
        var tempConversations = [];
        /// create 'conversations' out of message array
        for (var _i = 0, _a = this.messagesArray; _i < _a.length; _i++) {
            var message = _a[_i];
            message.sent_date = new Date(message.sent_date).toDateString();
            var bNewConversation = true;
            /// add to existing conversation if it exists
            for (var _b = 0, tempConversations_1 = tempConversations; _b < tempConversations_1.length; _b++) {
                var convo = tempConversations_1[_b];
                if (!bNewConversation) {
                    break;
                }
                if (convo.groupIdValue &&
                    convo.groupIdValue.length &&
                    (convo.groupIdValue === message.sender.id_value || convo.groupIdValue === message.recipient.id_value)) {
                    convo.messages.push(message);
                    bNewConversation = false;
                }
            }
            /// create new conversation
            if (bNewConversation) {
                var newGroupName = '';
                var newGroupId = '';
                var newGroupDescription = '';
                if (message.sender.type === 'group') {
                    newGroupName = message.sender.name;
                    newGroupId = message.sender.id_value;
                }
                else {
                    newGroupName = message.recipient.name;
                    newGroupId = message.recipient.id_value;
                }
                newGroupDescription = message.description;
                /// try to get proper group info
                for (var _c = 0, _d = this.groupsArray; _c < _d.length; _c++) {
                    var group = _d[_c];
                    if (group.id === newGroupId) {
                        newGroupName = group.name;
                        newGroupDescription = group.description;
                    }
                }
                var conversation = {
                    institutionId: _services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_2__["SecureMessagingService"].GetSecureMessagesAuthInfo().institution_id,
                    groupName: newGroupName,
                    groupIdValue: newGroupId,
                    groupDescription: newGroupDescription,
                    myIdValue: _services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_2__["SecureMessagingService"].GetSecureMessagesAuthInfo().id_value,
                    messages: [],
                    selected: false,
                };
                conversation.messages.push(message);
                tempConversations.push(conversation);
            }
        }
        this.lastTwoMessagesArray = tempConversations.map(function (conversation) { return conversation.messages.pop(); }).slice(0, 2);
    };
    ConversationsTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-conversations-tile',
            template: __webpack_require__(/*! ./conversations-tile.component.html */ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./conversations-tile.component.scss */ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_2__["SecureMessagingService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], ConversationsTileComponent);
    return ConversationsTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.module.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.module.ts ***!
  \***********************************************************************************************/
/*! exports provided: ConversationsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversationsTileModule", function() { return ConversationsTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _conversations_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./conversations-tile.component */ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.component.ts");
/* harmony import */ var _sections_secure_messaging__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/secure-messaging */ "./src/app/sections/secure-messaging/index.ts");
/* harmony import */ var _services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/secure-messaging.service */ "./src/app/sections/dashboard/containers/conversations-tile/services/secure-messaging.service.ts");
/* harmony import */ var _shared_pipes_message_date__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/pipes/message-date */ "./src/app/shared/pipes/message-date/index.ts");








var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_pipes_message_date__WEBPACK_IMPORTED_MODULE_7__["MessageDatePipeModule"]];
var declarations = [_conversations_tile_component__WEBPACK_IMPORTED_MODULE_4__["ConversationsTileComponent"]];
var exports = [_conversations_tile_component__WEBPACK_IMPORTED_MODULE_4__["ConversationsTileComponent"]];
var ConversationsTileModule = /** @class */ (function () {
    function ConversationsTileModule() {
    }
    ConversationsTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: [_services_secure_messaging_service__WEBPACK_IMPORTED_MODULE_6__["SecureMessagingService"], _sections_secure_messaging__WEBPACK_IMPORTED_MODULE_5__["SecureMessagingApiService"]],
            exports: exports,
        })
    ], ConversationsTileModule);
    return ConversationsTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/index.ts":
/*!***************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/index.ts ***!
  \***************************************************************************/
/*! exports provided: ConversationsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conversations_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversations-tile.module */ "./src/app/sections/dashboard/containers/conversations-tile/conversations-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConversationsTileModule", function() { return _conversations_tile_module__WEBPACK_IMPORTED_MODULE_0__["ConversationsTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/conversations-tile/services/secure-messaging.service.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/conversations-tile/services/secure-messaging.service.ts ***!
  \*******************************************************************************************************/
/*! exports provided: SecureMessagingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingService", function() { return SecureMessagingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/internal/operators/switchMap */ "./node_modules/rxjs/internal/operators/switchMap.js");
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sections_secure_messaging_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/secure-messaging/service */ "./src/app/sections/secure-messaging/service/index.ts");
/* harmony import */ var _core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/utils/regexp-patterns */ "./src/app/core/utils/regexp-patterns.ts");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");







var SecureMessagingService = /** @class */ (function () {
    function SecureMessagingService(authFacadeService, secureMessagingService) {
        this.authFacadeService = authFacadeService;
        this.secureMessagingService = secureMessagingService;
        this.ma_type = 'patron';
        this.refreshTime = 100000;
    }
    SecureMessagingService_1 = SecureMessagingService;
    SecureMessagingService.GetSecureMessagesAuthInfo = function () {
        return SecureMessagingService_1.smAuthInfo;
    };
    SecureMessagingService.prototype.getInitialData = function () {
        var _this = this;
        return this.authFacadeService.getExternalAuthenticationToken$().pipe(Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            _sections_secure_messaging_service__WEBPACK_IMPORTED_MODULE_4__["SecureMessagingApiService"].setJWT(response);
            SecureMessagingService_1.smAuthInfo = JSON.parse(atob(response.split('.')[1]));
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.getSecureMessagesGroups(), _this.getSecureMessages());
        }));
    };
    SecureMessagingService.prototype.sendSecureMessage = function (messageInfo) {
        return this.secureMessagingService.postSecureMessage(messageInfo);
    };
    SecureMessagingService.prototype.getSecureMessages = function () {
        return this.secureMessagingService.getSecureMessages(this.ma_type, SecureMessagingService_1.smAuthInfo.id_field, SecureMessagingService_1.smAuthInfo.id_value);
    };
    SecureMessagingService.prototype.pollForData = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(0, this.refreshTime).pipe(Object(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(_this.getSecureMessagesGroups(), _this.getSecureMessages()); }));
    };
    SecureMessagingService.prototype.getSecureMessagesGroups = function () {
        return this.secureMessagingService.getSecureMessagesGroups(SecureMessagingService_1.smAuthInfo.institution_id);
    };
    SecureMessagingService.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(_core_utils_regexp_patterns__WEBPACK_IMPORTED_MODULE_5__["X_Y_REGEXP"], function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    var SecureMessagingService_1;
    SecureMessagingService = SecureMessagingService_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_6__["AuthFacadeService"],
            _sections_secure_messaging_service__WEBPACK_IMPORTED_MODULE_4__["SecureMessagingApiService"]])
    ], SecureMessagingService);
    return SecureMessagingService;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"explore\" *ngIf=\"favMerchants$ | async as merchants\">\r\n  <ion-list class=\"ion-no-margin ion-no-padding\">\r\n    <ion-item *ngFor=\"let merchant of merchants; let last = last\"\r\n              lines=\"none\"\r\n              (click)=\"onMerchantClicked(merchant.id)\"\r\n              class=\"merchant-card\">\r\n      <ion-label class=\"merchant-card__content\">\r\n        <img class=\"merchant-card__image\"\r\n             [src]=\"merchant.imageThumbnail\r\n         ? awsImageUrl + merchant.imageThumbnail\r\n          : 'assets/images/dashboard_merchant_image_placeholder.svg'\"\r\n             alt=\"merchant image\"/>\r\n        <st-merchant-main-info [isShowMerchantStatus]=\"merchant.isAbleToOrder\"\r\n                               [merchant]=\"merchant\"></st-merchant-main-info>\r\n      </ion-label>\r\n      <ion-ripple-effect type=\"bounded\"></ion-ripple-effect>\r\n    </ion-item>\r\n  </ion-list>\r\n</div>\r\n\r\n<div class=\"explore\" *ngIf=\"isLoading\">\r\n  <ion-list class=\"ion-no-margin ion-no-padding\">\r\n    <ion-item *ngFor=\"let merchant of [0,1]; let last = last\"\r\n              lines=\"none\">\r\n      <ion-label>\r\n        <div class=\"merchant-skeleton\">\r\n          <p>\r\n            <ion-skeleton-text animated class=\"merchant-skeleton__img\" slot=\"start\"></ion-skeleton-text>\r\n          </p>\r\n          <div class=\"merchant-skeleton__content\">\r\n            <ion-skeleton-text class=\"merchant-skeleton__name\" animated></ion-skeleton-text>\r\n            <ion-skeleton-text class=\"merchant-skeleton__distance\" animated></ion-skeleton-text>\r\n            <div class=\"merchant-skeleton__bottom-info-block\">\r\n              <ion-skeleton-text class=\"merchant-skeleton__open-status\" animated></ion-skeleton-text>\r\n              <ion-skeleton-text class=\"merchant-skeleton__order-type\" animated></ion-skeleton-text>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.merchant-card {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n  padding: 10px 0;\n  margin: 0 10px; }\n.merchant-card:first-child {\n    border-bottom: 1px solid #f3f3f3; }\n.merchant-card__image {\n    min-width: 80px;\n    height: 80px;\n    border-radius: 10%;\n    margin-right: 10px;\n    -o-object-fit: cover;\n       object-fit: cover; }\n.merchant-card__content {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    margin: 0; }\n.merchant-skeleton {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center; }\n.merchant-skeleton__img {\n    width: 80px;\n    height: 80px;\n    margin-right: 10px;\n    border-radius: 10%; }\n.merchant-skeleton__name {\n    height: 20px;\n    width: 70%; }\n.merchant-skeleton__distance {\n    height: 15px;\n    width: 35%; }\n.merchant-skeleton__open-status {\n    height: 15px;\n    width: 20%; }\n.merchant-skeleton__order-type {\n    height: 15px;\n    width: 40%; }\n.merchant-skeleton__bottom-info-block {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n            align-items: center; }\n.merchant-skeleton__content {\n    -webkit-box-flex: 1;\n            flex-grow: 1; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvZXhwbG9yZS10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2V4cGxvcmUtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcY29udGFpbmVyc1xcZXhwbG9yZS10aWxlXFxleHBsb3JlLXRpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLGtCQUFnQjtFQUNoQixzQkFBb0I7RUFFcEIsZUFBZTtFQUNmLGNBQWMsRUFBQTtBQUxoQjtJQVFJLGdDRHlGdUIsRUFBQTtBQ3RGekI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsb0JBQWlCO09BQWpCLGlCQUFpQixFQUFBO0FBR25CO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixTQUFTLEVBQUE7QUFJYjtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHlCQUFtQjtVQUFuQixtQkFBbUIsRUFBQTtBQUVuQjtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGtCQUFrQixFQUFBO0FBR3BCO0lBQ0UsWUFBWTtJQUNaLFVBQVUsRUFBQTtBQUdaO0lBQ0UsWUFBWTtJQUNaLFVBQVUsRUFBQTtBQUdaO0lBQ0UsWUFBWTtJQUNaLFVBQVUsRUFBQTtBQUdaO0lBQ0UsWUFBWTtJQUNaLFVBQVUsRUFBQTtBQUdaO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQThCO1lBQTlCLDhCQUE4QjtJQUM5Qix5QkFBbUI7WUFBbkIsbUJBQW1CLEVBQUE7QUFHckI7SUFDRSxtQkFBWTtZQUFaLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2V4cGxvcmUtdGlsZS9leHBsb3JlLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4ubWVyY2hhbnQtY2FyZCB7XHJcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG4gIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XHJcblxyXG4gIHBhZGRpbmc6IDEwcHggMDtcclxuICBtYXJnaW46IDAgMTBweDtcclxuXHJcbiAgJjpmaXJzdC1jaGlsZCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLXdoaXRlLXNtb2tlO1xyXG4gIH1cclxuXHJcbiAgJl9faW1hZ2Uge1xyXG4gICAgbWluLXdpZHRoOiA4MHB4O1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAlO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgfVxyXG5cclxuICAmX19jb250ZW50IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxufVxyXG5cclxuLm1lcmNoYW50LXNrZWxldG9uIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICZfX2ltZyB7XHJcbiAgICB3aWR0aDogODBweDtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcclxuICB9XHJcblxyXG4gICZfX25hbWUge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDcwJTtcclxuICB9XHJcblxyXG4gICZfX2Rpc3RhbmNlIHtcclxuICAgIGhlaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAzNSU7XHJcbiAgfVxyXG5cclxuICAmX19vcGVuLXN0YXR1cyB7XHJcbiAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMjAlO1xyXG4gIH1cclxuXHJcbiAgJl9fb3JkZXItdHlwZSB7XHJcbiAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gIH1cclxuXHJcbiAgJl9fYm90dG9tLWluZm8tYmxvY2sge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAmX19jb250ZW50IHtcclxuICAgIGZsZXgtZ3JvdzogMTtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ExploreTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreTileComponent", function() { return ExploreTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_facades_favourite_merchant_favorite_merchants_facade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/facades/favourite-merchant/favorite-merchants-facade.service */ "./src/app/core/facades/favourite-merchant/favorite-merchants-facade.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_facades_merchant_merchant_facade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/facades/merchant/merchant-facade.service */ "./src/app/core/facades/merchant/merchant-facade.service.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../environment */ "./src/app/environment.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_explore_explore_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/explore/explore.config */ "./src/app/sections/explore/explore.config.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/utils/general-helpers */ "./src/app/core/utils/general-helpers.ts");
/* harmony import */ var _core_facades_menu_merchant_menu_merchant_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/menu-merchant/menu-merchant-facade.service */ "./src/app/core/facades/menu-merchant/menu-merchant-facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");













var ExploreTileComponent = /** @class */ (function () {
    function ExploreTileComponent(merchantFacadeService, favMerchantFacadeService, menuMerchantFacadeService, settingsFacadeService, router) {
        this.merchantFacadeService = merchantFacadeService;
        this.favMerchantFacadeService = favMerchantFacadeService;
        this.menuMerchantFacadeService = menuMerchantFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.router = router;
        this.awsImageUrl = _environment__WEBPACK_IMPORTED_MODULE_5__["Environment"].getImageURL();
        this.isLoading = true;
    }
    ExploreTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this.merchantFacadeService.fetchMerchants$(), this.favMerchantFacadeService.fetchFavoritesMerchants$(), this.menuMerchantFacadeService.fetchMenuMerchant$())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["finalize"])(function () { return (_this.isLoading = false); }))
            .subscribe();
        this.favMerchants$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.merchantFacadeService.merchants$, this.favMerchantFacadeService.favoriteMerchants$, this.menuMerchantFacadeService.menuMerchants$, this.getFoodSetting()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (_a) {
            var merchant = _a[0], fav = _a[1], menuMerchants = _a[2], setting = _a[3];
            var updated = _this.updateMerchantFavoriteInfo(merchant, fav, menuMerchants, setting);
            return Object(_core_utils_general_helpers__WEBPACK_IMPORTED_MODULE_10__["exploreMerchantSorting"])(updated).slice(0, 2);
        }));
    };
    ExploreTileComponent.prototype.onMerchantClicked = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_6__["PATRON_NAVIGATION"].explore, _sections_explore_explore_config__WEBPACK_IMPORTED_MODULE_7__["EXPLORE_ROUTING"].merchantDetails, id])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExploreTileComponent.prototype.updateMerchantFavoriteInfo = function (merchants, favMerchants, menuMerchants, foodEnabledSetting) {
        if (merchants === void 0) { merchants = []; }
        if (favMerchants === void 0) { favMerchants = []; }
        if (menuMerchants === void 0) { menuMerchants = []; }
        var isFoodEnabled = foodEnabledSetting && Boolean(Number(foodEnabledSetting.value));
        var menuIds = menuMerchants.map(function (_a) {
            var id = _a.id;
            return id;
        });
        var favIds = favMerchants.map(function (_a) {
            var id = _a.id;
            return id;
        });
        return merchants.map(function (merchant) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, merchant, { isFavorite: favIds.includes(merchant.id), isAbleToOrder: menuIds.includes(merchant.id) && isFoodEnabled })); });
    };
    ExploreTileComponent.prototype.getFoodSetting = function () {
        return this.settingsFacadeService.getSetting(_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.FOOD_ENABLED);
    };
    ExploreTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-explore-tile',
            template: __webpack_require__(/*! ./explore-tile.component.html */ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.html"),
            styles: [__webpack_require__(/*! ./explore-tile.component.scss */ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_facades_merchant_merchant_facade_service__WEBPACK_IMPORTED_MODULE_4__["MerchantFacadeService"],
            _core_facades_favourite_merchant_favorite_merchants_facade_service__WEBPACK_IMPORTED_MODULE_2__["FavoriteMerchantsFacadeService"],
            _core_facades_menu_merchant_menu_merchant_facade_service__WEBPACK_IMPORTED_MODULE_11__["MenuMerchantFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_12__["SettingsFacadeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]])
    ], ExploreTileComponent);
    return ExploreTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/explore-tile/explore-tile.module.ts ***!
  \***********************************************************************************/
/*! exports provided: ExploreTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreTileModule", function() { return ExploreTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _explore_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./explore-tile.component */ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.component.ts");
/* harmony import */ var _shared_ui_components_merchant_main_info_merchant_main_info_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/ui-components/merchant-main-info/merchant-main-info.module */ "./src/app/shared/ui-components/merchant-main-info/merchant-main-info.module.ts");






var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
var declarations = [_explore_tile_component__WEBPACK_IMPORTED_MODULE_4__["ExploreTileComponent"]];
var exports = [_explore_tile_component__WEBPACK_IMPORTED_MODULE_4__["ExploreTileComponent"]];
var ExploreTileModule = /** @class */ (function () {
    function ExploreTileModule() {
    }
    ExploreTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                imports,
                _shared_ui_components_merchant_main_info_merchant_main_info_module__WEBPACK_IMPORTED_MODULE_5__["MerchantMainInfoModule"],
            ],
            exports: exports,
        })
    ], ExploreTileModule);
    return ExploreTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/explore-tile/index.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/explore-tile/index.ts ***!
  \*********************************************************************/
/*! exports provided: ExploreTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _explore_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./explore-tile.module */ "./src/app/sections/dashboard/containers/explore-tile/explore-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExploreTileModule", function() { return _explore_tile_module__WEBPACK_IMPORTED_MODULE_0__["ExploreTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL2hvdXNpbmctdGlsZS9ob3VzaW5nLXRpbGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.ts ***!
  \**************************************************************************************/
/*! exports provided: HousingTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingTileComponent", function() { return HousingTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HousingTileComponent = /** @class */ (function () {
    function HousingTileComponent() {
    }
    HousingTileComponent.prototype.ngOnInit = function () { };
    HousingTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-housing-tile',
            template: __webpack_require__(/*! ./housing-tile.component.html */ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./housing-tile.component.scss */ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HousingTileComponent);
    return HousingTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/housing-tile/housing-tile.module.ts ***!
  \***********************************************************************************/
/*! exports provided: imports, declarations, HousingTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imports", function() { return imports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declarations", function() { return declarations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HousingTileModule", function() { return HousingTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _housing_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./housing-tile.component */ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.component.ts");





var imports = [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]];
var declarations = [_housing_tile_component__WEBPACK_IMPORTED_MODULE_4__["HousingTileComponent"]];
var HousingTileModule = /** @class */ (function () {
    function HousingTileModule() {
    }
    HousingTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            exports: declarations,
            declarations: declarations,
        })
    ], HousingTileModule);
    return HousingTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL21lYWwtZG9uYXRpb25zLXRpbGUvbWVhbC1kb25hdGlvbnMtdGlsZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: MealDonationsTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsTileComponent", function() { return MealDonationsTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MealDonationsTileComponent = /** @class */ (function () {
    function MealDonationsTileComponent() {
    }
    MealDonationsTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-meal-donations-tile',
            template: __webpack_require__(/*! ./meal-donations-tile.component.html */ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./meal-donations-tile.component.scss */ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.scss")]
        })
    ], MealDonationsTileComponent);
    return MealDonationsTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.module.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: MealDonationsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MealDonationsTileModule", function() { return MealDonationsTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _meal_donations_tile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meal-donations-tile.component */ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.component.ts");




var MealDonationsTileModule = /** @class */ (function () {
    function MealDonationsTileModule() {
    }
    MealDonationsTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [_meal_donations_tile_component__WEBPACK_IMPORTED_MODULE_3__["MealDonationsTileComponent"]],
            exports: [_meal_donations_tile_component__WEBPACK_IMPORTED_MODULE_3__["MealDonationsTileComponent"]]
        })
    ], MealDonationsTileModule);
    return MealDonationsTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/index.ts":
/*!***************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/index.ts ***!
  \***************************************************************************/
/*! exports provided: MobileAccessTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mobile_access_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-access-tile.module */ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessTileModule", function() { return _mobile_access_tile_module__WEBPACK_IMPORTED_MODULE_0__["MobileAccessTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"access\" [ngClass]=\"{ 'access--auto-height': !isLoadingData }\">\r\n  <ion-list class=\"skeleton\" *ngIf=\"isLoadingData\">\r\n    <ion-item *ngFor=\"let i of skeletonArray\">\r\n      <ion-skeleton-text animated style=\"width: 27px; height: 27px\" slot=\"start\"></ion-skeleton-text>\r\n      <ion-label>\r\n        <ion-skeleton-text animated style=\"width: 80%\"></ion-skeleton-text>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n  <ng-container *ngIf=\"accessList$ | async as mlist\">\r\n    <ion-list\r\n            *ngIf=\"!isLoadingData && mlist.length\"\r\n            class=\"access__list\"\r\n            [ngClass]=\"{ 'access----auto-height': !isLoadingData }\"\r\n    >\r\n      <ion-item\r\n              class=\"access__item\"\r\n              mode=\"ios\"\r\n              lines=\"none\"\r\n              *ngFor=\"let access of mlist\"\r\n              (click)=\"navigateTo(access.locationId)\"\r\n      >\r\n        <img\r\n                class=\"access__item-icon\"\r\n                [src]=\"!access.isFavourite ? '/assets/icon/star-outline.svg' : '/assets/icon/star-filled.svg'\"\r\n                alt=\"favourite icon\"\r\n        />\r\n        <div class=\"access__item-lable\">{{ access.locationId }} - {{ access.name }}</div>\r\n      </ion-item>\r\n    </ion-list>\r\n  </ng-container>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.scss":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.access {\n  margin: 0 15px;\n  overflow: hidden;\n  min-height: 180px;\n  max-height: 220px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.access--auto-height {\n    min-height: 0; }\n.access__list {\n    margin: 0;\n    padding: 0; }\n.access__item {\n    --padding-start: 0;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    border-bottom: 1px solid #f3f3f3;\n    margin: 0; }\n.access__item:last-child {\n      border-style: none; }\n.access__item-icon {\n    width: 20px;\n    height: 20px; }\n.access__item-lable {\n    margin-left: 10px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 14px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvbW9iaWxlLWFjY2Vzcy10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL21vYmlsZS1hY2Nlc3MtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcY29udGFpbmVyc1xcbW9iaWxlLWFjY2Vzcy10aWxlXFxtb2JpbGUtYWNjZXNzLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL21vYmlsZS1hY2Nlc3MtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsK0JBQXVCO0VBQXZCLHVCQUF1QixFQUFBO0FBRXZCO0lBQ0UsYUFBYSxFQUFBO0FBR2Y7SUFDRSxTQUFTO0lBQ1QsVUFBVSxFQUFBO0FBR1o7SUFDRSxrQkFBZ0I7SUFFaEIsb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixnQ0Q0RXVCO0lDM0V2QixTQUFTLEVBQUE7QUFOVjtNQVNHLGtCQUFrQixFQUFBO0FBSXRCO0lBQ0UsV0FBVztJQUNYLFlBQVksRUFBQTtBQUdkO0lBQ0UsaUJBQWlCO0lDaUJuQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQXZEbkIsZUR1Q29DO0lDbkNwQyxpREYyRXlELEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9tb2JpbGUtYWNjZXNzLXRpbGUvbW9iaWxlLWFjY2Vzcy10aWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLmFjY2VzcyB7XHJcbiAgbWFyZ2luOiAwIDE1cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBtaW4taGVpZ2h0OiAxODBweDtcclxuICBtYXgtaGVpZ2h0OiAyMjBweDtcclxuICB0cmFuc2l0aW9uOiAxcyBlYXNlLW91dDtcclxuXHJcbiAgJi0tYXV0by1oZWlnaHQge1xyXG4gICAgbWluLWhlaWdodDogMDtcclxuICB9XHJcblxyXG4gICZfX2xpc3Qge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICB9XHJcblxyXG4gICZfX2l0ZW0ge1xyXG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xyXG5cclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRjb2xvci13aGl0ZS1zbW9rZTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIFxyXG4gICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgYm9yZGVyLXN0eWxlOiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9faXRlbS1pY29uIHtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9faXRlbS1sYWJsZSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuXHJcbiAgICBAaW5jbHVkZSBlbGxpcHNpcztcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDE0cHgpO1xyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: MobileAccessTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessTileComponent", function() { return MobileAccessTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_mobile_access_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/mobile-access.service */ "./src/app/sections/dashboard/containers/mobile-access-tile/services/mobile-access.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_mobile_access_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/mobile-access/mobile-acces.config */ "./src/app/sections/mobile-access/mobile-acces.config.ts");







var MobileAccessTileComponent = /** @class */ (function () {
    function MobileAccessTileComponent(mobileAccessService, router, cdRef) {
        this.mobileAccessService = mobileAccessService;
        this.router = router;
        this.cdRef = cdRef;
        this.isLoadingData = true;
        this.maxAmount = 4;
        this.skeletonArray = new Array(this.maxAmount);
    }
    MobileAccessTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accessList$ = this.mobileAccessService
            .getLocations()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (locations) { return locations.slice(0, _this.maxAmount); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
            _this.isLoadingData = false;
            _this.cdRef.detectChanges();
        }));
    };
    MobileAccessTileComponent.prototype.navigateTo = function (locationId) {
        this.router.navigate(["/" + _app_global__WEBPACK_IMPORTED_MODULE_5__["PATRON_NAVIGATION"].mobileAccess + "/" + _sections_mobile_access_mobile_acces_config__WEBPACK_IMPORTED_MODULE_6__["LOCAL_ROUTING"].activate + "/" + locationId]);
    };
    MobileAccessTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-mobile-access-tile',
            template: __webpack_require__(/*! ./mobile-access-tile.component.html */ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./mobile-access-tile.component.scss */ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_mobile_access_service__WEBPACK_IMPORTED_MODULE_3__["MobileAccessService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], MobileAccessTileComponent);
    return MobileAccessTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.module.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.module.ts ***!
  \***********************************************************************************************/
/*! exports provided: MobileAccessTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessTileModule", function() { return MobileAccessTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _mobile_access_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mobile-access-tile.component */ "./src/app/sections/dashboard/containers/mobile-access-tile/mobile-access-tile.component.ts");
/* harmony import */ var _services_mobile_access_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/mobile-access.service */ "./src/app/sections/dashboard/containers/mobile-access-tile/services/mobile-access.service.ts");






var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
var declarations = [_mobile_access_tile_component__WEBPACK_IMPORTED_MODULE_4__["MobileAccessTileComponent"]];
var exports = [_mobile_access_tile_component__WEBPACK_IMPORTED_MODULE_4__["MobileAccessTileComponent"]];
var MobileAccessTileModule = /** @class */ (function () {
    function MobileAccessTileModule() {
    }
    MobileAccessTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: [_services_mobile_access_service__WEBPACK_IMPORTED_MODULE_5__["MobileAccessService"]],
            exports: exports,
        })
    ], MobileAccessTileModule);
    return MobileAccessTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/mobile-access-tile/services/mobile-access.service.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/mobile-access-tile/services/mobile-access.service.ts ***!
  \****************************************************************************************************/
/*! exports provided: MobileAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileAccessService", function() { return MobileAccessService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/service/coords/coords.service */ "./src/app/core/service/coords/coords.service.ts");
/* harmony import */ var _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/interceptors/query-config.model */ "./src/app/core/interceptors/query-config.model.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../app.global */ "./src/app/app.global.ts");










var MobileAccessService = /** @class */ (function () {
    function MobileAccessService(http, userFacadeService, settingsFacadeService, coords) {
        this.http = http;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.coords = coords;
        this.serviceUrl = '/json/commerce';
        this.locations$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.locationsInfo = [];
    }
    Object.defineProperty(MobileAccessService.prototype, "locations", {
        get: function () {
            return this.locations$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MobileAccessService.prototype, "_locations", {
        set: function (locations) {
            this.locationsInfo = locations.slice();
            this.locations$.next(this.locationsInfo.slice());
        },
        enumerable: true,
        configurable: true
    });
    MobileAccessService.prototype.getLocations = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.getMobileLocations(), this.getFavouritesLocations()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var locations = _a[0], favourites = _a[1];
            return (_this._locations = _this.getLocationsMultiSorted(locations, favourites));
        }));
    };
    MobileAccessService.prototype.getMobileLocations = function () {
        var _this = this;
        var filters = ['Normal', 'TempCode', 'Attendance'];
        var postParams = { filters: filters };
        return this.coords.getCoords().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (geoData) {
            var geoParam = {
                latitude: geoData.coords.latitude,
                longitude: geoData.coords.longitude,
                accuracy: geoData.coords.accuracy,
            };
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('getMobileLocations', tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, postParams, geoParam), true);
            return _this.http.post(_this.serviceUrl, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return response;
        }));
    };
    MobileAccessService.prototype.getLocationById = function (locationId) {
        return this.locations.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (locations) { return locations.filter(function (location) { return location.locationId === locationId; })[0]; }));
    };
    MobileAccessService.prototype.getFavouritesLocations = function () {
        var _this = this;
        return this.settingsFacadeService.getUserSetting(_app_global__WEBPACK_IMPORTED_MODULE_9__["User"].Settings.MOBILE_ACCESS_FAVORITES).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var value = _a.value;
            return (_this.favourites = _this.parseArrayFromString(value));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () {
            _this.favourites = [];
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([]);
        }));
    };
    MobileAccessService.prototype.activateMobileLocation = function (locationId, sourceInfo) {
        var _this = this;
        if (sourceInfo === void 0) { sourceInfo = null; }
        return this.coords.getCoords().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (geoData) { return _this.createMobileLocationParams(locationId, geoData.coords, sourceInfo); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (postParams) {
            var queryConfig = new _core_interceptors_query_config_model__WEBPACK_IMPORTED_MODULE_6__["RPCQueryConfig"]('activateMobileLocation', postParams, true);
            return _this.http.post(_this.serviceUrl, queryConfig);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var response = _a.response, exception = _a.exception;
            if (exception !== null) {
                throw new Error(exception);
            }
            return response;
        }));
    };
    MobileAccessService.prototype.addFavouriteFieldToLocations = function (locations, favourites) {
        var _this = this;
        return locations.map(function (location) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, location, { isFavourite: _this.isFavouriteLocation(location.locationId, favourites) })); });
    };
    MobileAccessService.prototype.getLocationsMultiSorted = function (locations, favourites) {
        var locationListWithFavourites = this.addFavouriteFieldToLocations(locations, favourites);
        var locationsSortedByScores = locationListWithFavourites.slice().sort(this.sortByHighestScore);
        return locationsSortedByScores.sort(this.sortByFavourites);
    };
    MobileAccessService.prototype.isFavouriteLocation = function (locationId, favourites) {
        return favourites.indexOf(locationId) !== -1;
    };
    MobileAccessService.prototype.sortByHighestScore = function (_a, _b) {
        var a = _a.score;
        var b = _b.score;
        return a && b ? b - a : 0;
    };
    MobileAccessService.prototype.sortByFavourites = function (_a, _b) {
        var a = _a.isFavourite;
        var b = _b.isFavourite;
        return Number(b) - Number(a);
    };
    MobileAccessService.prototype.parseArrayFromString = function (str) {
        var array = JSON.parse(str);
        return Array.isArray(array) ? array : [];
    };
    MobileAccessService.prototype.createMobileLocationParams = function (locationId, geoData, sourceInfo) {
        var latitude = !geoData.latitude ? null : geoData.latitude;
        var longitude = !geoData.longitude ? null : geoData.longitude;
        var accuracy = !geoData.accuracy ? null : geoData.accuracy;
        var altitude = !geoData.altitude ? null : geoData.altitude;
        var altitudeAccuracy = !geoData.altitudeAccuracy ? null : geoData.altitudeAccuracy;
        var heading = !geoData.heading ? null : geoData.heading;
        var speed = !geoData.speed ? null : geoData.speed;
        return {
            locationId: locationId,
            tranDate: new Date().toISOString(),
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            altitude: altitude,
            altitudeAccuracy: altitudeAccuracy,
            speed: speed,
            heading: heading,
            sourceInfo: sourceInfo,
        };
    };
    MobileAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_7__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_8__["SettingsFacadeService"],
            _core_service_coords_coords_service__WEBPACK_IMPORTED_MODULE_5__["CoordsService"]])
    ], MobileAccessService);
    return MobileAccessService;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/order-tile/index.ts":
/*!*******************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/order-tile/index.ts ***!
  \*******************************************************************/
/*! exports provided: OrderTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-tile.module */ "./src/app/sections/dashboard/containers/order-tile/order-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrderTileModule", function() { return _order_tile_module__WEBPACK_IMPORTED_MODULE_0__["OrderTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/order-tile/order-tile.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"order\" [ngClass]=\"{'order--auto-height': !isLoading}\">\r\n  <ion-slides *ngIf=\"!isLoading && slides.length\" mode=\"ios\" [options]=\"slideOpts\" class=\"order__slides\">\r\n    <ion-slide *ngFor=\"let merchantSlide of slides\" class=\"order__slide\">\r\n      <div class=\"order__card\" (click)=\"goToMerchant(merchant)\" *ngFor=\"let merchant of merchantSlide\">\r\n        <img *ngIf=\"merchant.imageThumbnail\" class=\"order__card-photo\"\r\n             src=\"{{ awsImageUrl + merchant.imageThumbnail }}\"\r\n             alt=\"merchant image\"/>\r\n        <img *ngIf=\"!merchant.imageThumbnail\" class=\"order__card-photo\"\r\n             src=\"/assets/images/dashboard_merchant_image_placeholder.svg\"\r\n             alt=\"merchant image\"/>\r\n        <div class=\"order__favorite-wrapper\">\r\n          <img class=\"order__favorite-icon\" src=\"/assets/icon/star-filled.svg\" alt=\"star icon\"/>\r\n        </div>\r\n        <div class=\"order__card-title-wrapper\">\r\n          <div class=\"order__card-title\">{{ merchant.name }}</div>\r\n        </div>\r\n      </div>\r\n    </ion-slide>\r\n  </ion-slides>\r\n\r\n  <ion-list *ngIf=\"isLoading\" class=\"order__skeleton-list\">\r\n    <ion-item *ngFor=\"let i of skeletonArray\" lines=\"none\">\r\n      <ion-label class=\"ion-no-margin\">\r\n        <ion-skeleton-text animated class=\"order__skeleton-card\"></ion-skeleton-text>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/order-tile/order-tile.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.order {\n  overflow: hidden;\n  min-height: 180px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.order--auto-height {\n    min-height: 0; }\n.order__slides {\n    margin: 0;\n    padding: 10px 0; }\n.order__slide {\n    width: 330px !important; }\n.order__card {\n    position: relative;\n    width: 160px;\n    height: 160px;\n    margin: 5px; }\n.order__card-photo {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px; }\n.order__favorite-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    border-radius: 50%;\n    background: #fff;\n    position: absolute;\n    top: 6px;\n    right: 6px;\n    width: 35px;\n    height: 35px; }\n.order__favorite-icon {\n    height: 20px;\n    width: 20px; }\n.order__card-title-wrapper {\n    position: absolute;\n    bottom: 0;\n    background: #00000080;\n    padding: 10px;\n    width: 100%;\n    border-bottom-left-radius: 7px;\n    border-bottom-right-radius: 7px; }\n.order__card-title {\n    color: #fff;\n    text-align: left;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 14px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.order__skeleton-card {\n    display: inline-block;\n    width: 160px;\n    height: 160px; }\n.order__skeleton-list {\n    display: -webkit-box;\n    display: flex;\n    padding: 0;\n    justify-content: space-around; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvb3JkZXItdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9vcmRlci10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcYXBwXFxzZWN0aW9uc1xcZGFzaGJvYXJkXFxjb250YWluZXJzXFxvcmRlci10aWxlXFxvcmRlci10aWxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9vcmRlci10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsK0JBQXVCO0VBQXZCLHVCQUF1QixFQUFBO0FBRXZCO0lBQ0ksYUFBYSxFQUFBO0FBR2pCO0lBQ0UsU0FBUztJQUNULGVBQWUsRUFBQTtBQUdqQjtJQUNFLHVCQUF1QixFQUFBO0FBR3pCO0lBQ0Usa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsV0FBVyxFQUFBO0FBR2I7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLG9CQUFpQjtPQUFqQixpQkFBaUI7SUFDakIsa0JBQWtCLEVBQUE7QUFHcEI7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGdCRDBEYztJQ3pEZCxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFVBQVU7SUFDVixXQUFXO0lBQ1gsWUFBWSxFQUFBO0FBR2Q7SUFDRSxZQUFZO0lBQ1osV0FBVyxFQUFBO0FBR2I7SUFDRSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsV0FBVztJQUNYLDhCQUE4QjtJQUM5QiwrQkFBK0IsRUFBQTtBQUdqQztJQUNFLFdEa0NjO0lDakNkLGdCQUFnQjtJQ1ZsQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQXZEbkIsZURrRW9DO0lDOURwQyxpREYyRXlELEVBQUE7QUNWekQ7SUFDRSxxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGFBQWEsRUFBQTtBQUdmO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IsVUFBVTtJQUNWLDZCQUE2QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvb3JkZXItdGlsZS9vcmRlci10aWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLm9yZGVyIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIG1pbi1oZWlnaHQ6IDE4MHB4O1xyXG4gIHRyYW5zaXRpb246IDFzIGVhc2Utb3V0O1xyXG5cclxuICAmLS1hdXRvLWhlaWdodCB7XHJcbiAgICAgIG1pbi1oZWlnaHQ6IDA7XHJcbiAgICB9XHJcblxyXG4gICZfX3NsaWRlcyB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgfVxyXG5cclxuICAmX19zbGlkZSB7XHJcbiAgICB3aWR0aDogMzMwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gICZfX2NhcmQge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDE2MHB4O1xyXG4gICAgaGVpZ2h0OiAxNjBweDtcclxuICAgIG1hcmdpbjogNXB4O1xyXG4gIH1cclxuXHJcbiAgJl9fY2FyZC1waG90byB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fZmF2b3JpdGUtd3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA2cHg7XHJcbiAgICByaWdodDogNnB4O1xyXG4gICAgd2lkdGg6IDM1cHg7XHJcbiAgICBoZWlnaHQ6IDM1cHg7XHJcbiAgfVxyXG5cclxuICAmX19mYXZvcml0ZS1pY29uIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fY2FyZC10aXRsZS13cmFwcGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGJhY2tncm91bmQ6ICMwMDAwMDA4MDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDdweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA3cHg7XHJcbiAgfVxyXG5cclxuICAmX19jYXJkLXRpdGxlIHtcclxuICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICAgIEBpbmNsdWRlIGVsbGlwc2lzO1xyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTRweCk7XHJcbiAgfVxyXG5cclxuICAmX19za2VsZXRvbi1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdpZHRoOiAxNjBweDtcclxuICAgIGhlaWdodDogMTYwcHg7XHJcbiAgfVxyXG5cclxuICAmX19za2VsZXRvbi1saXN0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgfVxyXG59XHJcbiIsIkBtaXhpbiBmb250LXNpemUoJGZvbnQtc2l6ZSkge1xyXG4gIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtZmFtaWx5KCRmb250LWZhbWlseSkge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1yZWd1bGFyKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXJlZ3VsYXIpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tc2VtaWJvbGQoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tc2VtaWJvbGQpO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8taGVhdnkoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8taGVhdnkpO1xyXG59XHJcblxyXG5AbWl4aW4gbGluay1jb2xvcigkY29sb3IpIHtcclxuICBjb2xvcjogJGNvbG9yO1xyXG5cclxuICAmOmxpbmssXHJcbiAgJjp2aXNpdGVkLFxyXG4gICY6Zm9jdXMsXHJcbiAgJjpob3ZlcixcclxuICAmOmFjdGl2ZSB7XHJcbiAgICBjb2xvcjogJGNvbG9yO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGhvdmVyIHtcclxuICAmOmhvdmVyLFxyXG4gICY6Zm9jdXMge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZGlzYWJsZWQge1xyXG4gICYuZGlzYWJsZWQsXHJcbiAgJi5kaXNhYmxlZDpmb2N1cyxcclxuICAmLmRpc2FibGVkOmhvdmVyLFxyXG4gICZbZGlzYWJsZWRdLFxyXG4gICZbZGlzYWJsZWRdOmZvY3VzLFxyXG4gICZbZGlzYWJsZWRdOmhvdmVyIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGVsbGlwc2lzIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbkBtaXhpbiBmbG9hdGluZy1sYWJlbCgkY29sb3IpIHtcclxuICBmb250LXNpemU6IDc1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDE1JSwgLTUwJSwgMCk7XHJcbiAgb3BhY2l0eTogMTtcclxuICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgcGFkZGluZzogMCAzcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24oKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci13aGl0ZTtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi5zdmcnKTtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICByaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gICAgaGVpZ2h0OiA5cHg7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWFjdGl2ZSgpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWFjdGl2ZS5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1lcnJvcigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLWVycm9yLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/order-tile/order-tile.component.ts ***!
  \**********************************************************************************/
/*! exports provided: OrderTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTileComponent", function() { return OrderTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var src_app_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/environment */ "./src/app/environment.ts");







var OrderTileComponent = /** @class */ (function () {
    function OrderTileComponent(merchantService, cdRef, router) {
        this.merchantService = merchantService;
        this.cdRef = cdRef;
        this.router = router;
        this.slideOpts = {
            initialSlide: 0,
            spaceBetween: 0,
            speed: 400,
            width: 330,
            autoHeight: true,
        };
        this.awsImageUrl = src_app_environment__WEBPACK_IMPORTED_MODULE_6__["Environment"].getImageURL();
        this.amountPerSlide = 2;
        this.slides = [];
        this.skeletonArray = new Array(this.amountPerSlide);
        this.isLoading = true;
    }
    OrderTileComponent.prototype.ngOnInit = function () {
        this.initMerchantSlides();
    };
    OrderTileComponent.prototype.initMerchantSlides = function () {
        var _this = this;
        this.merchantService
            .getMerchantsWithFavoriteInfo()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
            _this.isLoading = false;
            _this.cdRef.detectChanges();
        }))
            .subscribe(function (merchants) {
            var favMerchants = merchants.filter(function (_a) {
                var isFavorite = _a.isFavorite;
                return isFavorite;
            });
            while (favMerchants.length > 0) {
                _this.slides.push(favMerchants.splice(0, _this.amountPerSlide));
            }
        });
    };
    OrderTileComponent.prototype.goToMerchant = function (_a) {
        var merchantId = _a.id;
        this.router.navigate([_app_global__WEBPACK_IMPORTED_MODULE_5__["PATRON_NAVIGATION"].ordering], { queryParams: { merchantId: merchantId } });
    };
    OrderTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-order-tile',
            template: __webpack_require__(/*! ./order-tile.component.html */ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./order-tile.component.scss */ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_ordering__WEBPACK_IMPORTED_MODULE_2__["MerchantService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], OrderTileComponent);
    return OrderTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/order-tile/order-tile.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/order-tile/order-tile.module.ts ***!
  \*******************************************************************************/
/*! exports provided: OrderTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderTileModule", function() { return OrderTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _order_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order-tile.component */ "./src/app/sections/dashboard/containers/order-tile/order-tile.component.ts");
/* harmony import */ var _sections_ordering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/ordering */ "./src/app/sections/ordering/index.ts");
/* harmony import */ var _sections_ordering_services_ordering_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/ordering/services/ordering.api.service */ "./src/app/sections/ordering/services/ordering.api.service.ts");







var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
var declarations = [_order_tile_component__WEBPACK_IMPORTED_MODULE_4__["OrderTileComponent"]];
var providers = [_sections_ordering__WEBPACK_IMPORTED_MODULE_5__["MerchantService"], _sections_ordering_services_ordering_api_service__WEBPACK_IMPORTED_MODULE_6__["OrderingApiService"]];
var exports = [_order_tile_component__WEBPACK_IMPORTED_MODULE_4__["OrderTileComponent"]];
var OrderTileModule = /** @class */ (function () {
    function OrderTileModule() {
    }
    OrderTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: providers,
            exports: exports,
        })
    ], OrderTileModule);
    return OrderTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/index.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/index.ts ***!
  \*********************************************************************/
/*! exports provided: RewardsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rewards_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rewards-tile.module */ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RewardsTileModule", function() { return _rewards_tile_module__WEBPACK_IMPORTED_MODULE_0__["RewardsTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"rewards\" [ngClass]=\"{'rewards--auto-height': !isLoadingData}\">\r\n  <ion-list *ngIf=\"isLoadingData\">\r\n    <ion-item lines=\"none\" class=\"skeleton\">\r\n      <ion-label>\r\n        <p>\r\n          <ion-skeleton-text animated class=\"skeleton__level\"></ion-skeleton-text>\r\n        </p>\r\n        <p>\r\n          <ion-skeleton-text animated class=\"skeleton__progress\"></ion-skeleton-text>\r\n        </p>\r\n        <p class=\"skeleton__align-right\">\r\n          <ion-skeleton-text animated class=\"skeleton__next-level\"></ion-skeleton-text>\r\n        </p>\r\n        <p class=\"skeleton__align-center\">\r\n          <ion-skeleton-text animated class=\"skeleton__next-level\"></ion-skeleton-text>\r\n        </p>\r\n        <p class=\"skeleton__align-center\">\r\n          <ion-skeleton-text animated class=\"skeleton__points\"></ion-skeleton-text>\r\n        </p>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n  <ng-container *ngIf=\"(rewardTrackInfo$ | async)?.hasLevels && !isLoadingData\">\r\n    <st-progress-bar [currentPointsSpent]=\"userPointsSpent$ | async\"\r\n                     [currentLevelInfo]=\"currentLvlInfo$ | async\"\r\n                     [nextLevelPoints]=\"nextLvlRequirePoints$ | async\"></st-progress-bar>\r\n    <div class=\"progress__balance-wrapper\">\r\n      <p class=\"progress__balance-title\">Your balance</p>\r\n      <div class=\"progress__balance-points\">\r\n        <span class=\"progress__balance-points-digit\">{{ userPointsSpent$ | async }}</span> points\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.rewards {\n  padding: 25px 30px;\n  min-height: 150px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.rewards--auto-height {\n    min-height: 0; }\n.rewards .progress__experience {\n    margin: 0;\n    padding: 5px 10px;\n    text-align: right;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.rewards .progress__level {\n    margin: 0;\n    padding: 5px 10px;\n    font-size: 20px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.rewards .progress__balance-wrapper {\n    text-align: center;\n    color: #6e6e6e; }\n.rewards .progress__balance-title {\n    margin: 0;\n    text-transform: uppercase;\n    font-size: 13px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.rewards .progress__balance-points {\n    margin: 5px;\n    font-size: 24px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.rewards .progress__balance-points-digit {\n    color: #000;\n    font-size: 24px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.skeleton__align-center {\n  text-align: center; }\n.skeleton__align-right {\n  text-align: right; }\n.skeleton__level {\n  width: 40%;\n  height: 20px; }\n.skeleton__progress {\n  width: 100%;\n  height: 18px; }\n.skeleton__next-level {\n  width: 30%;\n  height: 15px;\n  display: inline-block; }\n.skeleton__next-level-msg {\n  display: inline-block;\n  height: 14px;\n  width: 30%; }\n.skeleton__points {\n  display: inline-block;\n  height: 20px;\n  width: 60%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvcmV3YXJkcy10aWxlL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL3Jld2FyZHMtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcY29udGFpbmVyc1xccmV3YXJkcy10aWxlXFxyZXdhcmRzLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL3Jld2FyZHMtdGlsZS9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLCtCQUF1QjtFQUF2Qix1QkFBdUIsRUFBQTtBQUV2QjtJQUNFLGFBQWEsRUFBQTtBQU5qQjtJQVdNLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsaUJBQWlCO0lDZHJCLGVEZ0JzQztJQ1p0QyxpREYyRXlELEVBQUE7QUM5RTNEO0lBbUJNLFNBQVM7SUFDVCxpQkFBaUI7SUNyQnJCLGVEdUJzQztJQ25CdEMsaURGMkV5RCxFQUFBO0FDOUUzRDtJQTBCTSxrQkFBa0I7SUFDbEIsY0Q2RGtCLEVBQUE7QUN4RnhCO0lBK0JNLFNBQVM7SUFDVCx5QkFBeUI7SUNqQzdCLGVEbUNxQztJQy9CckMsZ0RGMEV1RCxFQUFBO0FDN0V6RDtJQXNDTSxXQUFXO0lDdkNmLGVEeUNzQztJQ3JDdEMsaURGMkV5RCxFQUFBO0FDOUUzRDtJQTRDTSxXRG9EWTtJRWpHaEIsZUQrQ21DO0lDM0NuQyw2Q0Y0RWtELEVBQUE7QUMzQmxEO0VBQ0Usa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxpQkFBaUIsRUFBQTtBQUduQjtFQUNFLFVBQVU7RUFDVixZQUFZLEVBQUE7QUFHZDtFQUNFLFdBQVc7RUFDWCxZQUFZLEVBQUE7QUFHZDtFQUNFLFVBQVU7RUFDVixZQUFZO0VBQ1oscUJBQXFCLEVBQUE7QUFHdkI7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFVBQVUsRUFBQTtBQUdaO0VBQ0UscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWixVQUFVLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWN0aW9ucy9kYXNoYm9hcmQvY29udGFpbmVycy9yZXdhcmRzLXRpbGUvcmV3YXJkcy10aWxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXHJcbjpyb290IHtcclxuICAvKiogcHJpbWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1wcmltYXJ5OiAjMDA1Y2I5O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiAwLCA5MiwgMTg1O1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1zaGFkZTogIzAwNTFhMztcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICMxYTZjYzA7XHJcblxyXG4gIC8qKiBzZWNvbmRhcnkgKiovXHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5OiAjMGNkMWU4O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDEyLCAyMDksIDIzMjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMwYmI4Y2M7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICMyNGQ2ZWE7XHJcblxyXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogIzcwNDRmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1yZ2I6IDExMiwgNjgsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM2MzNjZTA7XHJcbiAgLS1pb24tY29sb3ItdGVydGlhcnktdGludDogIzdlNTdmZjtcclxuXHJcbiAgLyoqIHN1Y2Nlc3MgKiovXHJcbiAgLS1pb24tY29sb3Itc3VjY2VzczogIzEwZGM2MDtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogMTYsIDIyMCwgOTY7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMGVjMjU0O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtdGludDogIzI4ZTA3MDtcclxuXHJcbiAgLyoqIHdhcm5pbmcgKiovXHJcbiAgLS1pb24tY29sb3Itd2FybmluZzogI2ZmY2UwMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAyMDYsIDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBiNTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmZDMxYTtcclxuXHJcbiAgLyoqIGRhbmdlciAqKi9cclxuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNmMDQxNDE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXJnYjogMjQ1LCA2MSwgNjE7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXNoYWRlOiAjZDMzOTM5O1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZjI1NDU0O1xyXG5cclxuICAvKiogZGFyayAqKi9cclxuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzQsIDM0O1xyXG4gIC0taW9uLWNvbG9yLWRhcmstY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcclxuICAtLWlvbi1jb2xvci1kYXJrLXRpbnQ6ICMzODNhM2U7XHJcblxyXG4gIC8qKiBtZWRpdW0gKiovXHJcbiAgLS1pb24tY29sb3ItbWVkaXVtOiAjOTg5YWEyO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE1MiwgMTU0LCAxNjI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODY4ODhmO1xyXG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjYTJhNGFiO1xyXG5cclxuICAvKiogbGlnaHQgKiovXHJcbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtcmdiOiAyNDQsIDI0NCwgMjQ0O1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcclxuICAtLWlvbi1jb2xvci1saWdodC1zaGFkZTogI2Q3ZDhkYTtcclxuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xyXG5cclxuICAvLyAtLWlvbi1ncmlkLXdpZHRoLXNtOiAwcHg7XHJcbn1cclxuXHJcbi8vIEZPTlRTXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJGZvbnQtbnVuaXRvLXJlZ3VsYXI6ICdOdW5pdG8gUmVndWxhcicsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8tc2VtaWJvbGQ6ICdOdW5pdG8gU2VtaUJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtbnVuaXRvLWhlYXZ5OiAnTnVuaXRvIEJvbGQnLCBhcmlhbCwgc2Fucy1zZXJpZjtcclxuXHJcbi8vIENPTE9SU1xyXG5cclxuJGNvbG9yLXZlcnktbGlnaHQtZ3JheTogI2NjYztcclxuJGNvbG9yLWxpbmstd2F0ZXI6ICNkNGQ2ZDg7XHJcbiRjb2xvci13aGlzcGVyOiAjZTllOWU5O1xyXG4kY29sb3ItZGFyay1ncmF5OiAjYWFhO1xyXG4kY29sb3ItZHVzdHktZ3JheTogIzk3OTc5NztcclxuJGNvbG9yLWRpbS1ncmF5OiAjNmU2ZTZlO1xyXG4kY29sb3Itc29saXR1ZGU6ICNFQ0YxRjg7XHJcbiRjb2xvci1uaWdodC1yaWRlcjogIzMzMztcclxuJGNvbG9yLW5hdnktYmx1ZTogIzAwNTZlNjtcclxuJGNvbG9yLWRlbmltOiAjMTM2MGUwO1xyXG4kY29sb3ItZG9kZ2VyLWJsdWU6ICMxNjZkZmY7XHJcbiRjb2xvci1kb2RnZXItYmx1ZS1saWdodGVyOiAjMmQ3Y2ZmO1xyXG4kY29sb3Itd2hpdGU6ICNmZmY7XHJcbiRjb2xvci1ibGFjazogIzAwMDtcclxuJGNvbG9yLXdoaXRlLXNtb2tlOiAjZjNmM2YzO1xyXG4kY29sb3ItZGVlcC1za3ktYmx1ZTogIzAwYTBmZjtcclxuJGNvbG9yLWxpZ2h0LXNreS1ibHVlOiAjOGJiN2ZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4OGM4ZmY7XHJcbiRjb2xvci1zdHJvbmctYmx1ZTogIzAwNDNiMztcclxuJGNvbG9yLWFsaWNlLWJsdWU6ICNmMGYzZjU7XHJcbiRjb2xvci1zaWx2ZXI6ICNjNGM0YzQ7XHJcbiRjb2xvci1tYXR0ZXJob3JuOiAjNTE1MTUxO1xyXG4kY29sb3ItdmVyeS1kYXJrLWdyYXk6ICM2MjYyNjI7XHJcbiRjb2xvci1tZXJjdXJ5OiAjZTdlN2U3O1xyXG4kY29sb3ItbGlnaHQtZ3JheTogI2Q4ZDhkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlYmViZWI7XHJcbiRjb2xvci1hbGl6YXJpbjogI2UyMjk0MjtcclxuJGNvbG9yLWZsYW1lLXJlZDogIzg4MTkyODtcclxuJGNvbG9yLWNoYXJjb2FsOiAjNDY0NjQ2O1xyXG4kY29sb3ItZGVlcC1zZWE6ICMxNDdkNjM7XHJcbiRjb2xvci1jYXJkaW5hbDogI2I1MjEzNTtcclxuJGNvbG9yLWdvZC1ncmF5OiAjMTYxNjE2O1xyXG4kY29sb3ItaG90LWN1cnJ5OiAjN2M1ZDIzO1xyXG4kY29sb3ItY2FzYWJsYW5jYTogI2Y3YmE0NTtcclxuJGNvbG9yLWFsYWJhc3RlcjogI2Y3ZjdmNztcclxuJHBvcmNlbGFpbjogI2U2ZTllYjtcclxuJGNvbG9yLWhhcmxleS1kYXZpZHNvbi1vcmFuZ2U6ICNEMDQzMUE7XHJcbiRjb2xvci1wYXR0ZW5zLWJsdWU6ICNlMGUzZTU7XHJcblxyXG4vLy8gU2l6ZVxyXG4kYm90dG9tLW5hdmlnYXRpb24tYmFyLWhlaWdodDogNTBweDtcclxuIiwiQGltcG9ydCAndG9vbHMnO1xyXG5cclxuLnJld2FyZHMge1xyXG4gIHBhZGRpbmc6IDI1cHggMzBweDtcclxuICBtaW4taGVpZ2h0OiAxNTBweDtcclxuICB0cmFuc2l0aW9uOiAxcyBlYXNlLW91dDtcclxuXHJcbiAgJi0tYXV0by1oZWlnaHQge1xyXG4gICAgbWluLWhlaWdodDogMDtcclxuICB9XHJcblxyXG4gIC5wcm9ncmVzcyB7XHJcbiAgICAmX19leHBlcmllbmNlIHtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxNnB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmX19sZXZlbCB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgcGFkZGluZzogNXB4IDEwcHg7XHJcblxyXG4gICAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgyMHB4KTtcclxuICAgIH1cclxuXHJcbiAgICAmX19iYWxhbmNlLXdyYXBwZXIge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGNvbG9yOiAkY29sb3ItZGltLWdyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fYmFsYW5jZS10aXRsZSB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTNweCk7XHJcbiAgICB9XHJcblxyXG4gICAgJl9fYmFsYW5jZS1wb2ludHMge1xyXG4gICAgICBtYXJnaW46IDVweDtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXNlbWlib2xkKDI0cHgpO1xyXG4gICAgfVxyXG5cclxuICAgICZfX2JhbGFuY2UtcG9pbnRzLWRpZ2l0IHtcclxuICAgICAgY29sb3I6ICRjb2xvci1ibGFjaztcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDI0cHgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4uc2tlbGV0b24ge1xyXG5cclxuICAmX19hbGlnbi1jZW50ZXIge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fYWxpZ24tcmlnaHQge1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgfVxyXG5cclxuICAmX19sZXZlbCB7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgJl9fcHJvZ3Jlc3Mge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAmX19uZXh0LWxldmVsIHtcclxuICAgIHdpZHRoOiAzMCU7XHJcbiAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG5cclxuICAmX19uZXh0LWxldmVsLW1zZyB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICB3aWR0aDogMzAlO1xyXG4gIH1cclxuXHJcbiAgJl9fcG9pbnRzIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.ts ***!
  \**************************************************************************************/
/*! exports provided: RewardsTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsTileComponent", function() { return RewardsTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_rewards_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/rewards.service */ "./src/app/sections/dashboard/containers/rewards-tile/services/rewards.service.ts");




var RewardsTileComponent = /** @class */ (function () {
    function RewardsTileComponent(rewardsService) {
        this.rewardsService = rewardsService;
        this.isLoadingData = true;
    }
    RewardsTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rewardTrackInfo$ = this.rewardsService.getUserRewardTrackInfo().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () { return _this.isLoadingData = false; }));
        this.currentLvlInfo$ = this.rewardTrackInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var trackLevels = _a.trackLevels, userLevel = _a.userLevel;
            return trackLevels.find(function (_a) {
                var level = _a.level;
                return level === userLevel;
            });
        }));
        this.currentLvlInfo$ = this.rewardTrackInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var trackLevels = _a.trackLevels, userLevel = _a.userLevel;
            return trackLevels.find(function (_a) {
                var level = _a.level;
                return level === userLevel;
            });
        }));
        this.nextLvlRequirePoints$ = this.rewardTrackInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var trackLevels = _a.trackLevels, userLevel = _a.userLevel;
            var nextLevel = trackLevels.find(function (_a) {
                var level = _a.level;
                return level === userLevel + 1;
            });
            return nextLevel ? nextLevel.requiredPoints : null;
        }));
        this.userPointsSpent$ = this.rewardTrackInfo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var userExperiencePoints = _a.userExperiencePoints;
            return userExperiencePoints;
        }));
    };
    RewardsTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-rewards-tile',
            template: __webpack_require__(/*! ./rewards-tile.component.html */ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./rewards-tile.component.scss */ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_rewards_service__WEBPACK_IMPORTED_MODULE_3__["RewardsService"]])
    ], RewardsTileComponent);
    return RewardsTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.module.ts ***!
  \***********************************************************************************/
/*! exports provided: RewardsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsTileModule", function() { return RewardsTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sections_rewards_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/rewards/services */ "./src/app/sections/rewards/services/index.ts");
/* harmony import */ var _rewards_tile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rewards-tile.component */ "./src/app/sections/dashboard/containers/rewards-tile/rewards-tile.component.ts");
/* harmony import */ var _services_rewards_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/rewards.service */ "./src/app/sections/dashboard/containers/rewards-tile/services/rewards.service.ts");
/* harmony import */ var _shared_ui_components_st_progress_bar_st_progress_bar_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/ui-components/st-progress-bar/st-progress-bar.module */ "./src/app/shared/ui-components/st-progress-bar/st-progress-bar.module.ts");








var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_ui_components_st_progress_bar_st_progress_bar_module__WEBPACK_IMPORTED_MODULE_7__["StProgressBarModule"]];
var declarations = [_rewards_tile_component__WEBPACK_IMPORTED_MODULE_5__["RewardsTileComponent"]];
var exports = [_rewards_tile_component__WEBPACK_IMPORTED_MODULE_5__["RewardsTileComponent"]];
var RewardsTileModule = /** @class */ (function () {
    function RewardsTileModule() {
    }
    RewardsTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            providers: [_services_rewards_service__WEBPACK_IMPORTED_MODULE_6__["RewardsService"], _sections_rewards_services__WEBPACK_IMPORTED_MODULE_4__["RewardsApiService"]],
            exports: exports,
        })
    ], RewardsTileModule);
    return RewardsTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/rewards-tile/services/rewards.service.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/rewards-tile/services/rewards.service.ts ***!
  \****************************************************************************************/
/*! exports provided: RewardsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsService", function() { return RewardsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/model/rewards/rewards.model */ "./src/app/core/model/rewards/rewards.model.ts");
/* harmony import */ var src_app_core_service_rewards_rewards_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/service/rewards/rewards-api.service */ "./src/app/core/service/rewards/rewards-api.service.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");








var RewardsService = /** @class */ (function () {
    function RewardsService(rewardsApi, settingsFacadeService) {
        this.rewardsApi = rewardsApi;
        this.settingsFacadeService = settingsFacadeService;
        this.rewardTrack$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
    }
    Object.defineProperty(RewardsService.prototype, "rewardTrack", {
        get: function () {
            return this.rewardTrack$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardsService.prototype, "_rewardTrack", {
        set: function (rewardTrackInfo) {
            this.rewardTrackInfo = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rewardTrackInfo);
            this.rewardTrack$.next(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.rewardTrackInfo));
        },
        enumerable: true,
        configurable: true
    });
    RewardsService.prototype.getUserRewardTrackInfo = function (showToastOnError) {
        var _this = this;
        return this.rewardsApi
            .getUserRewardTrackInfo(true, showToastOnError)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (trackInfo) { return (_this._rewardTrack = trackInfo); }));
    };
    RewardsService.prototype.getUserOptInStatus = function () {
        return this.rewardTrack.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var userOptInStatus = _a.userOptInStatus;
            return userOptInStatus;
        }));
    };
    RewardsService.prototype.getLevelStatus = function (_a, userLevel) {
        var level = _a.level, rewards = _a.userClaimableRewards;
        if (userLevel < level) {
            return src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["LEVEL_STATUS"].locked;
        }
        for (var i = 0; i < rewards.length; i++) {
            if (rewards[i].claimStatus === src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["CLAIM_STATUS"].claimed) {
                return src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["LEVEL_STATUS"].claimed;
            }
            if (rewards[i].claimStatus === src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["CLAIM_STATUS"].received) {
                return src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["LEVEL_STATUS"].received;
            }
        }
        return src_app_core_model_rewards_rewards_model__WEBPACK_IMPORTED_MODULE_4__["LEVEL_STATUS"].unlocked;
    };
    RewardsService.prototype.sortByLevel = function (levelInfoArray) {
        return levelInfoArray.sort(function (_a, _b) {
            var a = _a.level;
            var b = _b.level;
            return a - b;
        });
    };
    RewardsService.prototype.getExpToNextLevel = function (levels, currentLevel, currentPoints) {
        var nextLevel = levels.find(function (_a) {
            var level = _a.level;
            return level === currentLevel;
        });
        return nextLevel.requiredPoints - currentPoints;
    };
    RewardsService.prototype.sortByTime = function (activityInfos) {
        return activityInfos.sort(function (_a, _b) {
            var a = _a.receivedTime;
            var b = _b.receivedTime;
            return Date.parse(b.toString()) - Date.parse(a.toString());
        });
    };
    RewardsService.prototype.isRewardsEnabled = function () {
        return this.settingsFacadeService.getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_6__["Settings"].Setting.REWARDS_ENABLED).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var value = _a.value;
            return Boolean(Number(value));
        }));
    };
    RewardsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_core_service_rewards_rewards_api_service__WEBPACK_IMPORTED_MODULE_5__["RewardsApiService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_7__["SettingsFacadeService"]])
    ], RewardsService);
    return RewardsService;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/tile-wrapper/index.ts":
/*!*********************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/tile-wrapper/index.ts ***!
  \*********************************************************************/
/*! exports provided: TileWrapperModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tile_wrapper_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile-wrapper.module */ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TileWrapperModule", function() { return _tile_wrapper_module__WEBPACK_IMPORTED_MODULE_0__["TileWrapperModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"tile-container\">\r\n  <ion-item\r\n    lines=\"none\"\r\n    [button]=\"true\"\r\n    [detail]=\"true\"\r\n    class=\"tile-container__topbar\"\r\n    detailIcon=\"/assets/icon/angle-right.svg\"\r\n    (click)=\"navigateTo(wrapperConfig.navigate)\"\r\n  >\r\n    <div slot=\"start\" class=\"tile-container__image-wrapper\">\r\n      <img class=\"tile-container__image\" src=\"{{ wrapperConfig.iconPath }}\" alt=\"card icon\"/>\r\n    </div>\r\n\r\n    <ion-label class=\"tile-container__label\">\r\n      {{ wrapperConfig.title }}\r\n    </ion-label>\r\n  </ion-item>\r\n  <div><ng-content></ng-content></div>\r\n  <ng-container *ngIf=\"wrapperConfig.buttonConfig.show\">\r\n    <ion-item\r\n      lines=\"none\"\r\n      [button]=\"true\"\r\n      [detail]=\"false\"\r\n      class=\"tile-container__nav-button\"\r\n      (click)=\"navigateTo(wrapperConfig.buttonConfig.navigate)\"\r\n    >\r\n      <ion-label class=\"tile-container__nav-button--label\">\r\n        {{ wrapperConfig.buttonConfig.title }}\r\n      </ion-label>\r\n    </ion-item>\r\n  </ng-container>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.tile-container {\n  width: -webkit-fill-available;\n  width: -moz-available;\n  width: stretch;\n  margin: 15px 10px;\n  border-radius: 15px;\n  box-shadow: 0px 0px 4px 0px #0000001f, 0px 2px 14px 0px #0000001f; }\n.tile-container__topbar {\n    --ion-background-color: #f7f7f7;\n    --item-ios-detail-push-color: #000;\n    --item-md-detail-push-color: #000;\n    --item-wp-detail-push-color: #000;\n    border-top-left-radius: 15px;\n    border-top-right-radius: 15px; }\n.tile-container__image-wrapper {\n    background: #fff;\n    border-radius: 50%;\n    width: 35px;\n    height: 35px; }\n.tile-container__image {\n    width: 100%;\n    height: 100%; }\n.tile-container__label {\n    color: #000;\n    font-size: 20px;\n    font-family: \"Nunito Bold\", arial, sans-serif; }\n.tile-container__nav-button {\n    border-bottom-left-radius: 15px;\n    border-bottom-right-radius: 15px;\n    border-top: 1px solid #f3f3f3; }\n.tile-container__nav-button--label {\n      color: #166dff;\n      text-align: center;\n      text-transform: uppercase;\n      font-size: 14px;\n      font-family: \"Nunito Bold\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvdGlsZS13cmFwcGVyL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL3RpbGUtd3JhcHBlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcY29udGFpbmVyc1xcdGlsZS13cmFwcGVyXFx0aWxlLXdyYXBwZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL3RpbGUtd3JhcHBlci9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXHN0eWxlc1xcX2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG1DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsZ0JBQUE7RUFDQSw4QkFBc0I7RUFDdEIsdUNBQTBCO0VBQzFCLHVDQUErQjtFQUMvQixpREFBbUM7RUFDbkMsb0NBQTRCO0VBQzVCLG1DQUEyQjtFQUUzQixlQUFBO0VBQ0EsNkJBQXFCO0VBQ3JCLHNDQUF5QjtFQUN6QixzQ0FBOEI7RUFDOUIsZ0RBQWtDO0VBQ2xDLG1DQUEyQjtFQUMzQixrQ0FBMEI7RUFFMUIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLG1DQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsV0FBQTtFQUNBLHlCQUFpQjtFQUNqQixnQ0FBcUI7RUFDckIsa0NBQTBCO0VBQzFCLDRDQUE4QjtFQUM5QiwrQkFBdUI7RUFDdkIsOEJBQXNCO0VBRXRCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIscUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixZQUFBO0VBQ0EsMEJBQWtCO0VBQ2xCLG9DQUFzQjtFQUN0QixtQ0FBMkI7RUFDM0IsdUNBQStCO0VBQy9CLGdDQUF3QjtFQUN4QiwrQkFBdUIsRUFBQTtBQ3RFekI7RUFDRSw2QkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsaUVBQWlFLEVBQUE7QUFFakU7SUFDRSwrQkFBdUI7SUFDdkIsa0NBQTZCO0lBQzdCLGlDQUE0QjtJQUM1QixpQ0FBNEI7SUFFNUIsNEJBQTRCO0lBQzVCLDZCQUE2QixFQUFBO0FBRy9CO0lBQ0UsZ0JEOEVjO0lDN0VkLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWSxFQUFBO0FBR2Q7SUFDRSxXQUFXO0lBQ1gsWUFBWSxFQUFBO0FBR2Q7SUFDRSxXRG1FYztJRWpHaEIsZURnQ2lDO0lDNUJqQyw2Q0Y0RWtELEVBQUE7QUM3Q2xEO0lBQ0UsK0JBQStCO0lBQy9CLGdDQUFnQztJQUNoQyw2QkQ0RHVCLEVBQUE7QUMxRHZCO01BQ0UsY0RxRHFCO01DcERyQixrQkFBa0I7TUFDbEIseUJBQXlCO01DM0M3QixlRDZDbUM7TUN6Q25DLDZDRjRFa0QsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9jb250YWluZXJzL3RpbGUtd3JhcHBlci90aWxlLXdyYXBwZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4udGlsZS1jb250YWluZXIge1xyXG4gIHdpZHRoOiBzdHJldGNoO1xyXG4gIG1hcmdpbjogMTVweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDBweCA0cHggMHB4ICMwMDAwMDAxZiwgMHB4IDJweCAxNHB4IDBweCAjMDAwMDAwMWY7XHJcblxyXG4gICZfX3RvcGJhciB7XHJcbiAgICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xyXG4gICAgLS1pdGVtLWlvcy1kZXRhaWwtcHVzaC1jb2xvcjogIzAwMDsgXHJcbiAgICAtLWl0ZW0tbWQtZGV0YWlsLXB1c2gtY29sb3I6ICMwMDA7XHJcbiAgICAtLWl0ZW0td3AtZGV0YWlsLXB1c2gtY29sb3I6ICMwMDA7XHJcblxyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTVweDtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xyXG4gIH1cclxuXHJcbiAgJl9faW1hZ2Utd3JhcHBlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3Itd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICB3aWR0aDogMzVweDtcclxuICAgIGhlaWdodDogMzVweDtcclxuICB9XHJcblxyXG4gICZfX2ltYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuXHJcbiAgJl9fbGFiZWwge1xyXG4gICAgY29sb3I6ICRjb2xvci1ibGFjaztcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1oZWF2eSgyMHB4KTtcclxuICB9XHJcblxyXG4gICZfX25hdi1idXR0b24ge1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTVweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxNXB4O1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICRjb2xvci13aGl0ZS1zbW9rZTtcclxuXHJcbiAgICAmLS1sYWJlbCB7XHJcbiAgICAgIGNvbG9yOiAkY29sb3ItZG9kZ2VyLWJsdWU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuXHJcbiAgICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLWhlYXZ5KDE0cHgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJAbWl4aW4gZm9udC1zaXplKCRmb250LXNpemUpIHtcclxuICBmb250LXNpemU6ICRmb250LXNpemU7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LWZhbWlseSgkZm9udC1mYW1pbHkpIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1udW5pdG8tcmVndWxhcigkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1yZWd1bGFyKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXNlbWlib2xkKCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLXNlbWlib2xkKTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLWhlYXZ5KCRmb250LXNpemUpIHtcclxuICBAaW5jbHVkZSBmb250LXNpemUoJGZvbnQtc2l6ZSk7XHJcbiAgQGluY2x1ZGUgZm9udC1mYW1pbHkoJGZvbnQtbnVuaXRvLWhlYXZ5KTtcclxufVxyXG5cclxuQG1peGluIGxpbmstY29sb3IoJGNvbG9yKSB7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxuXHJcbiAgJjpsaW5rLFxyXG4gICY6dmlzaXRlZCxcclxuICAmOmZvY3VzLFxyXG4gICY6aG92ZXIsXHJcbiAgJjphY3RpdmUge1xyXG4gICAgY29sb3I6ICRjb2xvcjtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBob3ZlciB7XHJcbiAgJjpob3ZlcixcclxuICAmOmZvY3VzIHtcclxuICAgIEBjb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGRpc2FibGVkIHtcclxuICAmLmRpc2FibGVkLFxyXG4gICYuZGlzYWJsZWQ6Zm9jdXMsXHJcbiAgJi5kaXNhYmxlZDpob3ZlcixcclxuICAmW2Rpc2FibGVkXSxcclxuICAmW2Rpc2FibGVkXTpmb2N1cyxcclxuICAmW2Rpc2FibGVkXTpob3ZlciB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBlbGxpcHNpcyB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG5AbWl4aW4gZmxvYXRpbmctbGFiZWwoJGNvbG9yKSB7XHJcbiAgZm9udC1zaXplOiA3NSU7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxNSUsIC01MCUsIDApO1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgYmFja2dyb3VuZDogJGNvbG9yLXdoaXRlO1xyXG4gIHBhZGRpbmc6IDAgM3B4O1xyXG4gIG1hcmdpbjogMDtcclxuICBjb2xvcjogJGNvbG9yO1xyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Itd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24uc3ZnJyk7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICAgIGhlaWdodDogOXB4O1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gIH1cclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bi1hY3RpdmUoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1hY3RpdmUuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tZXJyb3IoKSB7XHJcbiAgJjo6YmVmb3JlIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pY29uL2NoZXZyb24tZG93bi1lcnJvci5zdmcnKTtcclxuICAgIHJpZ2h0OiAxNHB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.ts ***!
  \**************************************************************************************/
/*! exports provided: TileWrapperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileWrapperComponent", function() { return TileWrapperComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var TileWrapperComponent = /** @class */ (function () {
    function TileWrapperComponent(router) {
        this.router = router;
    }
    TileWrapperComponent.prototype.navigateTo = function (path) {
        this.router.navigate([path]);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], TileWrapperComponent.prototype, "wrapperConfig", void 0);
    TileWrapperComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-tile-wrapper',
            template: __webpack_require__(/*! ./tile-wrapper.component.html */ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./tile-wrapper.component.scss */ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], TileWrapperComponent);
    return TileWrapperComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.module.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.module.ts ***!
  \***********************************************************************************/
/*! exports provided: TileWrapperModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileWrapperModule", function() { return TileWrapperModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tile_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tile-wrapper.component */ "./src/app/sections/dashboard/containers/tile-wrapper/tile-wrapper.component.ts");





var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
var declarations = [_tile_wrapper_component__WEBPACK_IMPORTED_MODULE_4__["TileWrapperComponent"]];
var exports = [_tile_wrapper_component__WEBPACK_IMPORTED_MODULE_4__["TileWrapperComponent"]];
var TileWrapperModule = /** @class */ (function () {
    function TileWrapperModule() {
    }
    TileWrapperModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: imports,
            exports: exports,
        })
    ], TileWrapperModule);
    return TileWrapperModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/index.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/index.ts ***!
  \**************************************************************************/
/*! exports provided: TransactionsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transactions_tile_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transactions-tile.module */ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransactionsTileModule", function() { return _transactions_tile_module__WEBPACK_IMPORTED_MODULE_0__["TransactionsTileModule"]; });




/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/services/transaction.service.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/services/transaction.service.ts ***!
  \*************************************************************************************************/
/*! exports provided: TransactionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionService", function() { return TransactionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/sections/accounts/shared/ui-components/filter/date-util */ "./src/app/sections/accounts/shared/ui-components/filter/date-util.ts");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/services/accounts.service */ "./src/app/sections/accounts/services/accounts.service.ts");
/* harmony import */ var _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/service/commerce/commerce-api.service */ "./src/app/core/service/commerce/commerce-api.service.ts");
/* harmony import */ var _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sections/accounts/accounts.config */ "./src/app/sections/accounts/accounts.config.ts");
/* harmony import */ var _core_utils_date_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/utils/date-helper */ "./src/app/core/utils/date-helper.ts");
/* harmony import */ var _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/facades/user/user.facade.service */ "./src/app/core/facades/user/user.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");












var TransactionService = /** @class */ (function () {
    function TransactionService(accountsService, commerceApiService, userFacadeService, settingsFacadeService) {
        this.accountsService = accountsService;
        this.commerceApiService = commerceApiService;
        this.userFacadeService = userFacadeService;
        this.settingsFacadeService = settingsFacadeService;
        this.transactionHistory = [];
        this.lazyAmount = 20;
        this._transactions$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this.transactionHistory);
    }
    Object.defineProperty(TransactionService.prototype, "transactions$", {
        get: function () {
            return this._transactions$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionService.prototype, "activeAccountId", {
        get: function () {
            return this.currentAccountId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionService.prototype, "activeTimeRange", {
        get: function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.currentTimeRange);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionService.prototype, "_transactions", {
        set: function (value) {
            this.transactionHistory = this.transactionHistory.concat(value);
            this.transactionHistory = this.cleanDuplicateTransactions(this.transactionHistory);
            this.transactionHistory.sort(function (a, b) { return new Date(b.actualDate).getTime() - new Date(a.actualDate).getTime(); });
            this._transactions$.next(this.transactionHistory.slice());
        },
        enumerable: true,
        configurable: true
    });
    TransactionService.prototype.getRecentTransactions = function (id, period, maxReturnMostRecent) {
        period = period ? period : { name: _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["TIME_PERIOD"].pastSixMonth };
        maxReturnMostRecent = maxReturnMostRecent ? maxReturnMostRecent : 0;
        var _a = Object(src_app_sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_4__["getTimeRangeOfDate"])(period), startDate = _a.startDate, endDate = _a.endDate;
        this.setInitialQueryObject(id, startDate, endDate);
        this.queryCriteria = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.queryCriteria, { maxReturnMostRecent: maxReturnMostRecent });
        if (this.currentAccountId !== id)
            this.transactionHistory = [];
        this.updateTransactionActiveState(id, period);
        return this.getTransactionHistoryByQuery(this.queryCriteria);
    };
    TransactionService.prototype.getTransactionsByAccountId = function (accountId, period) {
        if (this.isDuplicateCall(accountId, period))
            return this.transactions$;
        this.transactionHistory = [];
        var _a = Object(src_app_sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_4__["getTimeRangeOfDate"])(period), startDate = _a.startDate, endDate = _a.endDate;
        if (period.name === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["TIME_PERIOD"].pastSixMonth) {
            this.setInitialQueryObject(accountId, startDate, endDate, this.lazyAmount);
        }
        else {
            this.setInitialQueryObject(accountId, startDate, endDate);
        }
        this.updateTransactionActiveState(accountId, period);
        return this.getTransactionHistoryByQuery(this.queryCriteria);
    };
    TransactionService.prototype.getTransactionHistoryByQuery = function (query) {
        var _this = this;
        return this.settingsFacadeService.getSetting(src_app_app_global__WEBPACK_IMPORTED_MODULE_5__["Settings"].Setting.DISPLAY_TENDERS).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var value = _a.value;
            return _this.accountsService.transformStringToArray(value);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (tendersId) {
            return _this.commerceApiService.getTransactionsHistoryByDate(query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (response) { return (_this.transactionResponse = response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
                var transactions = _a.transactions;
                return _this.filterByTenderIds(tendersId, transactions);
            }));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (transactions) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(transactions), _this.userFacadeService.getUserData$()); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var transactions = _a[0], _b = _a[1], timeZone = _b.timeZone, locale = _b.locale;
            return transactions.map(function (item) { return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, item, { actualDate: Object(_core_utils_date_helper__WEBPACK_IMPORTED_MODULE_9__["convertGMTintoLocalTime"])(item.actualDate, locale, timeZone) })); });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (transactions) { return (_this._transactions = transactions); }));
    };
    TransactionService.prototype.updateTransactionActiveState = function (id, period) {
        this.currentTimeRange = period;
        this.currentAccountId = id;
    };
    TransactionService.prototype.isDuplicateCall = function (accountId, period) {
        var currentPeriod = Object(src_app_sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_4__["getUniquePeriodName"])(this.currentTimeRange);
        var incomePeriod = period ? Object(src_app_sections_accounts_shared_ui_components_filter_date_util__WEBPACK_IMPORTED_MODULE_4__["getUniquePeriodName"])(period) : null;
        return this.currentAccountId === accountId && currentPeriod === incomePeriod;
    };
    TransactionService.prototype.setInitialQueryObject = function (accountId, newestDate, oldestDate, maxReturnMostRecent) {
        if (accountId === void 0) { accountId = null; }
        if (newestDate === void 0) { newestDate = null; }
        if (oldestDate === void 0) { oldestDate = null; }
        if (maxReturnMostRecent === void 0) { maxReturnMostRecent = 0; }
        this.queryCriteria = {
            maxReturnMostRecent: maxReturnMostRecent,
            newestDate: newestDate,
            oldestDate: oldestDate,
            accountId: accountId === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["ALL_ACCOUNTS"] ? null : accountId,
        };
    };
    TransactionService.prototype.cleanDuplicateTransactions = function (arr) {
        var transactionMap = new Map();
        arr.forEach(function (transaction) { return transactionMap.set(transaction.transactionId, transaction); });
        return Array.from(transactionMap.values());
    };
    TransactionService.prototype.filterByTenderIds = function (tendersId, transactions) {
        return transactions.filter(function (_a) {
            var type = _a.paymentSystemType, tenId = _a.tenderId;
            return type === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["PAYMENT_SYSTEM_TYPE"].MONETRA || type === _sections_accounts_accounts_config__WEBPACK_IMPORTED_MODULE_8__["PAYMENT_SYSTEM_TYPE"].USAEPAY || tendersId.includes(tenId);
        });
    };
    TransactionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__["AccountsService"],
            _core_service_commerce_commerce_api_service__WEBPACK_IMPORTED_MODULE_7__["CommerceApiService"],
            _core_facades_user_user_facade_service__WEBPACK_IMPORTED_MODULE_10__["UserFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_11__["SettingsFacadeService"]])
    ], TransactionService);
    return TransactionService;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"transaction\" [ngClass]=\"{'transaction--auto-height': !isLoading}\">\r\n  <ion-list class=\"transaction__list\" *ngIf=\"!isLoading && transactions.length\">\r\n    <ion-item class=\"transaction__item\"\r\n              *ngFor=\"let transaction of transactions\"\r\n              mode=\"md\">\r\n      <div class=\"transaction__label-container\">\r\n        <div class=\"transaction__label\">{{ transaction.locationName }}</div>\r\n        <div class=\"transaction__date\">{{ transaction.actualDate | date:'short'}} </div>\r\n      </div>\r\n      <div class=\"transaction__type-container\">\r\n        <div class=\"transaction__type-entity\">\r\n          {{ transaction.transactionType | transactionAction}} {{ transaction.amount | transactionUnits: transaction.accountType }}\r\n        </div>\r\n        <div class=\"transaction__type-label\">{{ transaction.accountName }}</div>\r\n      </div>\r\n    </ion-item>\r\n  </ion-list>\r\n\r\n  <ion-list *ngIf=\"isLoading\" [ngClass]=\"{'transaction--auto-height': !isLoading}\">\r\n    <ion-item *ngFor=\"let i of skeletonArray\">\r\n      <ion-label>\r\n        <p class=\"transaction__skeleton-string\">\r\n          <ion-skeleton-text animated class=\"transaction__skeleton-name\"></ion-skeleton-text>\r\n          <ion-skeleton-text animated class=\"transaction__skeleton-amount\"></ion-skeleton-text>\r\n        </p>\r\n        <p class=\"transaction__skeleton-string\">\r\n          <ion-skeleton-text animated class=\"transaction__skeleton-date\"></ion-skeleton-text>\r\n          <ion-skeleton-text animated class=\"transaction__skeleton-account\"></ion-skeleton-text>\r\n        </p>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.transaction {\n  margin: 0 15px;\n  overflow: hidden;\n  min-height: 180px;\n  max-height: 220px;\n  -webkit-transition: 1s ease-out;\n  transition: 1s ease-out; }\n.transaction--auto-height {\n    min-height: 0; }\n.transaction__list {\n    width: 100%;\n    margin: 0;\n    padding: 0; }\n.transaction__item {\n    --padding-start: 0;\n    --inner-padding-end: 0;\n    --border-style: none;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n            align-items: center;\n    width: 100%;\n    border-bottom: 1px solid #f3f3f3; }\n.transaction__item:last-child {\n      border-style: none; }\n.transaction__label-container {\n    margin-top: 15px;\n    width: 65%;\n    text-align: left; }\n.transaction__label {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.transaction__date {\n    margin: 5px 0 15px;\n    font-size: 10px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.transaction__type-container {\n    margin-top: 15px;\n    width: 35%;\n    text-align: right; }\n.transaction__type-entity {\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.transaction__type-label {\n    margin: 5px 0 13px;\n    font-size: 10px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n.transaction__skeleton-string {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: justify;\n            justify-content: space-between; }\n.transaction__skeleton-name {\n    width: 50%;\n    height: 18px; }\n.transaction__skeleton-amount {\n    width: 30%;\n    height: 20px; }\n.transaction__skeleton-date {\n    width: 30%;\n    height: 12px; }\n.transaction__skeleton-account {\n    width: 20%;\n    height: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvdHJhbnNhY3Rpb25zLXRpbGUvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvdHJhbnNhY3Rpb25zLXRpbGUvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxhcHBcXHNlY3Rpb25zXFxkYXNoYm9hcmRcXGNvbnRhaW5lcnNcXHRyYW5zYWN0aW9ucy10aWxlXFx0cmFuc2FjdGlvbnMtdGlsZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvdHJhbnNhY3Rpb25zLXRpbGUvQzpcXFVzZXJzXFxic3BcXERvY3VtZW50c1xcR2l0UmVwb3NcXGNib3JkLXN0dWRlbnQvc3JjXFxzdHlsZXNcXF9jb21tb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixtQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGdCQUFBO0VBQ0EsOEJBQXNCO0VBQ3RCLHVDQUEwQjtFQUMxQix1Q0FBK0I7RUFDL0IsaURBQW1DO0VBQ25DLG9DQUE0QjtFQUM1QixtQ0FBMkI7RUFFM0IsZUFBQTtFQUNBLDZCQUFxQjtFQUNyQixzQ0FBeUI7RUFDekIsc0NBQThCO0VBQzlCLGdEQUFrQztFQUNsQyxtQ0FBMkI7RUFDM0Isa0NBQTBCO0VBRTFCLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsb0NBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixtQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFdBQUE7RUFDQSx5QkFBaUI7RUFDakIsZ0NBQXFCO0VBQ3JCLGtDQUEwQjtFQUMxQiw0Q0FBOEI7RUFDOUIsK0JBQXVCO0VBQ3ZCLDhCQUFzQjtFQUV0QixhQUFBO0VBQ0EsMkJBQW1CO0VBQ25CLHFDQUF1QjtFQUN2QixvQ0FBNEI7RUFDNUIsOENBQWdDO0VBQ2hDLGlDQUF5QjtFQUN6QixnQ0FBd0I7RUFFeEIsWUFBQTtFQUNBLDBCQUFrQjtFQUNsQixvQ0FBc0I7RUFDdEIsbUNBQTJCO0VBQzNCLHVDQUErQjtFQUMvQixnQ0FBd0I7RUFDeEIsK0JBQXVCLEVBQUE7QUN0RXpCO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLCtCQUF1QjtFQUF2Qix1QkFBdUIsRUFBQTtBQUV2QjtJQUNFLGFBQWEsRUFBQTtBQUdmO0lBQ0UsV0FBVztJQUNYLFNBQVM7SUFDVCxVQUFVLEVBQUE7QUFHWjtJQUNFLGtCQUFnQjtJQUNoQixzQkFBb0I7SUFDcEIsb0JBQWU7SUFFZixvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBOEI7WUFBOUIsOEJBQThCO0lBQzlCLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLGdDRHVFdUIsRUFBQTtBQ2hGeEI7TUFZRyxrQkFBa0IsRUFBQTtBQUl0QjtJQUNFLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsZ0JBQWdCLEVBQUE7QUFHbEI7SUNhQSxnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQXZEbkIsZUQwQ29DO0lDdENwQyxpREYyRXlELEVBQUE7QUNsQ3pEO0lBQ0Usa0JBQWtCO0lDOUNwQixlRCtDbUM7SUMzQ25DLGdERjBFdUQsRUFBQTtBQzVCdkQ7SUFDRSxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLGlCQUFpQixFQUFBO0FBR25CO0lDeERBLGVEeURvQztJQ3JEcEMsaURGMkV5RCxFQUFBO0FDbkJ6RDtJQUNFLGtCQUFrQjtJQzdEcEIsZUQrRG1DO0lDM0RuQyxnREYwRXVELEVBQUE7QUNadkQ7SUFDRSxvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBOEI7WUFBOUIsOEJBQThCLEVBQUE7QUFHaEM7SUFDRSxVQUFVO0lBQ1YsWUFBWSxFQUFBO0FBR2Q7SUFDRSxVQUFVO0lBQ1YsWUFBWSxFQUFBO0FBR2Q7SUFDRSxVQUFVO0lBQ1YsWUFBWSxFQUFBO0FBR2Q7SUFDRSxVQUFVO0lBQ1YsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2NvbnRhaW5lcnMvdHJhbnNhY3Rpb25zLXRpbGUvdHJhbnNhY3Rpb25zLXRpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0ICd0b29scyc7XHJcblxyXG4udHJhbnNhY3Rpb24ge1xyXG4gIG1hcmdpbjogMCAxNXB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgbWluLWhlaWdodDogMTgwcHg7XHJcbiAgbWF4LWhlaWdodDogMjIwcHg7XHJcbiAgdHJhbnNpdGlvbjogMXMgZWFzZS1vdXQ7XHJcbiAgXHJcbiAgJi0tYXV0by1oZWlnaHQge1xyXG4gICAgbWluLWhlaWdodDogMDtcclxuICB9XHJcblxyXG4gICZfX2xpc3Qge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuXHJcbiAgJl9faXRlbSB7XHJcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XHJcbiAgICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xyXG4gICAgLS1ib3JkZXItc3R5bGU6IG5vbmU7XHJcblxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkY29sb3Itd2hpdGUtc21va2U7XHJcblxyXG4gICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgYm9yZGVyLXN0eWxlOiBub25lO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJl9fbGFiZWwtY29udGFpbmVyIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB3aWR0aDogNjUlO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICB9XHJcblxyXG4gICZfX2xhYmVsIHtcclxuICAgIEBpbmNsdWRlIGVsbGlwc2lzO1xyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX19kYXRlIHtcclxuICAgIG1hcmdpbjogNXB4IDAgMTVweDtcclxuICAgIEBpbmNsdWRlIGZvbnQtbnVuaXRvLXJlZ3VsYXIoMTBweCk7XHJcbiAgfVxyXG5cclxuICAmX190eXBlLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgd2lkdGg6IDM1JTtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gIH1cclxuXHJcbiAgJl9fdHlwZS1lbnRpdHkge1xyXG4gICAgQGluY2x1ZGUgZm9udC1udW5pdG8tc2VtaWJvbGQoMTZweCk7XHJcbiAgfVxyXG5cclxuICAmX190eXBlLWxhYmVsIHtcclxuICAgIG1hcmdpbjogNXB4IDAgMTNweDtcclxuXHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDEwcHgpO1xyXG4gIH1cclxuXHJcbiAgJl9fc2tlbGV0b24tc3RyaW5nIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgfVxyXG5cclxuICAmX19za2VsZXRvbi1uYW1lIHtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBoZWlnaHQ6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAmX19za2VsZXRvbi1hbW91bnQge1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGhlaWdodDogMjBweDtcclxuICB9XHJcblxyXG4gICZfX3NrZWxldG9uLWRhdGUge1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGhlaWdodDogMTJweDtcclxuICB9XHJcblxyXG4gICZfX3NrZWxldG9uLWFjY291bnQge1xyXG4gICAgd2lkdGg6IDIwJTtcclxuICAgIGhlaWdodDogMTJweDtcclxuICB9XHJcbn1cclxuIiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.ts ***!
  \************************************************************************************************/
/*! exports provided: TransactionsTileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsTileComponent", function() { return TransactionsTileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_transaction_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/transaction.service */ "./src/app/sections/dashboard/containers/transactions-tile/services/transaction.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");




var TransactionsTileComponent = /** @class */ (function () {
    function TransactionsTileComponent(transactionService, cdRef) {
        this.transactionService = transactionService;
        this.cdRef = cdRef;
        this.transactions = [];
        this.transactionsAmount = 3;
        this.skeletonArray = new Array(this.transactionsAmount);
        this.isLoading = true;
    }
    TransactionsTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transactionService.getRecentTransactions(null, null, this.transactionsAmount)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
            _this.isLoading = false;
            _this.cdRef.detectChanges();
        }))
            .subscribe(function (data) {
            _this.transactions = data;
        });
    };
    TransactionsTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-transactions-tile',
            template: __webpack_require__(/*! ./transactions-tile.component.html */ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./transactions-tile.component.scss */ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_transaction_service__WEBPACK_IMPORTED_MODULE_2__["TransactionService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], TransactionsTileComponent);
    return TransactionsTileComponent;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.module.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.module.ts ***!
  \*********************************************************************************************/
/*! exports provided: TransactionsTileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsTileModule", function() { return TransactionsTileModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _transactions_tile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactions-tile.component */ "./src/app/sections/dashboard/containers/transactions-tile/transactions-tile.component.ts");
/* harmony import */ var _services_transaction_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/transaction.service */ "./src/app/sections/dashboard/containers/transactions-tile/services/transaction.service.ts");
/* harmony import */ var _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/services/accounts.service */ "./src/app/sections/accounts/services/accounts.service.ts");
/* harmony import */ var _shared_pipes_transaction_operation_transaction_action_pipe_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/pipes/transaction-operation/transaction-action-pipe.module */ "./src/app/shared/pipes/transaction-operation/transaction-action-pipe.module.ts");
/* harmony import */ var _shared_pipes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/pipes */ "./src/app/shared/pipes/index.ts");









var imports = [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_pipes__WEBPACK_IMPORTED_MODULE_8__["TransactionUnitsPipeModule"], _shared_pipes_transaction_operation_transaction_action_pipe_module__WEBPACK_IMPORTED_MODULE_7__["TransactionActionPipeModule"]];
var declarations = [_transactions_tile_component__WEBPACK_IMPORTED_MODULE_4__["TransactionsTileComponent"]];
var exports = [_transactions_tile_component__WEBPACK_IMPORTED_MODULE_4__["TransactionsTileComponent"]];
var TransactionsTileModule = /** @class */ (function () {
    function TransactionsTileModule() {
    }
    TransactionsTileModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: declarations,
            imports: [
                imports,
                _shared_pipes_transaction_operation_transaction_action_pipe_module__WEBPACK_IMPORTED_MODULE_7__["TransactionActionPipeModule"],
                _shared_pipes__WEBPACK_IMPORTED_MODULE_8__["TransactionUnitsPipeModule"],
            ],
            providers: [_services_transaction_service__WEBPACK_IMPORTED_MODULE_5__["TransactionService"], _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_6__["AccountsService"]],
            exports: exports,
        })
    ], TransactionsTileModule);
    return TransactionsTileModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/dashboard.module.ts":
/*!********************************************************!*\
  !*** ./src/app/sections/dashboard/dashboard.module.ts ***!
  \********************************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/ui-components/st-header/st-header.module */ "./src/app/shared/ui-components/st-header/st-header.module.ts");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.routing.module */ "./src/app/sections/dashboard/dashboard.routing.module.ts");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/sections/dashboard/dashboard.page.ts");
/* harmony import */ var _containers_access_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./containers/access-card */ "./src/app/sections/dashboard/containers/access-card/index.ts");
/* harmony import */ var _containers_accounts_tile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./containers/accounts-tile */ "./src/app/sections/dashboard/containers/accounts-tile/index.ts");
/* harmony import */ var _containers_conversations_tile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./containers/conversations-tile */ "./src/app/sections/dashboard/containers/conversations-tile/index.ts");
/* harmony import */ var _containers_explore_tile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./containers/explore-tile */ "./src/app/sections/dashboard/containers/explore-tile/index.ts");
/* harmony import */ var _containers_mobile_access_tile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./containers/mobile-access-tile */ "./src/app/sections/dashboard/containers/mobile-access-tile/index.ts");
/* harmony import */ var _containers_order_tile__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./containers/order-tile */ "./src/app/sections/dashboard/containers/order-tile/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services */ "./src/app/sections/dashboard/services/index.ts");
/* harmony import */ var _containers_tile_wrapper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./containers/tile-wrapper */ "./src/app/sections/dashboard/containers/tile-wrapper/index.ts");
/* harmony import */ var _containers_transactions_tile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./containers/transactions-tile */ "./src/app/sections/dashboard/containers/transactions-tile/index.ts");
/* harmony import */ var _containers_rewards_tile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./containers/rewards-tile */ "./src/app/sections/dashboard/containers/rewards-tile/index.ts");
/* harmony import */ var _resolvers_dashboard_page_resolver__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resolvers/dashboard-page.resolver */ "./src/app/sections/dashboard/resolvers/dashboard-page.resolver.ts");
/* harmony import */ var _components_edit_home_page_modal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/edit-home-page-modal */ "./src/app/sections/dashboard/components/edit-home-page-modal/index.ts");
/* harmony import */ var _containers_meal_donations_tile_meal_donations_tile_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./containers/meal-donations-tile/meal-donations-tile.module */ "./src/app/sections/dashboard/containers/meal-donations-tile/meal-donations-tile.module.ts");
/* harmony import */ var _sections_mobile_access__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @sections/mobile-access */ "./src/app/sections/mobile-access/index.ts");
/* harmony import */ var _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @sections/dashboard/tile-config-facade.service */ "./src/app/sections/dashboard/tile-config-facade.service.ts");
/* harmony import */ var _containers_housing_tile_housing_tile_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./containers/housing-tile/housing-tile.module */ "./src/app/sections/dashboard/containers/housing-tile/housing-tile.module.ts");























var imports = [
    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
    _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
    _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_5__["DashboardRoutingModule"],
    src_app_shared_ui_components_st_header_st_header_module__WEBPACK_IMPORTED_MODULE_4__["StHeaderModule"],
    _containers_access_card__WEBPACK_IMPORTED_MODULE_7__["AccessCardModule"],
    _containers_accounts_tile__WEBPACK_IMPORTED_MODULE_8__["AccountsTileModule"],
    _containers_conversations_tile__WEBPACK_IMPORTED_MODULE_9__["ConversationsTileModule"],
    _containers_explore_tile__WEBPACK_IMPORTED_MODULE_10__["ExploreTileModule"],
    _containers_mobile_access_tile__WEBPACK_IMPORTED_MODULE_11__["MobileAccessTileModule"],
    _containers_order_tile__WEBPACK_IMPORTED_MODULE_12__["OrderTileModule"],
    _containers_tile_wrapper__WEBPACK_IMPORTED_MODULE_14__["TileWrapperModule"],
    _containers_transactions_tile__WEBPACK_IMPORTED_MODULE_15__["TransactionsTileModule"],
    _containers_rewards_tile__WEBPACK_IMPORTED_MODULE_16__["RewardsTileModule"],
    _containers_meal_donations_tile_meal_donations_tile_module__WEBPACK_IMPORTED_MODULE_19__["MealDonationsTileModule"],
    _containers_housing_tile_housing_tile_module__WEBPACK_IMPORTED_MODULE_22__["HousingTileModule"]
];
var declarations = [
    _dashboard_page__WEBPACK_IMPORTED_MODULE_6__["DashboardPage"],
    _components_edit_home_page_modal__WEBPACK_IMPORTED_MODULE_18__["EditHomePageModalComponent"],
];
var providers = [
    _services__WEBPACK_IMPORTED_MODULE_13__["AccountsService"],
    _services__WEBPACK_IMPORTED_MODULE_13__["DashboardService"],
    _sections_mobile_access__WEBPACK_IMPORTED_MODULE_20__["MobileAccessService"],
    _resolvers_dashboard_page_resolver__WEBPACK_IMPORTED_MODULE_17__["DashboardPageResolver"],
    _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_21__["TileConfigFacadeService"],
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: imports,
            declarations: declarations,
            providers: providers,
            entryComponents: [
                _components_edit_home_page_modal__WEBPACK_IMPORTED_MODULE_18__["EditHomePageModalComponent"]
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DashboardPageModule);
    return DashboardPageModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/dashboard.page.html":
/*!********************************************************!*\
  !*** ./src/app/sections/dashboard/dashboard.page.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content class=\"dashboard\">\r\n  <ion-button (click)=\"logout()\">Logout</ion-button>\r\n  <st-access-card></st-access-card>\r\n\r\n  <ng-container *ngFor=\"let tile of tiles$ | async; trackBy: trackFn\">\r\n    <st-tile-wrapper *ngIf=\"tile.isEnable\"\r\n                     [wrapperConfig]=\"tile\">\r\n      <ng-container [ngSwitch]=\"tile.id\">\r\n        <st-accounts-tile *ngSwitchCase=\"tilesIds.accounts\"></st-accounts-tile>\r\n        <st-transactions-tile *ngSwitchCase=\"tilesIds.transactions\"></st-transactions-tile>\r\n        <st-rewards-tile *ngSwitchCase=\"tilesIds.rewards\"></st-rewards-tile>\r\n        <st-mobile-access-tile *ngSwitchCase=\"tilesIds.mobileAccess\"></st-mobile-access-tile>\r\n        <st-meal-donations-tile *ngSwitchCase=\"tilesIds.mealDonations\"></st-meal-donations-tile>\r\n        <st-order-tile *ngSwitchCase=\"tilesIds.order\"></st-order-tile>\r\n        <st-explore-tile *ngSwitchCase=\"tilesIds.explore\"></st-explore-tile>\r\n        <st-conversations-tile *ngSwitchCase=\"tilesIds.conversations\"></st-conversations-tile>\r\n        <st-housing-tile *ngSwitchCase=\"tilesIds.housing\"></st-housing-tile>\r\n      </ng-container>\r\n    </st-tile-wrapper>\r\n  </ng-container>\r\n\r\n  <ion-button class=\"dashboard__bottom-btn-wrapper\"\r\n              mode=\"ios\"\r\n              (click)=\"presentEditHomePageModal()\">\r\n    <div class=\"dashboard__bottom-icon-wrapper\">\r\n      <img src=\"/assets/icon/dashboard.svg\" />\r\n    </div>\r\n    <div class=\"dashboard__bottom-title-wrapper\">\r\n      <div class=\"dashboard__bottom-title\">Edit Home Page</div>\r\n      <!-- <div class=\"dashboard__bottom-subtitle\">Rearrange and show or hide cards</div> -->\r\n    </div>\r\n  </ion-button>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/sections/dashboard/dashboard.page.scss":
/*!********************************************************!*\
  !*** ./src/app/sections/dashboard/dashboard.page.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/** Ionic CSS Variables **/\n:root {\n  /** primary **/\n  --ion-color-primary: #005cb9;\n  --ion-color-primary-rgb: 0, 92, 185;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #0051a3;\n  --ion-color-primary-tint: #1a6cc0;\n  /** secondary **/\n  --ion-color-secondary: #0cd1e8;\n  --ion-color-secondary-rgb: 12, 209, 232;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #0bb8cc;\n  --ion-color-secondary-tint: #24d6ea;\n  /** tertiary **/\n  --ion-color-tertiary: #7044ff;\n  --ion-color-tertiary-rgb: 112, 68, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #633ce0;\n  --ion-color-tertiary-tint: #7e57ff;\n  /** success **/\n  --ion-color-success: #10dc60;\n  --ion-color-success-rgb: 16, 220, 96;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #0ec254;\n  --ion-color-success-tint: #28e070;\n  /** warning **/\n  --ion-color-warning: #ffce00;\n  --ion-color-warning-rgb: 255, 206, 0;\n  --ion-color-warning-contrast: #ffffff;\n  --ion-color-warning-contrast-rgb: 255, 255, 255;\n  --ion-color-warning-shade: #e0b500;\n  --ion-color-warning-tint: #ffd31a;\n  /** danger **/\n  --ion-color-danger: #f04141;\n  --ion-color-danger-rgb: 245, 61, 61;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #d33939;\n  --ion-color-danger-tint: #f25454;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 34, 34;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152, 154, 162;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 244, 244;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9; }\n.dashboard {\n  background: #f3f3f3; }\n.dashboard__bottom-btn-wrapper {\n    --background:  #fff;\n    --background-activated: #D9D9D9;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n            align-items: center;\n    margin: 10px;\n    border-radius: 16px;\n    height: 65px;\n    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 2px 14px 0px rgba(0, 0, 0, 0.12); }\n.dashboard__bottom-icon-wrapper {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    font-size: 35px;\n    margin-right: 5px; }\n.dashboard__bottom-title-wrapper {\n    text-align: left;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    color: #000; }\n.dashboard__bottom-title {\n    font-size: 16px;\n    font-family: \"Nunito SemiBold\", arial, sans-serif; }\n.dashboard__bottom-subtitle {\n    font-size: 10px;\n    font-family: \"Nunito Regular\", arial, sans-serif; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfdmFyaWFibGVzLnNjc3MiLCJzcmMvYXBwL3NlY3Rpb25zL2Rhc2hib2FyZC9DOlxcVXNlcnNcXGJzcFxcRG9jdW1lbnRzXFxHaXRSZXBvc1xcY2JvcmQtc3R1ZGVudC9zcmNcXGFwcFxcc2VjdGlvbnNcXGRhc2hib2FyZFxcZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL0M6XFxVc2Vyc1xcYnNwXFxEb2N1bWVudHNcXEdpdFJlcG9zXFxjYm9yZC1zdHVkZW50L3NyY1xcc3R5bGVzXFxfY29tbW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQUE7QUFDQTtFQUNFLGNBQUE7RUFDQSw0QkFBb0I7RUFDcEIsbUNBQXdCO0VBQ3hCLHFDQUE2QjtFQUM3QiwrQ0FBaUM7RUFDakMsa0NBQTBCO0VBQzFCLGlDQUF5QjtFQUV6QixnQkFBQTtFQUNBLDhCQUFzQjtFQUN0Qix1Q0FBMEI7RUFDMUIsdUNBQStCO0VBQy9CLGlEQUFtQztFQUNuQyxvQ0FBNEI7RUFDNUIsbUNBQTJCO0VBRTNCLGVBQUE7RUFDQSw2QkFBcUI7RUFDckIsc0NBQXlCO0VBQ3pCLHNDQUE4QjtFQUM5QixnREFBa0M7RUFDbEMsbUNBQTJCO0VBQzNCLGtDQUEwQjtFQUUxQixjQUFBO0VBQ0EsNEJBQW9CO0VBQ3BCLG9DQUF3QjtFQUN4QixxQ0FBNkI7RUFDN0IsK0NBQWlDO0VBQ2pDLGtDQUEwQjtFQUMxQixpQ0FBeUI7RUFFekIsY0FBQTtFQUNBLDRCQUFvQjtFQUNwQixvQ0FBd0I7RUFDeEIscUNBQTZCO0VBQzdCLCtDQUFpQztFQUNqQyxrQ0FBMEI7RUFDMUIsaUNBQXlCO0VBRXpCLGFBQUE7RUFDQSwyQkFBbUI7RUFDbkIsbUNBQXVCO0VBQ3ZCLG9DQUE0QjtFQUM1Qiw4Q0FBZ0M7RUFDaEMsaUNBQXlCO0VBQ3pCLGdDQUF3QjtFQUV4QixXQUFBO0VBQ0EseUJBQWlCO0VBQ2pCLGdDQUFxQjtFQUNyQixrQ0FBMEI7RUFDMUIsNENBQThCO0VBQzlCLCtCQUF1QjtFQUN2Qiw4QkFBc0I7RUFFdEIsYUFBQTtFQUNBLDJCQUFtQjtFQUNuQixxQ0FBdUI7RUFDdkIsb0NBQTRCO0VBQzVCLDhDQUFnQztFQUNoQyxpQ0FBeUI7RUFDekIsZ0NBQXdCO0VBRXhCLFlBQUE7RUFDQSwwQkFBa0I7RUFDbEIsb0NBQXNCO0VBQ3RCLG1DQUEyQjtFQUMzQix1Q0FBK0I7RUFDL0IsZ0NBQXdCO0VBQ3hCLCtCQUF1QixFQUFBO0FDdEV6QjtFQUNFLG1CRGdHeUIsRUFBQTtBQzlGekI7SUFDRSxtQkFBYTtJQUNiLCtCQUF1QjtJQUV2QixvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1oscUZEbUZjLEVBQUE7QUNoRmhCO0lBQ0Usb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsaUJBQWlCLEVBQUE7QUFHbkI7SUFDRSxnQkFBZ0I7SUFDaEIsb0JBQWE7SUFBYixhQUFhO0lBQ2IsNEJBQXNCO0lBQXRCLDZCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIsV0RxRWMsRUFBQTtBQ2xFaEI7SUMvQkEsZURnQ29DO0lDNUJwQyxpREYyRXlELEVBQUE7QUM3Q3pEO0lDbENBLGVEbUNtQztJQy9CbkMsZ0RGMEV1RCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VjdGlvbnMvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogSW9uaWMgQ1NTIFZhcmlhYmxlcyAqKi9cclxuOnJvb3Qge1xyXG4gIC8qKiBwcmltYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMwMDVjYjk7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDAsIDkyLCAxODU7XHJcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDA1MWEzO1xyXG4gIC0taW9uLWNvbG9yLXByaW1hcnktdGludDogIzFhNmNjMDtcclxuXHJcbiAgLyoqIHNlY29uZGFyeSAqKi9cclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwY2QxZTg7XHJcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogMTIsIDIwOSwgMjMyO1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzBiYjhjYztcclxuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktdGludDogIzI0ZDZlYTtcclxuXHJcbiAgLyoqIHRlcnRpYXJ5ICoqL1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5OiAjNzA0NGZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogMTEyLCA2OCwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZTogIzYzM2NlMDtcclxuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjN2U1N2ZmO1xyXG5cclxuICAvKiogc3VjY2VzcyAqKi9cclxuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMTBkYzYwO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiAxNiwgMjIwLCA5NjtcclxuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3Mtc2hhZGU6ICMwZWMyNTQ7XHJcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjMjhlMDcwO1xyXG5cclxuICAvKiogd2FybmluZyAqKi9cclxuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjZTAwO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDIwNiwgMDtcclxuICAtLWlvbi1jb2xvci13YXJuaW5nLWNvbnRyYXN0OiAjZmZmZmZmO1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xyXG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGI1MDA7XHJcbiAgLS1pb24tY29sb3Itd2FybmluZy10aW50OiAjZmZkMzFhO1xyXG5cclxuICAvKiogZGFuZ2VyICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhbmdlcjogI2YwNDE0MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyNDUsIDYxLCA2MTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNkMzM5Mzk7XHJcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNmMjU0NTQ7XHJcblxyXG4gIC8qKiBkYXJrICoqL1xyXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XHJcbiAgLS1pb24tY29sb3ItZGFyay1yZ2I6IDM0LCAzNCwgMzQ7XHJcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcclxuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1kYXJrLXNoYWRlOiAjMWUyMDIzO1xyXG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcclxuXHJcbiAgLyoqIG1lZGl1bSAqKi9cclxuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5ODlhYTI7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTUyLCAxNTQsIDE2MjtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3Q6ICNmZmZmZmY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcclxuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4Njg4OGY7XHJcbiAgLS1pb24tY29sb3ItbWVkaXVtLXRpbnQ6ICNhMmE0YWI7XHJcblxyXG4gIC8qKiBsaWdodCAqKi9cclxuICAtLWlvbi1jb2xvci1saWdodDogI2Y0ZjVmODtcclxuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ0LCAyNDQ7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XHJcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3QtcmdiOiAwLCAwLCAwO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xyXG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XHJcblxyXG4gIC8vIC0taW9uLWdyaWQtd2lkdGgtc206IDBweDtcclxufVxyXG5cclxuLy8gRk9OVFNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kZm9udC1udW5pdG8tcmVndWxhcjogJ051bml0byBSZWd1bGFyJywgYXJpYWwsIHNhbnMtc2VyaWY7XHJcbiRmb250LW51bml0by1zZW1pYm9sZDogJ051bml0byBTZW1pQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG4kZm9udC1udW5pdG8taGVhdnk6ICdOdW5pdG8gQm9sZCcsIGFyaWFsLCBzYW5zLXNlcmlmO1xyXG5cclxuLy8gQ09MT1JTXHJcblxyXG4kY29sb3ItdmVyeS1saWdodC1ncmF5OiAjY2NjO1xyXG4kY29sb3ItbGluay13YXRlcjogI2Q0ZDZkODtcclxuJGNvbG9yLXdoaXNwZXI6ICNlOWU5ZTk7XHJcbiRjb2xvci1kYXJrLWdyYXk6ICNhYWE7XHJcbiRjb2xvci1kdXN0eS1ncmF5OiAjOTc5Nzk3O1xyXG4kY29sb3ItZGltLWdyYXk6ICM2ZTZlNmU7XHJcbiRjb2xvci1zb2xpdHVkZTogI0VDRjFGODtcclxuJGNvbG9yLW5pZ2h0LXJpZGVyOiAjMzMzO1xyXG4kY29sb3ItbmF2eS1ibHVlOiAjMDA1NmU2O1xyXG4kY29sb3ItZGVuaW06ICMxMzYwZTA7XHJcbiRjb2xvci1kb2RnZXItYmx1ZTogIzE2NmRmZjtcclxuJGNvbG9yLWRvZGdlci1ibHVlLWxpZ2h0ZXI6ICMyZDdjZmY7XHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJsYWNrOiAjMDAwO1xyXG4kY29sb3Itd2hpdGUtc21va2U6ICNmM2YzZjM7XHJcbiRjb2xvci1kZWVwLXNreS1ibHVlOiAjMDBhMGZmO1xyXG4kY29sb3ItbGlnaHQtc2t5LWJsdWU6ICM4YmI3ZmY7XHJcbiRjb2xvci1saWdodC1za3ktYmx1ZTogIzg4YzhmZjtcclxuJGNvbG9yLXN0cm9uZy1ibHVlOiAjMDA0M2IzO1xyXG4kY29sb3ItYWxpY2UtYmx1ZTogI2YwZjNmNTtcclxuJGNvbG9yLXNpbHZlcjogI2M0YzRjNDtcclxuJGNvbG9yLW1hdHRlcmhvcm46ICM1MTUxNTE7XHJcbiRjb2xvci12ZXJ5LWRhcmstZ3JheTogIzYyNjI2MjtcclxuJGNvbG9yLW1lcmN1cnk6ICNlN2U3ZTc7XHJcbiRjb2xvci1saWdodC1ncmF5OiAjZDhkOGQ4O1xyXG4kY29sb3Itd2hpc3BlcjogI2ViZWJlYjtcclxuJGNvbG9yLWFsaXphcmluOiAjZTIyOTQyO1xyXG4kY29sb3ItZmxhbWUtcmVkOiAjODgxOTI4O1xyXG4kY29sb3ItY2hhcmNvYWw6ICM0NjQ2NDY7XHJcbiRjb2xvci1kZWVwLXNlYTogIzE0N2Q2MztcclxuJGNvbG9yLWNhcmRpbmFsOiAjYjUyMTM1O1xyXG4kY29sb3ItZ29kLWdyYXk6ICMxNjE2MTY7XHJcbiRjb2xvci1ob3QtY3Vycnk6ICM3YzVkMjM7XHJcbiRjb2xvci1jYXNhYmxhbmNhOiAjZjdiYTQ1O1xyXG4kY29sb3ItYWxhYmFzdGVyOiAjZjdmN2Y3O1xyXG4kcG9yY2VsYWluOiAjZTZlOWViO1xyXG4kY29sb3ItaGFybGV5LWRhdmlkc29uLW9yYW5nZTogI0QwNDMxQTtcclxuJGNvbG9yLXBhdHRlbnMtYmx1ZTogI2UwZTNlNTtcclxuXHJcbi8vLyBTaXplXHJcbiRib3R0b20tbmF2aWdhdGlvbi1iYXItaGVpZ2h0OiA1MHB4O1xyXG4iLCJAaW1wb3J0IFwidG9vbHNcIjtcclxuXHJcbi5kYXNoYm9hcmQge1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZS1zbW9rZTtcclxuICBcclxuICAmX19ib3R0b20tYnRuLXdyYXBwZXIge1xyXG4gICAgLS1iYWNrZ3JvdW5kOiAgI2ZmZjtcclxuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6ICNEOUQ5RDk7XHJcblxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XHJcbiAgICBoZWlnaHQ6IDY1cHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDRweCAwcHggcmdiYSgkY29sb3ItYmxhY2ssIDAuMTIpLCAwcHggMnB4IDE0cHggMHB4IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjEyKTtcclxuICB9XHJcblxyXG4gICZfX2JvdHRvbS1pY29uLXdyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICB9XHJcblxyXG4gICZfX2JvdHRvbS10aXRsZS13cmFwcGVyIHtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGNvbG9yOiAkY29sb3ItYmxhY2s7XHJcbiAgfVxyXG4gIFxyXG4gICZfX2JvdHRvbS10aXRsZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1zZW1pYm9sZCgxNnB4KSA7XHJcbiAgfVxyXG4gICZfX2JvdHRvbS1zdWJ0aXRsZSB7XHJcbiAgICBAaW5jbHVkZSBmb250LW51bml0by1yZWd1bGFyKDEwcHgpIDtcclxuICB9XHJcblxyXG59IiwiQG1peGluIGZvbnQtc2l6ZSgkZm9udC1zaXplKSB7XHJcbiAgZm9udC1zaXplOiAkZm9udC1zaXplO1xyXG59XHJcblxyXG5AbWl4aW4gZm9udC1mYW1pbHkoJGZvbnQtZmFtaWx5KSB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcclxufVxyXG5cclxuQG1peGluIGZvbnQtbnVuaXRvLXJlZ3VsYXIoJGZvbnQtc2l6ZSkge1xyXG4gIEBpbmNsdWRlIGZvbnQtc2l6ZSgkZm9udC1zaXplKTtcclxuICBAaW5jbHVkZSBmb250LWZhbWlseSgkZm9udC1udW5pdG8tcmVndWxhcik7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1zZW1pYm9sZCgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1zZW1pYm9sZCk7XHJcbn1cclxuXHJcbkBtaXhpbiBmb250LW51bml0by1oZWF2eSgkZm9udC1zaXplKSB7XHJcbiAgQGluY2x1ZGUgZm9udC1zaXplKCRmb250LXNpemUpO1xyXG4gIEBpbmNsdWRlIGZvbnQtZmFtaWx5KCRmb250LW51bml0by1oZWF2eSk7XHJcbn1cclxuXHJcbkBtaXhpbiBsaW5rLWNvbG9yKCRjb2xvcikge1xyXG4gIGNvbG9yOiAkY29sb3I7XHJcblxyXG4gICY6bGluayxcclxuICAmOnZpc2l0ZWQsXHJcbiAgJjpmb2N1cyxcclxuICAmOmhvdmVyLFxyXG4gICY6YWN0aXZlIHtcclxuICAgIGNvbG9yOiAkY29sb3I7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gaG92ZXIge1xyXG4gICY6aG92ZXIsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBAY29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBkaXNhYmxlZCB7XHJcbiAgJi5kaXNhYmxlZCxcclxuICAmLmRpc2FibGVkOmZvY3VzLFxyXG4gICYuZGlzYWJsZWQ6aG92ZXIsXHJcbiAgJltkaXNhYmxlZF0sXHJcbiAgJltkaXNhYmxlZF06Zm9jdXMsXHJcbiAgJltkaXNhYmxlZF06aG92ZXIge1xyXG4gICAgQGNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gZWxsaXBzaXMge1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuQG1peGluIGZsb2F0aW5nLWxhYmVsKCRjb2xvcikge1xyXG4gIGZvbnQtc2l6ZTogNzUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTUlLCAtNTAlLCAwKTtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJhY2tncm91bmQ6ICRjb2xvci13aGl0ZTtcclxuICBwYWRkaW5nOiAwIDNweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICRjb2xvcjtcclxufVxyXG5cclxuQG1peGluIGNoZXZyb24tZG93bigpIHtcclxuICAmOjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ljb24vY2hldnJvbi1kb3duLnN2ZycpO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDUwJTtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gICAgd2lkdGg6IDE0cHg7XHJcbiAgICBoZWlnaHQ6IDlweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgei1pbmRleDogMTtcclxuICB9XHJcbn1cclxuXHJcbkBtaXhpbiBjaGV2cm9uLWRvd24tYWN0aXZlKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tYWN0aXZlLnN2ZycpO1xyXG4gICAgcmlnaHQ6IDE0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWl4aW4gY2hldnJvbi1kb3duLWVycm9yKCkge1xyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaWNvbi9jaGV2cm9uLWRvd24tZXJyb3Iuc3ZnJyk7XHJcbiAgICByaWdodDogMTRweDtcclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/sections/dashboard/dashboard.page.ts":
/*!******************************************************!*\
  !*** ./src/app/sections/dashboard/dashboard.page.ts ***!
  \******************************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _components_edit_home_page_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/edit-home-page-modal */ "./src/app/sections/dashboard/components/edit-home-page-modal/index.ts");
/* harmony import */ var _dashboard_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard.config */ "./src/app/sections/dashboard/dashboard.config.ts");
/* harmony import */ var _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sections/dashboard/tile-config-facade.service */ "./src/app/sections/dashboard/tile-config-facade.service.ts");
/* harmony import */ var _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/meal-donation.config.ts */ "./src/app/sections/accounts/pages/meal-donations/meal-donation.config.ts");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _containers_access_card_access_card_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./containers/access-card/access-card.component */ "./src/app/sections/dashboard/containers/access-card/access-card.component.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @core/facades/auth/auth.facade.service */ "./src/app/core/facades/auth/auth.facade.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_global__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/app.global */ "./src/app/app.global.ts");
/* harmony import */ var src_app_non_authorized_non_authorized_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/non-authorized/non-authorized.config */ "./src/app/non-authorized/non-authorized.config.ts");
/* harmony import */ var _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/facades/identity/identity.facade.service */ "./src/app/core/facades/identity/identity.facade.service.ts");
















var DashboardPage = /** @class */ (function () {
    function DashboardPage(modalController, tileConfigFacadeService, contentStringsFacadeService, authFacadeService, identityFacadeService, router) {
        this.modalController = modalController;
        this.tileConfigFacadeService = tileConfigFacadeService;
        this.contentStringsFacadeService = contentStringsFacadeService;
        this.authFacadeService = authFacadeService;
        this.identityFacadeService = identityFacadeService;
        this.router = router;
    }
    Object.defineProperty(DashboardPage.prototype, "tilesIds", {
        get: function () {
            return _dashboard_config__WEBPACK_IMPORTED_MODULE_4__["TILES_ID"];
        },
        enumerable: true,
        configurable: true
    });
    DashboardPage.prototype.ngOnInit = function () {
        this.tiles$ = this.tileConfigFacadeService.tileSettings$;
        this.updateDonationMealsStrings();
        this.updateOrderingStrings();
    };
    DashboardPage.prototype.logout = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.authFacadeService.logoutUser();
                this.identityFacadeService.logoutUser();
                this.router.navigate([src_app_app_global__WEBPACK_IMPORTED_MODULE_13__["ROLES"].guest, src_app_non_authorized_non_authorized_config__WEBPACK_IMPORTED_MODULE_14__["GUEST_ROUTES"].entry]);
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        this.accessCard.ionViewWillEnter();
    };
    DashboardPage.prototype.presentEditHomePageModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: _components_edit_home_page_modal__WEBPACK_IMPORTED_MODULE_3__["EditHomePageModalComponent"],
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DashboardPage.prototype.trackFn = function (i, _a) {
        var id = _a.id, iconPath = _a.iconPath;
        return id + iconPath;
    };
    DashboardPage.prototype.updateDonationMealsStrings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
                            title: this.contentStringsFacadeService.getContentStringValue$(_content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_CATEGORIES"].mealDonation, _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_6__["MEAL_CONTENT_STRINGS"].dashboardTitle),
                            buttonConfig: {
                                title: this.contentStringsFacadeService.getContentStringValue$(_content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_CATEGORIES"].mealDonation, _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_6__["MEAL_CONTENT_STRINGS"].buttonDonateAMeal),
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.tileConfigFacadeService.updateConfigById(_dashboard_config__WEBPACK_IMPORTED_MODULE_4__["TILES_ID"].mealDonations, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.updateOrderingStrings = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var res;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tileConfigFacadeService.resolveAsyncUpdatingConfig({
                            title: this.contentStringsFacadeService.getContentStringValue$(_content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_CATEGORIES"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__["ORDERING_CONTENT_STRINGS"].labelDashboard),
                            buttonConfig: {
                                title: this.contentStringsFacadeService.getContentStringValue$(_content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_8__["CONTENT_STINGS_CATEGORIES"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__["ORDERING_CONTENT_STRINGS"].buttonDashboardStartOrder),
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.tileConfigFacadeService.updateConfigById(_dashboard_config__WEBPACK_IMPORTED_MODULE_4__["TILES_ID"].order, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_containers_access_card_access_card_component__WEBPACK_IMPORTED_MODULE_9__["AccessCardComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _containers_access_card_access_card_component__WEBPACK_IMPORTED_MODULE_9__["AccessCardComponent"])
    ], DashboardPage.prototype, "accessCard", void 0);
    DashboardPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'st-dashboard',
            template: __webpack_require__(/*! ./dashboard.page.html */ "./src/app/sections/dashboard/dashboard.page.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./dashboard.page.scss */ "./src/app/sections/dashboard/dashboard.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_5__["TileConfigFacadeService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_7__["ContentStringsFacadeService"],
            _core_facades_auth_auth_facade_service__WEBPACK_IMPORTED_MODULE_11__["AuthFacadeService"],
            _core_facades_identity_identity_facade_service__WEBPACK_IMPORTED_MODULE_15__["IdentityFacadeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["Router"]])
    ], DashboardPage);
    return DashboardPage;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/dashboard.routing.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/sections/dashboard/dashboard.routing.module.ts ***!
  \****************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/sections/dashboard/dashboard.page.ts");
/* harmony import */ var _resolvers_dashboard_page_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/dashboard-page.resolver */ "./src/app/sections/dashboard/resolvers/dashboard-page.resolver.ts");
/* harmony import */ var _dashboard_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.config */ "./src/app/sections/dashboard/dashboard.config.ts");






var routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_3__["DashboardPage"],
        resolve: {
            data: _resolvers_dashboard_page_resolver__WEBPACK_IMPORTED_MODULE_4__["DashboardPageResolver"],
        }
    },
    {
        path: _dashboard_config__WEBPACK_IMPORTED_MODULE_5__["DASHBOARD_NAVIGATE"].scanCard,
        loadChildren: './containers/scan-card/scan-card.module#ScanCardModule',
    }
];
var imports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)];
var exports = [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({ imports: imports, exports: exports })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/resolvers/dashboard-page.resolver.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sections/dashboard/resolvers/dashboard-page.resolver.ts ***!
  \*************************************************************************/
/*! exports provided: DashboardPageResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageResolver", function() { return DashboardPageResolver; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sections/accounts/services/accounts.service */ "./src/app/sections/accounts/services/accounts.service.ts");
/* harmony import */ var _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/service/loading/loading.service */ "./src/app/core/service/loading/loading.service.ts");
/* harmony import */ var _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sections/dashboard/tile-config-facade.service */ "./src/app/sections/dashboard/tile-config-facade.service.ts");
/* harmony import */ var _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sections/accounts/pages/meal-donations/meal-donation.config.ts */ "./src/app/sections/accounts/pages/meal-donations/meal-donation.config.ts");
/* harmony import */ var _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/facades/content-strings/content-strings.facade.service */ "./src/app/core/facades/content-strings/content-strings.facade.service.ts");
/* harmony import */ var _content_strings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../content-strings */ "./src/app/content-strings.ts");
/* harmony import */ var _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sections/ordering/ordering.config */ "./src/app/sections/ordering/ordering.config.ts");
/* harmony import */ var _app_global__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../app.global */ "./src/app/app.global.ts");
/* harmony import */ var _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @core/facades/institution/institution.facade.service */ "./src/app/core/facades/institution/institution.facade.service.ts");
/* harmony import */ var _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/facades/settings/settings-facade.service */ "./src/app/core/facades/settings/settings-facade.service.ts");














var DashboardPageResolver = /** @class */ (function () {
    function DashboardPageResolver(accountsService, loadingService, tileConfigFacadeService, contentStringsFacadeService, institutionService, settingsFacadeService) {
        this.accountsService = accountsService;
        this.loadingService = loadingService;
        this.tileConfigFacadeService = tileConfigFacadeService;
        this.contentStringsFacadeService = contentStringsFacadeService;
        this.institutionService = institutionService;
        this.settingsFacadeService = settingsFacadeService;
    }
    DashboardPageResolver.prototype.resolve = function () {
        var _this = this;
        this.loadingService.showSpinner({ duration: 3000 });
        var strings = this.loadContentStrings();
        var accountContentStrings = this.accountsService.initContentStringsList();
        var call = this.settingsFacadeService.fetchSettingList(_app_global__WEBPACK_IMPORTED_MODULE_11__["Settings"].SettingList.FEATURES);
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["zip"].apply(void 0, [call,
            this.tileConfigFacadeService.updateTilesConfigBySystemSettings().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()),
            accountContentStrings].concat(strings)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () { return _this.loadingService.closeSpinner(); }));
    };
    DashboardPageResolver.prototype.loadContentStrings = function () {
        return [
            this.contentStringsFacadeService.fetchContentString$(_content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_CATEGORIES"].mealDonation, _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_7__["MEAL_CONTENT_STRINGS"].dashboardTitle),
            this.contentStringsFacadeService.fetchContentString$(_content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_CATEGORIES"].mealDonation, _sections_accounts_pages_meal_donations_meal_donation_config_ts__WEBPACK_IMPORTED_MODULE_7__["MEAL_CONTENT_STRINGS"].buttonDonateAMeal),
            this.contentStringsFacadeService.fetchContentString$(_content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_CATEGORIES"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__["ORDERING_CONTENT_STRINGS"].labelDashboard),
            this.contentStringsFacadeService.fetchContentString$(_content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_DOMAINS"].patronUi, _content_strings__WEBPACK_IMPORTED_MODULE_9__["CONTENT_STINGS_CATEGORIES"].ordering, _sections_ordering_ordering_config__WEBPACK_IMPORTED_MODULE_10__["ORDERING_CONTENT_STRINGS"].buttonDashboardStartOrder),
        ];
    };
    DashboardPageResolver = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_accounts_services_accounts_service__WEBPACK_IMPORTED_MODULE_4__["AccountsService"],
            _core_service_loading_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"],
            _sections_dashboard_tile_config_facade_service__WEBPACK_IMPORTED_MODULE_6__["TileConfigFacadeService"],
            _core_facades_content_strings_content_strings_facade_service__WEBPACK_IMPORTED_MODULE_8__["ContentStringsFacadeService"],
            _core_facades_institution_institution_facade_service__WEBPACK_IMPORTED_MODULE_12__["InstitutionFacadeService"],
            _core_facades_settings_settings_facade_service__WEBPACK_IMPORTED_MODULE_13__["SettingsFacadeService"]])
    ], DashboardPageResolver);
    return DashboardPageResolver;
}());



/***/ }),

/***/ "./src/app/sections/dashboard/tile-config-facade.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/sections/dashboard/tile-config-facade.service.ts ***!
  \******************************************************************/
/*! exports provided: TileConfigFacadeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileConfigFacadeService", function() { return TileConfigFacadeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_classes_service_state_facade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/classes/service-state-facade */ "./src/app/core/classes/service-state-facade.ts");
/* harmony import */ var _sections_dashboard_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sections/dashboard/services */ "./src/app/sections/dashboard/services/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_states_storage_storage_state_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/states/storage/storage-state.service */ "./src/app/core/states/storage/storage-state.service.ts");







var TileConfigFacadeService = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TileConfigFacadeService, _super);
    function TileConfigFacadeService(dashboardService, storage) {
        var _this = _super.call(this) || this;
        _this.dashboardService = dashboardService;
        _this.storage = storage;
        _this.key = 'DASHBOARD_TILES_SETTINGS';
        return _this;
    }
    Object.defineProperty(TileConfigFacadeService.prototype, "tileSettings$", {
        get: function () {
            if (!this.isTileConfigInStorage())
                this.storage.updateStateEntity(this.key, [], Number.MAX_SAFE_INTEGER);
            return this.config$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileConfigFacadeService.prototype, "config$", {
        get: function () {
            return this.storage.getStateEntityByKey$(this.key).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (storageEntity) { return storageEntity !== null ? storageEntity.value : null; }));
        },
        enumerable: true,
        configurable: true
    });
    TileConfigFacadeService.prototype.getTileById$ = function (id) {
        return this.tileSettings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (tiles) { return tiles.find(function (_a) {
            var tId = _a.id;
            return id === tId;
        }); }));
    };
    TileConfigFacadeService.prototype.isValidConfig = function (config) {
        return !!(config && Array.isArray(config) && !!config.length);
    };
    TileConfigFacadeService.prototype.isTileConfigInStorage = function () {
        return this.storage.isKeyExistInState(this.key);
    };
    TileConfigFacadeService.prototype.updateTilesConfigBySystemSettings = function () {
        var _this = this;
        var configData = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["zip"])(this.tileSettings$, this.dashboardService.retrieveSettingsList());
        return this.makeRequestWithUpdatingStateHandler(configData, this.storage).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (_a) {
            var config = _a[0], settings = _a[1];
            var updatedBaseConfigs = _this.dashboardService.getUpdatedTilesBaseConfig(settings);
            var allowedConfigFromBE = updatedBaseConfigs.filter(function (_a) {
                var isEnable = _a.isEnable;
                return isEnable;
            });
            return _this.isValidConfig(config)
                ? _this.dashboardService.updateConfigByCashedConfig(allowedConfigFromBE, config)
                : allowedConfigFromBE;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (updatedConfig) { return _this.dashboardService.updateAccountTile(updatedConfig); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (config) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.updateConfigState(config)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }));
    };
    TileConfigFacadeService.prototype.updateConfigById = function (id, config) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var tiles, index;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tileSettings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise()];
                    case 1:
                        tiles = _a.sent();
                        index = tiles.findIndex(function (_a) {
                            var tileId = _a.id;
                            return id === tileId;
                        });
                        if (!(index !== -1)) return [3 /*break*/, 3];
                        tiles[index] = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, tiles[index], config, { buttonConfig: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, tiles[index]['buttonConfig'], config['buttonConfig']) });
                        return [4 /*yield*/, this.updateConfigState(tiles)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TileConfigFacadeService.prototype.resolveAsyncUpdatingConfig = function (instructions) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var promises, res, _loop_1, key;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        res = {};
                        _loop_1 = function (key) {
                            if (key === 'buttonConfig') {
                                var buttonConfig_1 = instructions['buttonConfig'];
                                var _loop_2 = function (bkey) {
                                    promises.push(buttonConfig_1[bkey].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise().then(function (value) {
                                        var _a;
                                        return res = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, res, { buttonConfig: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, buttonConfig_1, (_a = {}, _a[bkey] = value, _a)) });
                                    }));
                                };
                                for (var bkey in buttonConfig_1) {
                                    _loop_2(bkey);
                                }
                            }
                            else {
                                promises.push(instructions[key].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).toPromise().then(function (value) {
                                    var _a;
                                    return res = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, res, (_a = {}, _a[key] = value, _a));
                                }));
                            }
                        };
                        for (key in instructions) {
                            _loop_1(key);
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    TileConfigFacadeService.prototype.updateConfigState = function (value) {
        this.storage.updateStateEntity(this.key, value);
    };
    TileConfigFacadeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_sections_dashboard_services__WEBPACK_IMPORTED_MODULE_3__["DashboardService"],
            _core_states_storage_storage_state_service__WEBPACK_IMPORTED_MODULE_6__["StorageStateService"]])
    ], TileConfigFacadeService);
    return TileConfigFacadeService;
}(_core_classes_service_state_facade__WEBPACK_IMPORTED_MODULE_2__["ServiceStateFacade"]));



/***/ }),

/***/ "./src/app/sections/mobile-access/index.ts":
/*!*************************************************!*\
  !*** ./src/app/sections/mobile-access/index.ts ***!
  \*************************************************/
/*! exports provided: MobileAccessPage, MobileAccessService, ActivateLocationComponent, LocationListComponent, MobileAccessPopoverComponent, LocationItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/app/sections/mobile-access/service/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessService", function() { return _service__WEBPACK_IMPORTED_MODULE_0__["MobileAccessService"]; });

/* harmony import */ var _activate_location__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activate-location */ "./src/app/sections/mobile-access/activate-location/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActivateLocationComponent", function() { return _activate_location__WEBPACK_IMPORTED_MODULE_1__["ActivateLocationComponent"]; });

/* harmony import */ var _location_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location-list */ "./src/app/sections/mobile-access/location-list/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationListComponent", function() { return _location_list__WEBPACK_IMPORTED_MODULE_2__["LocationListComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocationItemComponent", function() { return _location_list__WEBPACK_IMPORTED_MODULE_2__["LocationItemComponent"]; });

/* harmony import */ var _mobile_access_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mobile-access.page */ "./src/app/sections/mobile-access/mobile-access.page.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPage", function() { return _mobile_access_page__WEBPACK_IMPORTED_MODULE_3__["MobileAccessPage"]; });

/* harmony import */ var _mobile_access_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mobile-access-popover */ "./src/app/sections/mobile-access/mobile-access-popover/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileAccessPopoverComponent", function() { return _mobile_access_popover__WEBPACK_IMPORTED_MODULE_4__["MobileAccessPopoverComponent"]; });








/***/ }),

/***/ "./src/app/sections/secure-messaging/index.ts":
/*!****************************************************!*\
  !*** ./src/app/sections/secure-messaging/index.ts ***!
  \****************************************************/
/*! exports provided: SecureMessagePage, SecureMessagingService, SecureMessagingApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/app/sections/secure-messaging/service/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingService", function() { return _service__WEBPACK_IMPORTED_MODULE_0__["SecureMessagingService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagingApiService", function() { return _service__WEBPACK_IMPORTED_MODULE_0__["SecureMessagingApiService"]; });

/* harmony import */ var _secure_message_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secure-message.page */ "./src/app/sections/secure-messaging/secure-message.page.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureMessagePage", function() { return _secure_message_page__WEBPACK_IMPORTED_MODULE_1__["SecureMessagePage"]; });





/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module.js.map